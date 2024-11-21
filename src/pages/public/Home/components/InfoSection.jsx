import React from 'react'
import Container from '../../../../components/common/Container'
import { 
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

  const logoPhilosophy = [
    {
      title: "Koper & Pesawat",
      description: "Perpaduan koper dan pesawat melambangkan kesiapan untuk berpetualang dan kemudahan akses ke berbagai destinasi. Koper mewakili persiapan perjalanan yang matang, sementara pesawat menggambarkan mobilitas tanpa batas."
    },
    {
      title: "Warna Biru & Emas",
      description: "Biru melambangkan kepercayaan dan profesionalisme dalam melayani pelanggan. Emas mencerminkan kualitas premium dan pengalaman perjalanan yang berharga yang kami tawarkan kepada setiap pelanggan."
    },
    {
      title: "Lingkaran Dinamis",
      description: "Garis melingkar yang mengelilingi logo menggambarkan komitmen kami untuk memberikan layanan yang menyeluruh dan berkesinambungan, serta mewakili perjalanan yang tak terbatas di seluruh Indonesia."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
              <img 
                src="/logo-travelaku.png"
                alt="TravelAku Logo" 
                className="h-48 w-auto mx-auto mb-6 transition-transform hover:scale-105 duration-300"
              />
              {/* <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                TravelAku
              </h1> */}
              <p className="text-xl text-gray-600 mb-6 font-serif italic">
                &ldquo;Jelajahi Dunia Semudah Tersenyum&rdquo;
              </p>
              <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full"></div>
            </div>

            {/* Logo Philosophy */}
            <div className="grid md:grid-cols-3 gap-8">
              {logoPhilosophy.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {companyInfo.map((info, index) => (
              <div 
                key={index} 
                className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center items-center w-12 h-12 rounded-lg bg-primary/5">
                  {info.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 