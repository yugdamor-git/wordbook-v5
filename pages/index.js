import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BreadCrumb from '../components/breadCrumb'
import Browse from '../components/browse'
import Hero from '../components/hero'
import Locales from '../components/locales'
import NavbarSearch from '../components/navbarSearch'
import Popular from '../components/popular'
import { connectToDatabase } from '../lib/mongodb'

export default function Home({ locales,popular_words }) {
  const router = useRouter();
  const locales_parsed = JSON.parse(locales)
  const p_words_parsed = JSON.parse(popular_words)
  

  let current_page = router.query.page;

  const breadcrum_items = [
    {
      name:"Home",
      href:"/"
    }
  ]


  const seo = {
    site_name:"UpToWord",
    url :`https://uptoword.com`,
    title:"UpToWord - Dictionary in Multiple Languages",
    desc : "Find word meaning from English to your language. Free online dictionary to find word meanings."
  }

  const meta_locale = {
    name:"hindi",
    code:"hi"
  }

  return (
    <div>
  <NextSeo
      title={seo.title}
      description={seo.desc}
      openGraph={{
        url: seo.url,
        title: seo.title,
        description:seo.desc,
        site_name: seo.site_name,

      }}
    />
      <main>
        

      <Hero/>
      <div className="my-4"></div>
      <NavbarSearch meta_locale={meta_locale}/>
      <div className="my-4"></div>
      <Locales languages={locales_parsed}/>
      <div className="my-4"></div>
      <Popular words={p_words_parsed}/>
      
      <Browse page_type={`browse`} selected={null}/>
      </main>
    </div>
  )
}


export async function getStaticProps() {


  const { db } = await connectToDatabase();

  const l = await db.collection("locales").find({}).toArray()
  const locales = JSON.stringify(l)
  
  const popular_words = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({})
      .project({word: 1})
      .sort({views:-1})
      .limit(30)
      .toArray()
  );


  return {
    props: {locales,popular_words},revalidate: 300,
  }
}



