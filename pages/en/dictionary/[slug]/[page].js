import { useRouter } from 'next/router'
import React from 'react'
import Browse from '../../../../components/browse'
import NavbarSearch from '../../../../components/navbarSearch'
import Pagination from '../../../../components/pagination'
import WordButton from '../../../../components/wordButton'
import { connectToDatabase } from '../../../../lib/mongodb'


const slugs = {
  "english-to-hindi":{
    source:"en",
    target:"hi"
  },
  "english-to-tamil":{
    source:"en",
    target:"ta"
  },
  "english-to-telugu":{
    source:"en",
    target:"te"
  },
  "english-to-bengali":{
    source:"en",
    target:"bn"
  },
  "english-to-kannada":{
    source:"en",
    target:"kn"
  },
  "english-to-marathi":{
    source:"en",
    target:"mr"
  },
  "english-to-malayalam":{
    source:"en",
    target:"ml"
  },
  "english-to-gujarati":{
    source:"en",
    target:"gu"
  },
  "english-to-punjabi":{
    source:"en",
    target:"pa"
  },
  "english-to-urdu":{
    source:"en",
    target:"ur"
  },

}

const DictionaryLangs = ({words,pagination,meta}) => {
  
  let parsed_words = JSON.parse(words)


  // const router = useRouter()

  // const slug = router.query.slug

  // const page_meta = slugs[slug]

  // if (page_meta == null)
  // {
  //   router.push("/404")
  // }

  // const target_locale = page_meta.target

  // const page = router.query.page

  // let current_alphabet = router.query.startsWith

  // if (current_alphabet == null)
  // {
  //     current_alphabet = 'a'
  // }
  let source = "english"
  let target = meta.locale
  let current_alphabet = meta.alphabet


  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4 capitalize text-primary-500">{`${meta.slug.replaceAll("-"," ")} Dictionary`} </h1>
      <p className="text-gray-500 p-2 text-sm text-center capitalize">Learn the meaning of thousands of words in Hindi with our English to Hindi dictionary.<br></br>Not just the meaning, get definition, examples, antonyms, synonyms of words.</p>
      <NavbarSearch target_locale={target}/>
      <Browse />
      <div>
        <h1 className="text-center text-primary-500 text-lg font-semibold capitalize">
          Words starts with -{" "}
          {current_alphabet && current_alphabet}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
        {parsed_words.map((word) => (
          <div key={word._id}>
            <WordButton word={word.word} href={`/en/${target}/${word.word.toString().replaceAll(" ","-")}`} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          current_page={+pagination.page}
          max_page={pagination.pageCount}
          pageType="alphabet"
        />
      </div>



    </div>
  )
}



export async function getServerSideProps(context) {

  const slug = context.query.slug

  const page_meta = slugs[slug]

  if (page_meta == null)
  {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  const target_locale = page_meta.target

  let current_page = context.query.page

  let current_alphabet = context.query.startsWith

  if (current_alphabet == null)
  {
      current_alphabet = 'a'
  }

  const size = 20;

  if (current_page == null) {
    current_page = 1;
  }

  const skip = (current_page - 1) * size;

  const { db } = await connectToDatabase();

  const words = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({ word: { $regex: `^${current_alphabet}` } })
      .project({word: 1})
      .limit(size)
      .skip(skip)
      .toArray()
  );

  const total_docs = parseInt(
    await db
      .collection(process.env.DATA_COLLECTION)
      .count({ word: { $regex: `^${current_alphabet}` } })
  );

  const total_pages = Math.ceil(total_docs / size);

  const pagination = {
    total: total_docs,
    pageCount: total_pages,
    pageSize: size,
    page: current_page,
  };

  const meta = {
    alphabet : current_alphabet,
    locale : target_locale,
    slug : slug,
  }

  return {
    props: { words: words, pagination: pagination, meta:meta}
  };
}

export default DictionaryLangs