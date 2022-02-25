import Link from 'next/link';
import React from 'react';
function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
const Locales = ({ languages }) => {

  return <div className="shadow rounded dark:bg-black">
      <div className="text-center font-semibold text-white bg-primary-500 rounded-t p-1 dark:text-slate-300 dark:bg-primary-500"><h1>Indian Language Dictionaries</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 text-gray-500">
        {
            languages.map(lang=>(
                lang.default == false &&

                
                                <Link passHref key={lang.code} prefetch={false} href={`/en/dictionary/english-to-${lang.name}`}>
                                  <a>
                <div className={`${lang.default ? "hidden" : ""} bg-gray-50 m-4 p-4 rounded-xl text-center hover:text-primary-500 hover:bg-primary-50 hover:font-semibold shadow cursor-pointer dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800`}>
                    <span>English To <span className="text-indigo-500 capitalize">{toTitleCase(lang.name)}</span></span>
                </div>
                </a>
                </Link>
                
            ))
        }
      </div>
  </div>;
};

export default Locales;
