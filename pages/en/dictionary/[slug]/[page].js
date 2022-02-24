import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import Browse from '../../../../components/browse'
import NavbarSearch from '../../../../components/navbarSearch'
import Pagination from '../../../../components/pagination'
import WordButton from '../../../../components/wordButton'
import { connectToDatabase } from '../../../../lib/mongodb'


function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const slugs = {
  "english-to-hindi":{
    source:"en",
    target:"hi",
    name:"hindi",
    meta_title:"हिन्दी शब्दकोश"
  },
  "english-to-tamil":{
    source:"en",
    target:"ta",
    name:"tamil",
    meta_title:"தமிழ் அகராதி"
  },
  "english-to-telugu":{
    source:"en",
    target:"te",
    name:"telugu",
    meta_title:"తెలుగు నిఘంటువు"
  },
  "english-to-bengali":{
    source:"en",
    target:"bn",
    name:"bengali",
    meta_title:"বাংলা অভিধান"
  },
  "english-to-kannada":{
    source:"en",
    target:"kn",
    name:"kannada",
    meta_title:"ಕನ್ನಡ ನಿಘಂಟು"
  },
  "english-to-marathi":{
    source:"en",
    target:"mr",
    name:"marathi",
    meta_title:"मराठी शब्दकोश"
  },
  "english-to-malayalam":{
    source:"en",
    target:"ml",
    name:"malayalam",
    meta_title:"മലയാളം നിഘണ്ടു"
  },
  "english-to-gujarati":{
    source:"en",
    target:"gu",
    name:"gujarati",
    meta_title:"ગુજરાતી શબ્દકોશ"
  },
  "english-to-punjabi":{
    source:"en",
    target:"pa",
    name:"punjabi",
    meta_title:"ਪੰਜਾਬੀ ਕੋਸ਼"
  },
  "english-to-urdu":{
    source:"en",
    target:"ur",
    name:"urdu",
    meta_title:"اردو ڈکشنری"
  },

}

const DictionaryLangs = ({words,pagination,meta}) => {
  
  const router = useRouter()
  let parsed_words = JSON.parse(words)

  let source = "english"
  let target = meta.locale_code
  let current_alphabet = meta.alphabet

  const meta_locale = {
    name:meta.locale_name,
    code:meta.locale_code
  }

  const seo = {
    site_name:"UpToWord",
    url :`https://uptoword.com${router.asPath}`,
    title:`English To ${meta.locale_name_upper} Dictionary - ${toTitleCase(meta.locale_title)}`,
    desc : `English to ${meta.locale_name_upper} Dictionary to learn the meaning of words. ${meta.locale_name_upper} Dictionary to get definition, meaning, sentence examples of words.`
  }


  return (
    <div>

    <NextSeo
      noindex={router.query.page == null ? false :true}
      title={seo.title}
      description={seo.desc}
      openGraph={{
        url: seo.url,
        title: seo.title,
        description:seo.desc,
        site_name: seo.site_name,
      }}
    />

      <h1 className="text-xl font-bold text-center my-4 capitalize text-primary-500">{`${meta.slug.replaceAll("-"," ")} Dictionary`} </h1>
      <p className="text-gray-500 p-2 text-sm text-center capitalize">Learn the meaning of thousands of words in {meta.locale_name} with our English to {meta.locale_name} dictionary.<br></br>Not just the meaning, get definition, examples, antonyms, synonyms of words.</p>
      <NavbarSearch meta_locale={meta_locale}/>
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
            <WordButton word={toTitleCase(word.word)} href={`/en/${word.word.toString().replaceAll(" ","-")}-meaning-in-${meta.locale_name}`} />
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

  console.log(page_meta)

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

  const uppercase_locale = `${page_meta.name.charAt(0).toUpperCase()}${page_meta.name.slice(1)}`
  const meta = {
    alphabet : current_alphabet,
    locale_code : target_locale,
    locale_name:page_meta.name,
    locale_title:page_meta.meta_title,
    locale_name_upper:uppercase_locale,
    slug : slug,
  }

  return {
    props: { words: words, pagination: pagination, meta:meta}
  };
}

export default DictionaryLangs