"use client";

import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { companyInfo } from '@/data/company';

type Branch = {
  city: string;
  address: string;
  coordinates: { lat: number; lng: number };
};

// Format branches data with coordinates
const branches: Branch[] = [
  {
    city: "Cairo",
    address: companyInfo.branches[0].address,
    coordinates: companyInfo.coordinates.cairo
  },
  {
    city: "Cairo",
    address: companyInfo.branches[2].address,
    coordinates: companyInfo.coordinates.tawfikia
  },
  {
    city: "Mansoura",
    address: companyInfo.branches[1].address,
    coordinates: companyInfo.coordinates.mansoura
  }
];

const BranchMap = () => {
  const [activeMapUrl, setActiveMapUrl] = useState<string>(
    branches[0] ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.675167369411!2d${branches[0].coordinates.lng}!3d${branches[0].coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzQ5LjgiTiAzMcKwMjAnNTIuNCJF!5e0!3m2!1sen!2seg!4v1652224591025!5m2!1sen!2seg` : ''
  );
  const [activeBranch, setActiveBranch] = useState<number>(0);

  const handleBranchClick = (index: number) => {
    setActiveBranch(index);
    const branch = branches[index];
    if (!branch) return;
    const { lat, lng } = branch.coordinates;
    setActiveMapUrl(
      `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzQ5LjgiTiAzMcKwMjAnNTIuNCJF!5e0!3m2!1sen!2seg!4v1652224591025!5m2!1sen!2seg`
    );
  };

  // Prepare LocalBusiness schema for SEO
  const localBusinessSchema = branches.map((branch, index) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${companyInfo.companyNameAr} - ${branch.city}`,
    "image": "/images/logo.png",
    "telephone": companyInfo.phones[0],
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": branch.city,
      "addressCountry": "Egypt",
      "streetAddress": branch.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": branch.coordinates.lat,
      "longitude": branch.coordinates.lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "url": `${companyInfo.website}/contact`
  }));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">فروعنا</h2>
        <p className="text-gray-600 mb-6">
          زورنا في أقرب فرع لكم للحصول على استشارة مجانية وتجربة أجهزة هاي كت
        </p>
        
        {/* Branch List and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Branch List */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {branches.map((branch, index) => (
                <div 
                  key={index}
                  onClick={() => handleBranchClick(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${activeBranch === index 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start">
                    <MapPin 
                      className={`h-5 w-5 mt-1 ${activeBranch === index ? 'text-white' : 'text-primary'}`} 
                    />
                    <div className="mr-3">
                      <h3 className="font-bold">
                        {branch.city === 'Cairo' && branch.address.includes('التوفيقية')
                          ? 'فرع القاهرة - التوفيقية'
                          : branch.city === 'Cairo'
                          ? 'فرع القاهرة - جسر السويس'
                          : 'فرع المنصورة'}
                      </h3>
                      <p className={`${activeBranch === index ? 'text-gray-100' : 'text-gray-600'} text-sm mt-1`}>
                        {branch.address}
                      </p>
                      <div className={`flex items-center mt-2 text-sm ${activeBranch === index ? 'text-gray-100' : 'text-gray-500'}`}>
                        <Clock className="h-4 w-4 ml-1" />
                        <span>{companyInfo.workingHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 h-96 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={activeMapUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${companyInfo.companyNameAr} - خريطة الفرع`}
              aria-label="خريطة توضح موقع فرع الشركة"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Add JSON-LD scripts for LocalBusiness */}
      {localBusinessSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  );
};

export default BranchMap; 