import React from 'react';
import BreadCrumb from '../../components/breadCrumb';
import Locales from '../../components/locales';
import { connectToDatabase } from '../../lib/mongodb';

const EnglishLocale = ({ locales }) => {

  const parsed_locales = JSON.parse(locales)

  const breadcrum_items = [
    {
      name:"Home",
      href:"/"
    },
    {
      name:"en",
      href:"/en"
    }
  ]

  return <div>
      <BreadCrumb breadcrum_items={breadcrum_items}/>
      <Locales languages={parsed_locales}></Locales>
  </div>;
};


export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const l = await db.collection("locales").find({}).toArray()
  const locales = JSON.stringify(l)
  
  return {
    props: {locales}
  }
}


export default EnglishLocale;
