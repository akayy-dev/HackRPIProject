// src/pages/HomePage.js
import React, { useState } from 'react';
import LocationDisplay from '../components/home/locationDisplay';
import LocationTable from '../components/home/LocationTable';
import CreateTrip from '../components/home/CreateTrip';
import useNotification from '../hooks/useNotification';
import Notification from '../components/notification';

const HomePage = () => {
  const { notification, setNotification, closeNotification } = useNotification();

  return (
    <div>
      <h1>Home Page</h1>
      <LocationDisplay />
      <LocationTable />
      <CreateTrip setNotification={setNotification} />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default HomePage;
