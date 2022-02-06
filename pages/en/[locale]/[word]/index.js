import React from 'react';
import WordDetails from '../../../../components/word';



const Word = ({data}) => {

    const word  =  data.data[0].attributes
    
  return <div>
   <WordDetails word={word}></WordDetails>
  </div>;
};


export async function getServerSideProps(context) {
    const current_word = context.query.word
    const current_locale = context.query.locale
    const resp = await fetch(`http://65.108.48.228:1337/api/words?filter[word][$eq]=${current_word}populate=*`)
    const data = await resp.json()
    
    return {
      props: {data},
    }
  }

export default Word;
