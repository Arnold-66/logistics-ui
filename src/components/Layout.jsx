import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20">
        {children}
      </div>
    </div>
  );
};

export default Layout;