import { useRouter } from 'next/router';
import React from 'react';
import BreadCrumb from '../../../../components/breadCrumb';
import LocaleDropdown from '../../../../components/localeDropdown';
import Suggestions from '../../../../components/suggestions';
import WordDetails from '../../../../components/word';
import { connectToDatabase } from '../../../../lib/mongodb';



const Word = ({data,suggestion_words}) => {

  const router = useRouter()

  const target_locale = router.query.locale;

  const word = JSON.parse(data)

  const w_suggestions = JSON.parse(suggestion_words)
 
  const breadcrum_items = [
    {
      name:"Home",
      href:"/",
    },
    {
      name:"en",
      href:"/en"
    },
    {
      name:router.query.locale,
      href:`/en/${router.query.locale}/page/1`
    },
    {
      name:router.query.word,
      href:`/en/${router.query.locale}/${router.query.word}`
    }

  ]

  return <div className="py-2">
    
   <WordDetails data={word} ></WordDetails>
   <Suggestions words={w_suggestions}/>
  </div>;
};


export async function getStaticProps({ params }) {
  const current_word = decodeURI(params.word).replaceAll("-", " ");

  const { db } = await connectToDatabase();

  const w = await db
    .collection(process.env.DATA_COLLECTION)
    .find({ word: current_word })
    .toArray();

  const data = JSON.stringify(w);

  db.collection(process.env.DATA_COLLECTION).updateOne(
    { word: current_word },
    { $inc: { views: 1 } }
  );

  const suggestion_words = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({ word: { $regex: `^${current_word.slice(0, 3)}` } })
      .project({ word: 1 })
      .limit(20)
      .toArray()
  );
  return {
    props: { data, suggestion_words },revalidate:60
  };
}



export async function getStaticPaths() {

  const { db } = await connectToDatabase();

  const words = await db
      .collection(process.env.DATA_COLLECTION)
      .find({})
      .sort({views:-1,likes:-1})
      .project({ word: 1 })
      .limit(10)
      .toArray()

  const l = await db.collection("locales").find({}).toArray()

  let paths = []

  words.map(w =>{

    l.map(locale=>{
      if (locale["code"] != "en")
      {
        paths.push({
          params:{
            word:w.word,locale:locale["code"]
          }
        })
      }
     
    })
    
  }
   
  )


  return { paths, fallback: "blocking" }


}




export default Word;
