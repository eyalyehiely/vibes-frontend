import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-16 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            הצוות שלנו כאן בשבילך. נשמח לענות על כל שאלה ולעזור לך להתחיל
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-primary/10 text-center">
            <Mail className="mx-auto text-primary mb-4" size={32} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">דואר אלקטרוני</h3>
            <p className="text-gray-600">support@saaspro.co.il</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-primary/10 text-center">
            <Phone className="mx-auto text-secondary mb-4" size={32} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">טלפון</h3>
            <p className="text-gray-600">03-1234567</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-primary/10 text-center">
            <MapPin className="mx-auto text-accent mb-4" size={32} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">כתובת</h3>
            <p className="text-gray-600">רחוב הברזל 30, תל אביב</p>
          </div>
        </div>
      </div>
    </section>
  );
}