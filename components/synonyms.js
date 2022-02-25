import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Synonyms = ({synonym,locale_meta}) => {

  const target_locale = locale_meta.code

  return <div className="cursor-pointer">
    <Link passHref href={`/en/${synonym.synonym.replaceAll(" ","-")}-meaning-in-${locale_meta.name}`}>
    <a>
    <div className="text-sm bg-slate-50 rounded-md m-1 text-center text-gray-500 p-1 dark:bg-gray-900 hover:bg-slate-100">
                      
                      <div className='flex flex-col'>
                        <div className="text-gray-600 dark:text-gray-300">{synonym.localization[target_locale]}</div><div className="text-gray-400 mt-1 dark:text-gray-500">{synonym.synonym}</div>
                      </div>
                      
                  </div>
                  </a>
                  </Link>
  </div>;
};

export default Synonyms;
