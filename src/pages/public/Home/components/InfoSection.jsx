import React from 'react'
import Container from '../../../../components/common/Container'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function InfoSection() {
  const companyInfo = [
    {
      icon: <BuildingOfficeIcon className="w-6 h-6 text-primary" />,
      title: 'PT TravelAku Indonesia',
      details: [
        'Terdaftar dan Diawasi oleh Kemenparekraf RI',
        'TDUP: 123/456/789/2024'
      ]
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-primary" />,
      title: 'Sertifikasi & Lisensi',
      details: [
        'ASITA Member ID: AS-2024-123',
        'ISO 9001:2015 Certified'
      ]
    }
  ]

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6 text-primary" />,
      title: 'Customer Service',
      details: [
        '1500-123 (24/7)',
        '+62 21 5678 9012'
      ]
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6 text-primary" />,
      title: 'Email',
      details: [
        'corporate@travelaku.id',
        'support@travelaku.id'
      ]
    }
  ]

  const officeInfo = [
    {
      icon: <MapPinIcon className="w-6 h-6 text-primary" />,
      title: 'Kantor Pusat',
      details: [
        'Menara TravelAku, Lantai 18',
        'Jl. Jend. Sudirman Kav. 52-53',
        'Jakarta Selatan 12190'
      ]
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6 text-primary" />,
      title: 'Jangkauan Layanan',
      details: [
        '34 Provinsi di Indonesia',
        '150+ Kota & Kabupaten'
      ]
    }
  ]

  const socialMedia = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/travelaku',
      icon: 'ri-linkedin-fill',
      color: 'hover:bg-[#0A66C2]'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/travelaku.id',
      icon: 'ri-instagram-fill',
      color: 'hover:bg-[#E4405F]'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/travelaku_id',
      icon: 'ri-twitter-fill',
      color: 'hover:bg-[#1DA1F2]'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@travelaku',
      icon: 'ri-youtube-fill',
      color: 'hover:bg-[#FF0000]'
    }
  ]

  const renderInfoCard = (info, index) => (
    <div key={index} className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center items-center w-12 h-12 rounded-lg bg-primary/5">
        {info.icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">{info.title}</h3>
        {info.details.map((detail, idx) => (
          <p key={idx} className="text-gray-600 leading-relaxed">{detail}</p>
        ))}
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-12">
              {/* Company Info */}
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                  Informasi Perusahaan
                </h2>
                <div className="grid gap-6">
                  {companyInfo.map((info, index) => renderInfoCard(info, index))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                  Hubungi Kami
                </h2>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => renderInfoCard(info, index))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Office Info */}
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                  Lokasi & Jangkauan
                </h2>
                <div className="grid gap-6">
                  {officeInfo.map((info, index) => renderInfoCard(info, index))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                  Lokasi Kami
                </h2>
                <div className="overflow-hidden bg-white rounded-xl shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904629!2d106.80759841476882!3d-6.227025395493398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sScbd!5e0!3m2!1sen!2sid!4v1645123456789!5m2!1sen!2sid"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                  Media Sosial
                </h2>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="grid grid-cols-4 gap-4">
                    {socialMedia.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col gap-3 items-center p-4 rounded-lg transition-all ${social.color} hover:text-white group`}
                      >
                        <i className={`${social.icon} text-2xl group-hover:scale-110 transition-transform`}></i>
                        <span className="text-sm font-medium">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 