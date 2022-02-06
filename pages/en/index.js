import React from 'react';
import Locales from '../../components/locales';

const EnglishLocale = ({ data }) => {
  return <div>
      <Locales languages={data}></Locales>
  </div>;
};


export async function getServerSideProps(context) {
  const resp = await fetch(`http://65.108.48.228:1337/api/i18n/locales`)
  const data = await resp.json()
  
  return {
    props: {data},
  }
}


export default EnglishLocale;
