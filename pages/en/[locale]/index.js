import { useRouter } from 'next/router';
import React from 'react';
import Browse from '../../../components/browse';
import Pagination from '../../../components/pagination';
import WordButton from '../../../components/wordButton';

const Locale = () => {

    const router = useRouter();

    let current_page = router.query.page;

    if(current_page == null)
    {
        current_page = 1
    }

    const current_locale = router.query.locale

    const words = "To control the text color of an input placeholder at a specific breakpoint, add a {screen}: prefix to any existing text color utility. For example, use md:placeholder-green-500 to apply the placeholder-green-500 utility at only medium screen sizes and above.".split(" ")


  return <div>
    
      <h1 className="text-center text-primary-500 font-semibold my-2">Choose Word</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
          {
              words.map(word => (
                  <WordButton word={word} href={`/en/${current_locale}/${word}`}/>
              ))
          }
      </div>
      <Pagination current_page={+current_page} max_page={50} />
  </div>;
};

export default Locale;
