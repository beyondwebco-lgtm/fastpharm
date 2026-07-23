import React from 'react';
import Hero from '../components/Hero';
import MedicineCatalog from '../components/MedicineCatalog';
import FounderNote from '../components/FounderNote';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <MedicineCatalog />
      <FounderNote />
    </div>
  );
};

export default Home;
