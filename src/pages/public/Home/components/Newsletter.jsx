import React, { useState } from 'react'
import Container from '../../../../components/common/Container'
import { toast } from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Terima kasih telah berlangganan newsletter kami!')
      setEmail('')
    } catch (error) {
      toast.error('Gagal mendaftar newsletter')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-primary/5">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Dapatkan Info Terbaru
          </h2>
          <p className="mb-8 text-gray-600">
            Berlangganan newsletter kami untuk mendapatkan update tentang promo dan destinasi wisata menarik
          </p>

          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu"
              required
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 text-white rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
} 