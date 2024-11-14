import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';
import Team from './Team';
import Contact from './Contact';
import Footer from './Footer';

function Main() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Main;