import React from 'react'
import Container from '../../../components/common/Container'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('components')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItem, setExpandedItem] = useState(null)

  // Tambahkan tabs configuration
  const tabs = [
    { id: 'components', label: 'Components' },
    { id: 'pages', label: 'Pages' },
    { id: 'layouts', label: 'Layouts' },
    { id: 'services', label: 'Services' },
    { id: 'hooks', label: 'Hooks' },        // Tab baru
    { id: 'utils', label: 'Utils' },        // Tab baru
    { id: 'redux', label: 'Redux' },        // Tab baru
    { id: 'api', label: 'API' },            // Tab baru
    { id: 'testing', label: 'Testing' }     // Tab baru
  ]

  // Data dokumentasi komponen
  const docs = {
    components: {
      common: [
        {
          name: 'Container',
          description: 'Wrapper component untuk memberikan max-width dan padding yang konsisten',
          props: ['children: React.Node', 'className: string'],
          usage: `<Container>
  <div>Content goes here</div>
</Container>`,
          location: 'src/components/common/Container.jsx',
          dependencies: ['prop-types']
        },
        {
          name: 'ErrorBoundary',
          description: 'Komponen untuk menangkap dan menampilkan error di React',
          props: ['children: React.Node'],
          usage: `<ErrorBoundary>
  <App />
</ErrorBoundary>`,
          location: 'src/components/common/ErrorBoundary.jsx',
          dependencies: ['react', 'prop-types']
        },
        // ... tambahkan komponen common lainnya
      ],
      admin: [
        {
          name: 'AdminNavbar',
          description: 'Navigasi khusus untuk halaman admin',
          props: [],
          usage: `<AdminNavbar />`,
          location: 'src/components/admin/AdminNavbar.jsx',
          dependencies: ['react-router-dom', '@heroicons/react']
        },
        // ... tambahkan komponen admin lainnya
      ],
      transaction: [
        {
          name: 'PaymentSummary',
          description: 'Menampilkan ringkasan pembayaran transaksi',
          props: ['totalAmount: number', 'serviceFee: number'],
          usage: `<PaymentSummary 
  totalAmount={100000} 
  serviceFee={5000} 
/>`,
          location: 'src/components/transaction/PaymentSummary.jsx',
          dependencies: ['prop-types']
        },
        // ... tambahkan komponen transaction lainnya
      ]
    },
    pages: {
      public: [
        {
          name: 'Home',
          description: 'Halaman utama aplikasi',
          components: ['Banner', 'ActivityList', 'PromoSection'],
          routes: '/',
          location: 'src/pages/public/Home/index.jsx'
        },
        // ... tambahkan halaman public lainnya
      ],
      admin: [
        {
          name: 'Dashboard',
          description: 'Dashboard admin dengan statistik dan overview',
          components: ['StatCards', 'Charts', 'RecentTransactions'],
          routes: '/admin',
          location: 'src/pages/admin/Dashboard/index.jsx'
        },
        // ... tambahkan halaman admin lainnya
      ]
    },
    layouts: [
      {
        name: 'RootLayout',
        description: 'Layout utama dengan navbar dan footer',
        components: ['Navbar', 'Footer'],
        usage: 'Digunakan untuk halaman publik dan user',
        location: 'src/layouts/RootLayout.jsx'
      },
      // ... tambahkan layout lainnya
    ],
    services: [
      {
        name: 'authService',
        description: 'Service untuk handling authentication',
        methods: ['login', 'register', 'logout', 'getProfile'],
        location: 'src/services/authService.js'
      },
      // ... tambahkan service lainnya
    ],
    // Data untuk hooks
    hooks: [
      {
        name: 'useAuth',
        description: 'Hook untuk manajemen autentikasi',
        usage: `const { user, login, logout } = useAuth()`,
        methods: ['login', 'logout', 'register', 'resetPassword'],
        location: 'src/hooks/useAuth.js'
      },
      {
        name: 'useCart',
        description: 'Hook untuk manajemen shopping cart',
        usage: `const { items, addItem, removeItem } = useCart()`,
        location: 'src/hooks/useCart.js'
      }
    ],

    // Data untuk utils
    utils: [
      {
        name: 'formatCurrency',
        description: 'Fungsi untuk memformat angka ke format mata uang',
        usage: `formatCurrency(100000) // "Rp 100.000"`,
        location: 'src/utils/formatters.js'
      },
      {
        name: 'validateForm',
        description: 'Fungsi untuk validasi form',
        usage: `const errors = validateForm(formData)`,
        location: 'src/utils/validation.js'
      }
    ],

    // Data untuk redux
    redux: {
      slices: [
        {
          name: 'authSlice',
          description: 'Redux slice untuk manajemen auth state',
          actions: ['login', 'logout', 'updateProfile'],
          location: 'src/store/slices/authSlice.js'
        },
        {
          name: 'cartSlice',
          description: 'Redux slice untuk manajemen cart',
          actions: ['addToCart', 'removeFromCart', 'clearCart'],
          location: 'src/store/slices/cartSlice.js'
        }
      ]
    },

    // Data untuk API
    api: {
      endpoints: [
        {
          name: 'Authentication',
          baseUrl: 'https://travel-journal-api-bootcamp.do.dibimbing.id',
          endpoints: [
            {
              method: 'POST',
              path: '/api/v1/login',
              description: 'Login user',
              requestBody: { email: 'string', password: 'string' }
            }
          ]
        }
      ]
    },

    // Data untuk testing
    testing: {
      setup: {
        name: 'Testing Setup',
        description: 'Setup testing environment',
        tools: ['Jest', 'React Testing Library'],
        location: 'src/__tests__'
      },
      examples: [
        {
          name: 'Component Testing',
          description: 'Contoh testing untuk komponen',
          examples: [
            {
              component: 'ActivityCard',
              testFile: 'ActivityCard.test.jsx',
              testCases: ['renders correctly', 'handles click events']
            }
          ]
        }
      ]
    }
  }

  // Filter berdasarkan search
  const filterDocs = (items) => {
    if (!searchQuery) return items
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Render item dokumentasi
  const renderDocItem = (item) => (
    <div key={item.name} className="mb-6 border rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50"
        onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expandedItem === item.name ? 'transform rotate-180' : ''
            }`}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
      </button>

      {expandedItem === item.name && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="space-y-4">
            {/* Location */}
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location:</h4>
              <code className="block mt-1 p-2 bg-gray-100 rounded text-sm">
                {item.location}
              </code>
            </div>

            {/* Props jika ada */}
            {item.props && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Props:</h4>
                <ul className="mt-1 space-y-1">
                  {item.props.map(prop => (
                    <li key={prop} className="text-sm text-gray-600">
                      • {prop}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage jika ada */}
            {item.usage && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Usage:</h4>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                  {item.usage}
                </pre>
              </div>
            )}

            {/* Dependencies jika ada */}
            {item.dependencies && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Dependencies:</h4>
                <ul className="mt-1 space-y-1">
                  {item.dependencies.map(dep => (
                    <li key={dep} className="text-sm text-gray-600">
                      • {dep}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Components jika ada */}
            {item.components && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Components Used:</h4>
                <ul className="mt-1 space-y-1">
                  {item.components.map(comp => (
                    <li key={comp} className="text-sm text-gray-600">
                      • {comp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Methods jika ada */}
            {item.methods && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Available Methods:</h4>
                <ul className="mt-1 space-y-1">
                  {item.methods.map(method => (
                    <li key={method} className="text-sm text-gray-600">
                      • {method}()
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  // Render content berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case 'hooks':
        return (
          <section>
            <h2 className="text-xl font-bold mb-4">Custom Hooks</h2>
            <div className="space-y-4">
              {filterDocs(docs.hooks).map(item => renderDocItem(item))}
            </div>
          </section>
        )

      case 'utils':
        return (
          <section>
            <h2 className="text-xl font-bold mb-4">Utility Functions</h2>
            <div className="space-y-4">
              {filterDocs(docs.utils).map(item => renderDocItem(item))}
            </div>
          </section>
        )

      case 'redux':
        return (
          <section>
            <h2 className="text-xl font-bold mb-4">Redux State Management</h2>
            <div className="space-y-4">
              {filterDocs(docs.redux.slices).map(item => renderDocItem(item))}
            </div>
          </section>
        )

      case 'api':
        return (
          <section>
            <h2 className="text-xl font-bold mb-4">API Documentation</h2>
            <div className="space-y-8">
              {docs.api.endpoints.map(endpoint => (
                <div key={endpoint.name} className="border rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">{endpoint.name}</h3>
                  <div className="space-y-4">
                    {endpoint.endpoints.map((api, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                            {api.method}
                          </span>
                          <code className="text-sm">{api.path}</code>
                        </div>
                        <p className="text-sm text-gray-600">{api.description}</p>
                        {api.requestBody && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-500">Request Body:</p>
                            <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                              {JSON.stringify(api.requestBody, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )

      case 'testing':
        return (
          <section>
            <h2 className="text-xl font-bold mb-4">Testing Documentation</h2>
            <div className="space-y-8">
              {/* Setup */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">{docs.testing.setup.name}</h3>
                <p className="text-gray-600 mb-4">{docs.testing.setup.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Testing Tools:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {docs.testing.setup.tools.map(tool => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Examples */}
              {docs.testing.examples.map(example => (
                <div key={example.name} className="border rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">{example.name}</h3>
                  <p className="text-gray-600 mb-4">{example.description}</p>
                  <div className="space-y-4">
                    {example.examples.map(test => (
                      <div key={test.component} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{test.component}</h4>
                        <p className="text-sm text-gray-500 mb-2">Test File: {test.testFile}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">Test Cases:</p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {test.testCases.map(testCase => (
                              <li key={testCase}>{testCase}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border hover:bg-gray-50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Kembali
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600">
              Dokumentasi lengkap komponen, halaman, dan service di TravelAku
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Cari dokumentasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Tabs yang sudah diupdate */}
          <div className="mb-8 border-b overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Render existing content */}
            {['components', 'pages', 'layouts', 'services'].includes(activeTab) && (
              <>
                {/* Common Components */}
                <section>
                  <h2 className="text-xl font-bold mb-4">Common Components</h2>
                  <div className="space-y-4">
                    {filterDocs(docs.components.common).map(item => 
                      renderDocItem(item)
                    )}
                  </div>
                </section>

                {/* Admin Components */}
                <section>
                  <h2 className="text-xl font-bold mb-4">Admin Components</h2>
                  <div className="space-y-4">
                    {filterDocs(docs.components.admin).map(item => 
                      renderDocItem(item)
                    )}
                  </div>
                </section>

                {/* Transaction Components */}
                <section>
                  <h2 className="text-xl font-bold mb-4">Transaction Components</h2>
                  <div className="space-y-4">
                    {filterDocs(docs.components.transaction).map(item => 
                      renderDocItem(item)
                    )}
                  </div>
                </section>
              </>
            )}

            {/* Render new content */}
            {renderContent()}
          </div>

          {/* Back to Top Button - Update posisi agar tidak bertabrakan dengan back button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-8 bottom-8 p-3 text-white rounded-full shadow-lg bg-primary hover:bg-primary/90 z-10"
          >
            ↑
          </button>
        </div>
      </Container>
    </div>
  )
} 