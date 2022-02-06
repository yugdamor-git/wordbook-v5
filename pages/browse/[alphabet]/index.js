import { useRouter } from "next/router";
import React from "react";
import Browse from "../../../components/browse";
import Pagination from "../../../components/pagination";
import WordButton from "../../../components/wordButton";

const Alphabet = ({ data }) => {
  const router = useRouter();
  console.log(data)
  const pagination = data.meta.pagination

  const current_alphabet = router.query.alphabet;

  const words = data.data

  return (
    <div>
      <h1 className="text-center text-primary-500 font-semibold">
        Browse the Dictionary
      </h1>
      <div>
        <Browse selected={current_alphabet} page_type="browse"></Browse>
      </div>
      <div><h1 className="text-center text-primary-500 text-lg font-semibold">Words starts with - { current_alphabet && current_alphabet.toUpperCase()}</h1></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
        {words.map((word) => (
          <div key={word.id}>
             <WordButton word={word.attributes.word} href={`/en/hi/${word.attributes.word}`}/>
          </div>
        
        ))}
      </div>
      <div>
        <Pagination current_page={+pagination.page} max_page={pagination.pageCount}></Pagination>
      </div>
    </div>
  );
};

export default Alphabet;


export async function getServerSideProps(context) {
  const current_alphabet = context.query.alphabet

  let current_page = context.query.page;

  if (current_page == null)
  {
      current_page = 1
  }

  const resp = await fetch(`http://65.108.48.228:1337/api/words?filters[word][$startsWith]=${current_alphabet}&pagination[page]=${current_page}`)
  const data = await resp.json()
  
  return {
    props: {data},
  }
}
