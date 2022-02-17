import React from 'react';
import Locales from '../../components/locales';
import { connectToDatabase } from '../../lib/mongodb';

const EnglishLocale = ({ locales }) => {

  const parsed_locales = JSON.parse(locales)
  return <div>
      <Locales languages={parsed_locales}></Locales>
  </div>;
};


export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const l = await db.collection("locales").find({}).toArray()
  const locales = JSON.stringify(l)
  
  return {
    props: {locales},
  }
}


export default EnglishLocale;
