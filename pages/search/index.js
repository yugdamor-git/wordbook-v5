import React from 'react';
import Search from "../../components/search";
import WordButton from '../../components/wordButton';

const SearchPage = ({ data }) => {
  return <div>
      <Search/>
        
      {
          data.data.map(item=>(
              
              <WordButton key={item.id} word={item.attributes.word} href={`/en/hi/${item.attributes.word}`}/>
          ))
      }

  </div>;
};





export default SearchPage;


export async function getServerSideProps(context) {
    const q = context.query.q
    const resp = await fetch(`http://65.108.48.228:1337/api/words?filters[word][$startsWith]=${q}`)
    const data = await resp.json()
    
    return {
      props: {data},
    }
  }
  