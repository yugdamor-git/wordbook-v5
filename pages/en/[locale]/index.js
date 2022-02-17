import { useRouter } from 'next/router';
import React from 'react';
import Browse from '../../../components/browse';
import Pagination from '../../../components/pagination';
import WordButton from '../../../components/wordButton';
import { connectToDatabase } from '../../../lib/mongodb';

const Locale = ({data}) => {
    
    const router = useRouter()

    const current_locale = router.query.locale

    const words = JSON.parse(data.words);

    const pagination = data.pagination;
    
    

    let duration_offset = 0.01
    let duration = 0
  return <div>
    
      <h1 className="text-center text-primary-500 font-semibold my-2">Choose Word</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
          {   
              words.map(word => (
                  <div key={word._id}>
                      <WordButton word={word.word} href={`/en/${current_locale}/${word.word.replaceAll(" ","-")}`} duration={duration += duration_offset}/>
                  </div>
                  
              ))
          }
      </div>
      <Pagination current_page={+pagination.page} max_page={pagination.pageCount} />
  </div>;
};


export async function getServerSideProps(context) {
    let current_page = context.query.page

    const size = 20;
  
    if (current_page == null) {
      current_page = 1;
    }
  
    const skip = (current_page - 1) * size;
  
    let current_locale = context.query.locale
    const { db } = await connectToDatabase();
  //   const words = JSON.stringify(
  //     await db
  //       .collection(process.env.DATA_COLLECTION)
  //       .find({
  //         id:{
  //           $gt:skip,
  //           $lt:skip + size
  //         }
  //       })
  //       .project({word: 1})
  //       .toArray()
  //   );

  // const total_docs = parseInt(
  //   await db
  //     .collection(process.env.DATA_COLLECTION)
  //     .count({})
  // );

  const [total_docs_p,words_p] = await Promise.all(
    [
      db
      .collection(process.env.DATA_COLLECTION)
      .count(),
      db
        .collection(process.env.DATA_COLLECTION)
        .find({})
        .skip(skip)
        .limit(size)
        .project({word: 1})
        .toArray(),
      
    ]
  )

  const words = JSON.stringify(words_p)
  const total_docs = parseInt(total_docs_p)

  const total_pages = Math.ceil(total_docs / size);

  const pagination = {
    total: total_docs,
    pageCount: total_pages,
    pageSize: size,
    page: current_page,
  };

  return {
    props: { data: { words: words, pagination: pagination } },
  };
  }

export default Locale;
