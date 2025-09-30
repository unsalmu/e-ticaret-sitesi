import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { CreditCard, Edit3, Trash2, Plus } from 'lucide-react'
import { fetchCards, createCard, updateCardRemote, deleteCardRemote } from '../store/actions/clientActions'
import { createOrder } from '../store/actions/cartActions'
import OrderSuccessModal from '../components/OrderSuccessModal'

const months = Array.from({ length: 12 }, (_, i) => i + 1)
const years = (() => { const y = new Date().getFullYear(); return Array.from({ length: 12 }, (_, i) => y + i) })()

const maskCard = (num='') => {
  const s = (num || '').replace(/\D/g,'')
  if (s.length < 6) return s
  const first = s.slice(0,4)
  const last = s.slice(-4)
  return `${first} ${'**'.padEnd(Math.max(0, Math.ceil((s.length-8)/2)), '*')} ${'**'.padEnd(Math.max(0, Math.floor((s.length-8)/2)), '*')} ${last}`
}

export default function CreateOrderPaymentPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { cart, orderState, lastOrder } = useSelector(state => state.cart)
  const cards = useSelector(state => state.client.creditCards) || []
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [ccvRequired, setCcvRequired] = useState(false)
  const [ccv, setCcv] = useState('')

  const checkedItems = cart.filter(i => i.checked)
  const productsTotal = checkedItems.reduce((t, i) => t + i.product.price * i.count, 0)
  const shipping = checkedItems.length ? 29.99 : 0
  const shippingDiscount = productsTotal >= 150 ? shipping : 0
  const grandTotal = productsTotal + shipping - shippingDiscount

  const [selectedCardId, setSelectedCardId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const defaultForm = useMemo(() => ({ card_no: '', expire_month: '', expire_year: '', name_on_card: '' }), [])
  const [form, setForm] = useState(defaultForm)

  useEffect(() => { dispatch(fetchCards()) }, [dispatch])
  useEffect(() => { if (!selectedCardId && cards.length) setSelectedCardId(cards[0].id) }, [cards, selectedCardId])

  const startAdd = () => { setEditing(null); setForm(defaultForm); setShowForm(true) }
  const startEdit = (c) => { setEditing(c); setForm({ card_no: c.card_no || '', expire_month: c.expire_month || '', expire_year: c.expire_year || '', name_on_card: c.name_on_card || '' }); setShowForm(true) }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, expire_month: Number(form.expire_month), expire_year: Number(form.expire_year) }
    if (editing && editing.id) {
      await dispatch(updateCardRemote({ id: editing.id, ...payload }))
    } else {
      const created = await dispatch(createCard(payload))
      if (created?.id) setSelectedCardId(created.id)
    }
    setShowForm(false); setEditing(null)
  }

  const onDelete = async (c) => {
    if (!c?.id) return
    if (!confirm('Kart silinsin mi?')) return
    await dispatch(deleteCardRemote(c.id))
    if (selectedCardId === c.id) setSelectedCardId(null)
  }

  const handlePayment = async () => {
    if (!selectedCardId || checkedItems.length === 0) return

    const selectedCard = cards.find(c => c.id === selectedCardId)
    if (!selectedCard) return

    // If CCV is required but not provided, show CCV input
    if (!ccv) {
      setCcvRequired(true)
      return
    }

    try {
      const orderData = {
        address_id: 1, // Default address
        card_no: parseInt(selectedCard.card_no.replace(/\D/g, '')),
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: parseInt(ccv)
      }

      await dispatch(createOrder(orderData))
      setSuccessModalOpen(true)
      setCcvRequired(false)
      setCcv('')
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    }
  }

  const handleSuccessClose = () => {
    setSuccessModalOpen(false)
    history.push('/')
  }

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-40 pb-10">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Link to="/order" className="text-gray-400 hover:underline">1. Adres Bilgileri</Link>
          <div className="text-blue-600 font-bold">2. Ödeme Seçenekleri</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-lg">Kart ile Öde</div>
              <button onClick={startAdd} className="text-blue-600 hover:underline flex items-center gap-2"><Plus className="w-4 h-4"/>Başka bir Kart ile Ödeme Yap</button>
            </div>

            {/* Saved cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {cards.map(c => (
                <div key={c.id} className={`rounded-lg border ${selectedCardId===c.id ? 'border-blue-500' : 'border-gray-200'} p-3 relative`}> 
                  <div className="absolute top-2 left-2">
                    <input type="radio" name="card" checked={selectedCardId===c.id} onChange={()=>setSelectedCardId(c.id)} />
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{c.name_on_card}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <button className="text-blue-600 hover:underline" onClick={()=>startEdit(c)}><Edit3 className="inline w-4 h-4 mr-1"/>Düzenle</button>
                        <button className="text-red-600 hover:underline" onClick={()=>onDelete(c)}><Trash2 className="inline w-4 h-4 mr-1"/>Sil</button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <div className="font-mono">{maskCard(c.card_no)}</div>
                      <div>{String(c.expire_month).padStart(2,'0')}/{c.expire_year}</div>
                    </div>
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div className="text-gray-500 text-sm">Kayıtlı kart bulunamadı. Yeni bir kart ekleyin.</div>
              )}
            </div>
          </div>

          {/* New/Edit card form */}
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="font-bold mb-3">{editing ? 'Kartı Güncelle' : 'Yeni Kart Ekle'}</div>
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Kart Numarası</label>
                  <input className="w-full border rounded px-3 py-2 font-mono" value={form.card_no} onChange={e=>setForm({...form,card_no:e.target.value})} minLength={13} maxLength={19} required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Son Kullanma Ay</label>
                  <select className="w-full border rounded px-3 py-2" value={form.expire_month} onChange={e=>setForm({...form,expire_month:e.target.value})} required>
                    <option value="">Ay</option>
                    {months.map(m => <option key={m} value={m}>{String(m).padStart(2,'0')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Son Kullanma Yıl</label>
                  <select className="w-full border rounded px-3 py-2" value={form.expire_year} onChange={e=>setForm({...form,expire_year:e.target.value})} required>
                    <option value="">Yıl</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Kart Üzerindeki İsim</label>
                  <input className="w-full border rounded px-3 py-2" value={form.name_on_card} onChange={e=>setForm({...form,name_on_card:e.target.value})} required />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Kaydet</button>
                  <button type="button" onClick={()=>{setShowForm(false); setEditing(null)}} className="px-4 py-2 border rounded">İptal</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:sticky lg:top-28 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-lg font-bold mb-3">Sipariş Özeti</div>
              <div className="flex justify-between text-sm py-1"><span className="text-gray-600">Ürünlerin Toplamı</span><span className="font-medium text-gray-900">{productsTotal.toFixed(2)} TL</span></div>
              <div className="flex justify-between text-sm py-1"><span className="text-gray-600">Kargo Toplamı</span><span className="font-medium text-gray-900">{shipping.toFixed(2)} TL</span></div>
              <div className="flex justify-between text-sm py-1"><span className="text-gray-600">İndirim</span><span className="font-medium text-green-600">-{shippingDiscount.toFixed(2)} TL</span></div>
              <hr className="my-2" />
              <div className="flex justify-between text-base py-1"><span className="font-medium text-gray-700">Toplam</span><span className="font-bold text-gray-900">{grandTotal.toFixed(2)} TL</span></div>
            </div>
            {/* CCV Input when required */}
            {ccvRequired && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <label className="block text-sm text-gray-600 mb-2">Güvenlik Kodu (CCV)</label>
                <input
                  type="text"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="123"
                  maxLength="4"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Kartınızın arkasındaki 3 haneli güvenlik kodunu giriniz.</p>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              disabled={!selectedCardId || checkedItems.length===0 || orderState === 'loading'}
            >
              {orderState === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Ödeme Yap'
              )}
            </button>
            <div className="text-xs text-gray-600 flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Ön bilgilendirme koşulları'nı ve mesafeli satış sözleşmesi'ni okudum, onaylıyorum.</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={successModalOpen}
        onClose={handleSuccessClose}
        orderDetails={lastOrder}
      />
    </div>
  )
}

