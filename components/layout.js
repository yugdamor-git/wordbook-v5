import React, { useState } from 'react';
import BreadCrumb from './breadCrumb';
import Footer from './footer'
import Navbar from './navbar'
import Search from './search';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

const Layout = ({ children }) => {



  function setDarkModeStorage(value)
  {
    setDarkMode(value)

    
  }

  

  const [darkMode,setDarkMode] = useState(false)

  return <div className={`${darkMode ? "dark bg-black " : " "}font-Montserrat flex flex-col h-screen justify-between`}>
    <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#6366f1"/>
    </Head>
    
    <div className="dark:bg-black h-fit">
      <Navbar darkMode={darkMode} enableDark={setDarkModeStorage}/>
      <main className="mx-2 md:mx-6 lg:mx-12 xl:mx-30 2xl:mx-60 dark:bg-black h-full">
          {children}
      </main>
      
    </div>

    <div className="dark:bg-black w-full p-2">
      <Footer/>
      </div>
      
  </div>;
};

export default Layout;
