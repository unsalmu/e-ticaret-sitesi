import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import api from '../lib/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRolesIfNeeded } from '../store/actions/clientActions'

export default function SignUpPage() {
  const history = useHistory()
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const roles = useSelector(state => state.client.roles)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    dispatch(fetchRolesIfNeeded())
  }, [dispatch])

  // set default when roles first arrive
  useEffect(() => {
    if (!roles || roles.length === 0) return
    const current = watch('role_id')
    if (current) return
    const customer = roles.find(r => r.code === 'customer' || /müşteri/i.test(r.name || ''))
    if (customer) setValue('role_id', customer.id)
    else setValue('role_id', roles[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  const selectedRole = useMemo(() => roles?.find(r => r.id === Number(watch('role_id'))), [roles, watch('role_id')])
  const isStore = selectedRole?.code === 'store' || /mağaza/i.test(selectedRole?.name || '')

  const onSubmit = async (values) => {
    setApiError('')
    try {
      const { name, email, password, role_id } = values
      let payload = { name, email, password, role_id: Number(role_id) }
      if (isStore) {
        payload = {
          ...payload,
          store: {
            name: values.store_name,
            phone: values.store_phone,
            tax_no: values.store_tax_no,
            bank_account: values.store_bank_account,
          }
        }
      }
      await api.post('/signup', payload)
      alert('You need to click link in email to activate your account!')
      history.goBack()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Signup failed. Please check your data.'
      setApiError(msg)
    }
  }

  const password = watch('password')

  return (
    <section className="bg-white pt-[60px] md:pt-[85px]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold text-[#252B42] mb-6 text-center">Sign Up</h1>
        {apiError && <div className="mb-4 text-sm text-red-600 text-center">{apiError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Name</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Your name" {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Min 3 characters' } })} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" placeholder="you@example.com" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" {...register('password', { required: 'Password is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, message: 'Min 8 chars with lower/upper/number/special' } })} />
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Confirm Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" {...register('password2', { validate: v => v === password || 'Passwords must match' })} />
            {errors.password2 && <p className="text-xs text-red-600 mt-1">{errors.password2.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Role</label>
            <select className="w-full border rounded px-3 py-2" {...register('role_id', { required: true })} defaultValue="">
              <option value="" disabled>Select role</option>
              {roles.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
          </div>
          {isStore && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <label className="block text-sm font-bold mb-1">Store Name</label>
                <input className="w-full border rounded px-3 py-2" {...register('store_name', { required: 'Store name is required', minLength: { value: 3, message: 'Min 3 characters' } })} />
                {errors.store_name && <p className="text-xs text-red-600 mt-1">{errors.store_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Store Phone</label>
                <input className="w-full border rounded px-3 py-2" placeholder="05xx xxx xx xx" {...register('store_phone', { required: 'Phone is required', pattern: { value: /^(\+90|0)?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, message: 'Invalid Türkiye phone' } })} />
                {errors.store_phone && <p className="text-xs text-red-600 mt-1">{errors.store_phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Store Tax ID</label>
                <input className="w-full border rounded px-3 py-2" placeholder="T1234V123456" {...register('store_tax_no', { required: 'Tax ID is required', pattern: { value: /^T\d{4}V\d{6}$/, message: 'Format TXXXXVXXXXXX' } })} />
                {errors.store_tax_no && <p className="text-xs text-red-600 mt-1">{errors.store_tax_no.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Store Bank IBAN</label>
                <input className="w-full border rounded px-3 py-2" placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX" {...register('store_bank_account', { required: 'IBAN is required', pattern: { value: /^TR\d{24}$/, message: 'Invalid TR IBAN' } })} />
                {errors.store_bank_account && <p className="text-xs text-red-600 mt-1">{errors.store_bank_account.message}</p>}
              </div>
            </div>
          )}
          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#23A6F0] text-white font-bold rounded disabled:opacity-60">
            {isSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Create Account
          </button>
        </form>
      </div>
    </section>
  )
}
