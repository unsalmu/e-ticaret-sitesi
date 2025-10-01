import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus, Edit3, Trash2, Check } from 'lucide-react'
import { cities } from '../lib/cities'
import { fetchAddresses, createAddress, updateAddressRemote, deleteAddressRemote } from '../store/actions/clientActions'

export default function CreateOrderPage() {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const addressList = useSelector(state => state.client.addressList) || []

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null) // address or null
  const [billingSame, setBillingSame] = useState(true)
  const [selectedShipId, setSelectedShipId] = useState(null)
  const [selectedBillId, setSelectedBillId] = useState(null)

  // Totals based on selected items in cart
  const checkedItems = cart.filter(i => i.checked)
  const productsTotal = checkedItems.reduce((t, i) => t + i.product.price * i.count, 0)
  const shipping = checkedItems.length ? 29.99 : 0
  const shippingDiscount = productsTotal >= 150 ? shipping : 0
  const grandTotal = productsTotal + shipping - shippingDiscount

  useEffect(() => {
    dispatch(fetchAddresses())
  }, [dispatch])

  useEffect(() => {
    if (!selectedShipId && addressList.length) setSelectedShipId(addressList[0].id)
    if (!selectedBillId && addressList.length) setSelectedBillId(addressList[0].id)
  }, [addressList, selectedShipId, selectedBillId])

  const defaultForm = useMemo(() => ({
    title: '', name: '', surname: '', phone: '', city: '', district: '', neighborhood: ''
  }), [])
  const [form, setForm] = useState(defaultForm)

  const startAdd = () => { setEditing(null); setForm(defaultForm); setShowForm(true) }
  const startEdit = (addr) => { setEditing(addr); setForm({
    title: addr.title || '', name: addr.name || '', surname: addr.surname || '', phone: addr.phone || '',
    city: addr.city || '', district: addr.district || '', neighborhood: addr.neighborhood || ''
  }); setShowForm(true) }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing && editing.id) {
        await dispatch(updateAddressRemote({ id: editing.id, ...form }))
      } else {
        // Create new address
        await dispatch(createAddress(form))
        // Refetch addresses to ensure we have the latest list with proper IDs from server
        const updatedAddresses = await dispatch(fetchAddresses())
        if (updatedAddresses && updatedAddresses.length > 0) {
          // Select the newly created address - find by matching form data
          const newAddress = updatedAddresses.find(addr =>
            addr.title === form.title &&
            addr.name === form.name &&
            addr.surname === form.surname &&
            addr.phone === form.phone
          ) || updatedAddresses[updatedAddresses.length - 1]

          if (newAddress && newAddress.id) {
            setSelectedShipId(newAddress.id)
            if (billingSame) {
              setSelectedBillId(newAddress.id)
            }
          }
        }
      }
      setShowForm(false)
      setEditing(null)
    } catch (error) {
      console.error('Error saving address:', error)
      // You might want to show an error message to the user here
    }
  }

  const onDelete = async (addr) => {
    if (!addr?.id) return
    if (!confirm('Bu adres silinsin mi?')) return
    try {
      await dispatch(deleteAddressRemote(addr.id))
      // Reset selected addresses if the deleted address was selected
      if (selectedShipId === addr.id) setSelectedShipId(null)
      if (selectedBillId === addr.id) setSelectedBillId(null)
    } catch (error) {
      console.error('Error deleting address:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-40 pb-10">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="text-blue-600 font-bold">1. Adres Bilgileri</div>
          <div className="text-gray-400">2. Ödeme Seçenekleri</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-lg">Teslimat Adresi</div>
              <label className="flex items-center gap-2 text-sm select-none">
                <input type="checkbox" className="w-4 h-4" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
                Faturamı Aynı Adrese Gönder
              </label>
            </div>

            {/* Add address button */}
            <button onClick={startAdd} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-6 text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2 mb-4">
              <Plus className="w-5 h-5" /> Yeni Adres Ekle
            </button>

            {/* Address list */}
            <div className="grid sm:grid-cols-2 gap-4">
              {addressList.map(addr => (
                <div key={addr.id} className={`rounded-lg border ${selectedShipId===addr.id ? 'border-blue-500' : 'border-gray-200'} p-3 relative`}>
                  <div className="absolute top-2 left-2">
                    <input
                      type="radio"
                      name="shipAddress"
                      checked={selectedShipId===addr.id}
                      onChange={() => setSelectedShipId(addr.id)}
                    />
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{addr.title || 'Adres'}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <button className="text-blue-600 hover:underline" onClick={() => startEdit(addr)}><Edit3 className="inline w-4 h-4 mr-1"/>Düzenle</button>
                        <button className="text-red-600 hover:underline" onClick={() => onDelete(addr)}><Trash2 className="inline w-4 h-4 mr-1"/>Sil</button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <div>{addr.name} {addr.surname} • {addr.phone}</div>
                      <div>{addr.city}{addr.district ? `, ${addr.district}` : ''}</div>
                      <div className="truncate">{addr.neighborhood}</div>
                    </div>
                  </div>
                </div>
              ))}
              {addressList.length === 0 && (
                <div className="text-gray-500 text-sm">Kayıtlı adres bulunamadı. Yeni bir adres ekleyin.</div>
              )}
            </div>
          </div>

          {!billingSame && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="font-bold text-lg mb-3">Fatura Adresi</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {addressList.map(addr => (
                  <div key={addr.id} className={`rounded-lg border ${selectedBillId===addr.id ? 'border-blue-500' : 'border-gray-200'} p-3 relative`}>
                    <div className="absolute top-2 left-2">
                      <input
                        type="radio"
                        name="billAddress"
                        checked={selectedBillId===addr.id}
                        onChange={() => setSelectedBillId(addr.id)}
                      />
                    </div>
                    <div className="ml-6">
                      <div className="font-medium">{addr.title || 'Adres'}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>{addr.name} {addr.surname} • {addr.phone}</div>
                        <div>{addr.city}{addr.district ? `, ${addr.district}` : ''}</div>
                        <div className="truncate">{addr.neighborhood}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {addressList.length === 0 && (
                  <div className="text-gray-500 text-sm">Kayıtlı adres bulunamadı.</div>
                )}
              </div>
            </div>
          )}

          {/* Address form */}
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="font-bold mb-3">{editing ? 'Adresi Güncelle' : 'Yeni Adres Ekle'}</div>
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Adres Başlığı</label>
                  <input className="w-full border rounded px-3 py-2" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Ad</label>
                  <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Soyad</label>
                  <input className="w-full border rounded px-3 py-2" value={form.surname} onChange={e=>setForm({...form,surname:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                  <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">İl</label>
                  <select className="w-full border rounded px-3 py-2" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required>
                    <option value="">Seçin</option>
                    {cities.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">İlçe</label>
                  <input className="w-full border rounded px-3 py-2" value={form.district} onChange={e=>setForm({...form,district:e.target.value})} required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Adres Detayları (Mahalle)</label>
                  <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.neighborhood} onChange={e=>setForm({...form,neighborhood:e.target.value})} required />
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
            <Link to="/order/payment" className="w-full text-center block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg">Kaydet ve Devam Et</Link>
            <div className="text-xs text-gray-600 flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Ön bilgilendirme koşulları'nı ve mesafeli satış sözleşmesi'ni okudum, onaylıyorum.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
