import { useRouter } from 'next/router';
import React from 'react';

const Synonyms = ({synonym,s_index}) => {

  const router = useRouter()
  const target_locale = router.query.locale

  console.log(synonym)

  return <div>
    <div className="text-sm bg-slate-50 rounded-md m-1 text-center text-gray-500 p-1 dark:bg-gray-900">
                      
                      <div className='flex flex-col'>
                        <div className="text-gray-600 dark:text-gray-300">{synonym.localization[target_locale]}</div><div className="text-gray-400 mt-1 dark:text-gray-500">{synonym.synonym}</div>
                      </div>
                      
                  </div>
  </div>;
};

export default Synonyms;
