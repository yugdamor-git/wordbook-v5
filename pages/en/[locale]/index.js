import { useRouter } from 'next/router';
import React from 'react';
import Browse from '../../../components/browse';
import Pagination from '../../../components/pagination';
import WordButton from '../../../components/wordButton';

const Locale = ({data}) => {
    const pagination = data.meta.pagination

    const router = useRouter();

    let current_page = router.query.page;

    if(current_page == null)
    {
        current_page = 1
    }

    const current_locale = router.query.locale

    const words = data.data

    let duration_offset = 0.01
    let duration = 0
  return <div>
    
      <h1 className="text-center text-primary-500 font-semibold my-2">Choose Word</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
          {   
              words.map(word => (
                  <div key={word}>
                      <WordButton word={word.attributes.word} href={`/en/${current_locale}/${word.attributes.word}`} duration={duration += duration_offset}/>
                  </div>
                  
              ))
          }
      </div>
      <Pagination current_page={+pagination.page} max_page={pagination.pageSize} />
  </div>;
};


export async function getServerSideProps(context) {
    let current_page = context.query.page
    let current_locale = context.query.locale
    const per_page = 20;
    if (current_page == null)
    {
        current_page = 1
    }

    const resp = await fetch(`http://65.108.48.228:1337/api/words?pagination[page]=${current_page}&pagination[pageSize]=${per_page}`)
    const data = await resp.json()
    
    return {
      props: {data},
    }
  }

export default Locale;
