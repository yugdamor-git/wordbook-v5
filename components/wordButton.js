import Link from 'next/link';
import React from 'react';

const WordButton = ({word,href}) => {
  return <div key={word}>
         <Link href={href}>
                  <div className="flex items-center mt-2 bg-gray-50 rounded mx-2 p-2 hover:bg-primary-50 hover:text-primary-500 hover:font-semibold">
                      {/* <div class="bg-primary-400 h-2 w-2 rounded-full mr-2"></div> */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary-500 pr-1" viewBox="0 0 19 19">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                      <div>
                        <span className="px-1">{word}</span>
                      </div>
                      
                  </div>
                  </Link>
  </div>;

};

export default WordButton;
