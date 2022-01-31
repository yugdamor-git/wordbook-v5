import { useRouter } from "next/router";
import React from "react";
import Browse from "../../../components/browse";
import Pagination from "../../../components/pagination";
import WordButton from "../../../components/wordButton";

const Alphabet = () => {
  const router = useRouter();
  const current_alphabet = router.query.alphabet;
  let current_page = router.query.page;

  if (current_page == null)
  {
      current_page = 1
  }

  const words =
    "To control the text color of an input placeholder at a specific breakpoint, add a {screen}: prefix to any existing text color utility. For example, use md:placeholder-green-500 to apply the placeholder-green-500 utility at only medium screen sizes and above.".split(
      " "
    );

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
         <WordButton key={word} word={word} href={`/en/hi/${word}`}/>
        ))}
      </div>
      <div>
        <Pagination current_page={+current_page} max_page={+50}></Pagination>
      </div>
    </div>
  );
};

export default Alphabet;
