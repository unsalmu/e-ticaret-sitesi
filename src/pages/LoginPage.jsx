import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../store/actions/clientActions'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })

  const onSubmit = async (values) => {
    try {
      await dispatch(login({ email: values.email, password: values.password, remember: values.remember }))
      if (history.length > 1) history.goBack(); else history.replace('/')
    } catch (err) {
      const msg = 'Invalid email or password. Please try again.'
      toast.error(msg)
    }
  }

  return (
    <section className="bg-white pt-[60px] md:pt-[85px]">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold text-[#252B42] mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" placeholder="you@example.com" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('remember')} />
            Remember me
          </label>
          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#23A6F0] text-white font-bold rounded disabled:opacity-60">
            {isSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Login
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </section>
  )
}

