import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
const WordButton = ({word,href}) => {
  return <div>
         <Link href={href} prefetch={false} passHref>
                  <a>
                  <div className="cursor-pointer flex items-center mt-2 bg-gray-50 rounded mx-2 p-2 hover:bg-primary-50 hover:text-primary-500 hover:font-semibold dark:bg-slate-900 dark:hover:bg-slate-800">
                    
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary-500 pr-1" viewBox="0 0 19 19">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                      <div>
                        <span className="capitalize px-1 dark:text-slate-400">{toTitleCase(word)}</span>
                      </div>
                      
                  </div>
                  </a>
                  </Link>
  </div>

};

export default WordButton;
