import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { MapPin, Phone, Mail, Clock, Navigation, ArrowLeft } from 'lucide-react';

const OfficeLocatorPage = () => {
  const offices = [
    {
      id: 1,
      name: 'Plano Office',
      address: '6200 Tennyson Parkway Suite 175',
      city: 'Plano',
      state: 'TX',
      zipCode: '75024',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: true,
      region: 'Texas'
    },
    {
      id: 2,
      name: 'Arlington Office',
      address: '2225 E Randol Mill Rd Suite 101',
      city: 'Arlington',
      state: 'TX',
      zipCode: '76011',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'Texas'
    },
    {
      id: 3,
      name: 'Tennessee Office',
      address: '151 Heritage Park Dr Suite 102',
      city: 'Murfreesboro',
      state: 'TN',
      zipCode: '37129',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'Tennessee'
    },
    {
      id: 4,
      name: 'Pompano Beach Office',
      address: '1280 SW 36th Ave Suite 301',
      city: 'Pompano Beach',
      state: 'FL',
      zipCode: '33069',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'Florida'
    },
    {
      id: 6,
      name: 'Oxnard Office',
      address: '1000 Town Center Dr. Suite 520',
      city: 'Oxnard',
      state: 'CA',
      zipCode: '93030',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'California'
    },
    {
      id: 7,
      name: 'Camarillo Office',
      address: '330 Wood Rd Suite E',
      city: 'Camarillo',
      state: 'CA',
      zipCode: '93010',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'California'
    },
    {
      id: 8,
      name: 'El Paso Office',
      address: '1295 Horizon Blvd Suite C',
      city: 'El Paso',
      state: 'TX',
      zipCode: '79927',
      phone: '(972) 805-1002',
      email: 'admin@eibagency.com',
      isHeadquarters: false,
      region: 'Texas'
    }
  ];

  const regions = ['All', 'Texas', 'California', 'Florida', 'Tennessee'];
  const [selectedRegion, setSelectedRegion] = React.useState('All');

  const filteredOffices = selectedRegion === 'All' 
    ? offices 
    : offices.filter(office => office.region === selectedRegion);

  const getGoogleMapsUrl = (office: any) => {
    const address = `${office.address}, ${office.city}, ${office.state} ${office.zipCode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Texas': return 'bg-blue-100 text-blue-800';
      case 'California': return 'bg-purple-100 text-purple-800';
      case 'Florida': return 'bg-green-100 text-green-800';
      case 'Tennessee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Back Button */}
              <div className="mb-6">
                <a
                  href="/resources"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Resources</span>
                </a>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Office Locator</h1>
                    <p className="text-gray-600">Find EIB Agency office locations across the United States</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{offices.length}</div>
                  <div className="text-gray-600 text-sm">Total Offices</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">4</div>
                  <div className="text-gray-600 text-sm">States</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
                  <div className="text-gray-600 text-sm">Texas Offices</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
              </div>

              {/* Region Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedRegion === region
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Offices Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffices.map((office) => (
                  <div key={office.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{office.name}</h3>
                            {office.isHeadquarters && (
                              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-medium">
                                HQ
                              </span>
                            )}
                          </div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRegionColor(office.region)}`}>
                            {office.region}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="text-gray-600">
                            <div>{office.address}</div>
                            <div>{office.city}, {office.state} {office.zipCode}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a 
                            href={`mailto:${office.email}`}
                            className="text-gray-600 hover:text-yellow-600 transition-colors"
                          >
                            {office.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <a
                          href={getGoogleMapsUrl(office)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors text-center flex items-center justify-center space-x-2"
                        >
                          <Navigation className="h-4 w-4" />
                          <span>Get Directions</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-12 bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Need Help Finding an Office?</h2>
                <p className="text-gray-300 mb-6">
                  Contact our headquarters for assistance with office locations, hours, or directions.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-yellow-400" />
                    <span>(972) 805-1002</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-yellow-400" />
                    <span>admin@eibagency.com</span>
                  </div>
                </div>

                <a
                  href="mailto:admin@eibagency.com"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OfficeLocatorPage;