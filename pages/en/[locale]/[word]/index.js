import { useRouter } from 'next/router';
import React from 'react';
import LocaleDropdown from '../../../../components/localeDropdown';
import Suggestions from '../../../../components/suggestions';
import WordDetails from '../../../../components/word';
import { connectToDatabase } from '../../../../lib/mongodb';



const Word = ({data,suggestion_words}) => {

  const router = useRouter()

  const target_locale = router.query.locale;

  const word = JSON.parse(data)

  const w_suggestions = JSON.parse(suggestion_words)
 
  return <div className="py-2">
   <WordDetails data={word} ></WordDetails>
   <Suggestions words={w_suggestions}/>
  </div>;
};


export async function getServerSideProps(context) {
  const current_word = decodeURI(context.query.word).replaceAll("-", " ");
  const target_locale = context.query.locale;

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
    props: { data, suggestion_words },
  };
}

export default Word;
