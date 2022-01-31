import React from 'react';
import BreadCrumb from './breadCrumb';
import Footer from './footer'
import Navbar from './navbar'
import Search from './search';

const Layout = ({ children }) => {
  return <div className="font-Montserrat">
      <Navbar/>
      <main className="mx-2 md:mx-6 lg:mx-12 xl:mx-30 2xl:mx-60">
          <BreadCrumb/>
          {children}
      </main>
      <Footer/>
  </div>;
};

export default Layout;
