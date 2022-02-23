import { useRouter } from 'next/router';
import React from 'react';
import BreadCrumb from '../../../../components/breadCrumb';
import NavbarSearch from '../../../../components/navbarSearch';
import Pagination from '../../../../components/pagination';
import WordButton from '../../../../components/wordButton';
import { connectToDatabase } from '../../../../lib/mongodb';


const Locale = ({data}) => {
    
    const router = useRouter()

    if (router.isFallback == true)
    {
      return <div>
      <span className="visually-hidden">Loading...</span>
    </div>
    }

    const current_locale = router.query.locale

    const words = JSON.parse(data.words);

    const pagination = data.pagination;

    const current_page = router.query.page
    
    const breadcrum_items = [
      {
        name:"Home",
        href:"/"
      },
      {
        name:"en",
        href:"/en"
      },
      {
        name:current_locale,
        href:`/en/${current_locale}/page/1`
      },
      {
        name:current_page.toString(),
        href:`/en/${current_locale}/page/${current_page}`
      }
    ]

    let duration_offset = 0.01
    let duration = 0
  return <div>
      <NavbarSearch/>
      <BreadCrumb breadcrum_items={breadcrum_items}/>
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
      <Pagination current_page={+pagination.page} pageType="locale" max_page={pagination.pageCount} />
  </div>;
};


export async function getStaticProps({ params }) {
    let current_page = +params.page

    const size = 20;
  
    if (current_page == null) {
      current_page = 1;
    }
  
    const skip = (current_page - 1) * size;
  
    const { db } = await connectToDatabase();

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
    props: { data: { words: words, pagination: pagination } },revalidate:60
  };
  }


export async function getStaticPaths() {

  const { db } = await connectToDatabase();

  const l = await db.collection("locales").find({}).toArray()

  let paths = []
  l.map(locale => {

    for(let i=1;i<=5;i++)
    {
      paths.push({
        params:{
          page:i.toString(),
          locale:locale["code"]
        }
      })
    }
  }
   
  )



  return { paths, fallback: "blocking" }

  }

export default Locale;
