import React from 'react';
import Hero from '../components/Hero';
import MedicineCatalog from '../components/MedicineCatalog';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <MedicineCatalog />
    </div>
  );
};

export default Home;
