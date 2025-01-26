import React from 'react';
import VehicleList from '../components/VehicleList';
import HeaderBar from '../components/HeaderBar';

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderBar />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">
          Available Vehicles
        </h1>
        <VehicleList />
      </div>
    </div>
  );
};

export default Home;
