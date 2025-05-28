"use client";

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const locations = [
  {
    id: 1,
    name: 'فرع جسر السويس - القاهرة',
    address: 'جسر السويس الرئيسي، بجوار ABC التجارية، القاهرة',
    phone: '+20 11 1234 5678',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16100.810569782167!2d31.392384817917875!3d30.13480325232421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145816e7e747cf3b%3A0x1a7ff445c74e5c28!2z2KXZitmHINio2Yog2LPZiiDZhNmE2KrYrNmH2YrYstin2Kog2KfZhNiq2KzYp9ix2YrYqQ!5e0!3m2!1sar!2seg!4v1748450575917!5m2!1sar!2seg',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'فرع التوفيقية - القاهرة',
    address: 'التوفيقية، مول التوفيقية التجاري، القاهرة',
    phone: '+20 11 2345 6789',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.410784424509!2d31.243500774811352!3d30.053757574918894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584095461810eb%3A0xcc829391fcc6fa6f!2z2YXYsdmD2LIg2KfZhNiq2YjZgdmK2YLZitipINin2YTYqtis2KfYsdmKINin2YTYp9iv2KfYsdmK!5e0!3m2!1sar!2seg!4v1748450690956!5m2!1sar!2seg',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    name: 'فرع المنصورة',
    address: 'حي الجامعة، بجوار توكيل فانتازيا، المنصورة',
    phone: '+20 50 3456 7890',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.661619983442!2d31.355791719427366!3d31.035676008533567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79e8105b5f3e7%3A0x3dbafe82d4957071!2z2YXYudix2LYg2KfZhNmI2YPZitmEIC0g2YHYp9mG2KrYp9iy2YrYpyBGYW50YXp6aWEgLSBBbHdha2lsIFN0b3Jl!5e0!3m2!1sar!2seg!4v1748450738277!5m2!1sar!2seg',
    color: 'from-green-500 to-emerald-500'
  }
];

const LocationMaps: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            مواقعنا وفروعنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            زورونا في أحد فروعنا للحصول على استشارة مجانية ومعاينة أجهزة كتر بلوتر عن قرب
          </p>
        </AnimatedSection>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <AnimatedSection 
              key={location.id} 
              animation="fadeInUp" 
              delay={index * 200}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Location Header */}
                <div className={`h-2 bg-gradient-to-r ${location.color}`}></div>
                
                {/* Location Info */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${location.color}`}>
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {location.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    {/* Phone number display removed from here */}
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{location.hours}</span>
                    </div>
                  </div>

                  {/* Google Map */}
                  <div
                    className="relative rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
                    style={{ height: '256px', width: '100%', border: '1px solid #eee' }} // Explicit height and a fallback border
                  >
                    <iframe
                      src={location.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: '0' }} // Ensure no iframe border
                      allowFullScreen={true}
                      loading="lazy"
                      title={`خريطة ${location.name}`}
                      className="rounded-xl" // Keep rounded corners for the iframe itself
                    ></iframe>
                    
                    {/* Map Overlay - Kept for hover effect, but ensure it's not opaque */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-xl pointer-events-none"></div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${location.color} text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      عرض في خرائط جوجل
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Contact CTA */}
        <AnimatedSection animation="fadeInUp" className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              هل تحتاج مساعدة في العثور علينا؟
            </h3>
            <p className="text-gray-600 mb-6">
              اتصل بنا وسنساعدك في الوصول إلى أقرب فرع لك
            </p>
            <a
              href="tel:+20111234567"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-5 w-5 mr-3" />
              اتصل بنا الآن
            </a>
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default LocationMaps;