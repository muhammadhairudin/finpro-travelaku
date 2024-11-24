import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../../store/slices/authSlice'
import { toast } from 'react-hot-toast'
import Container from '../../../components/common/Container'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phoneNumber: '',
    role: 'admin',
    profilePictureUrl: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.passwordRepeat) {
      toast.error('Mohon lengkapi data yang diperlukan')
      return
    }

    if (formData.password !== formData.passwordRepeat) {
      toast.error('Password tidak cocok')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter')
      return
    }

    try {
      setIsLoading(true)
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordRepeat: formData.passwordRepeat,
        phoneNumber: formData.phoneNumber || "123456789",
        role: "admin",
        profilePictureUrl: ""
      }
      
      await dispatch(register(registerData)).unwrap()
      toast.success('Registrasi berhasil')
      navigate('/login')
    } catch (error) {
      toast.error(error?.message || 'Terjadi kesalahan saat registrasi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="max-w-xl mx-auto pt-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                Daftar Akun
              </h1>
              <p className="text-gray-600 mb-2">
                Bergabung dengan TravelAku untuk menjelajahi berbagai destinasi menarik!
              </p>
              <p className="text-sm text-gray-500">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80">
                  Masuk di sini
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Masukkan email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Minimal 6 karakter"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ulangi Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="passwordRepeat"
                  value={formData.passwordRepeat}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Masukkan ulang password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div className="flex items-start gap-2 mt-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Saya setuju dengan <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> yang berlaku
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
} 