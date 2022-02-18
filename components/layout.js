import React, { useState } from 'react';
import BreadCrumb from './breadCrumb';
import Footer from './footer'
import Navbar from './navbar'
import Search from './search';
import { NextSeo } from 'next-seo';

const Layout = ({ children }) => {



  function setDarkModeStorage(value)
  {
    setDarkMode(value)

    
  }

  

  const [darkMode,setDarkMode] = useState(false)

  return <div className={`${darkMode ? "dark bg-black " : " "}font-Montserrat flex flex-col h-screen justify-between`}>
     <NextSeo
      title="wordbook"
      description="The easy to understand dictionary with Example Sentences , Famous Quotes and Audio Pronunciations"
    />
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
