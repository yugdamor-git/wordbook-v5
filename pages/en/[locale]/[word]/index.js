import React from 'react';
import WordDetails from '../../../../components/word';



const Word = ({data}) => {


 
  return <div>
   <WordDetails data={data} ></WordDetails>
  </div>;
};


export async function getServerSideProps(context) {
    const current_word = context.query.word
    const current_locale = context.query.locale
    const resp = await fetch(`http://65.108.48.228:1337/api/words?filters[word][$eq]=${current_word}&populate=*`)
    const data = await resp.json()

    console.log("data")
    console.log(data)
    
    return {
      props: {data},
    }
  }

export default Word;
