import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import WordButton from '../../../components/wordButton';

const TopWords = () => {
    const router = useRouter()

    const words = "To control the text color of an input placeholder at a specific breakpoint, add a {screen}: prefix to any existing text color utility. For example, use md:placeholder-green-500 to apply the placeholder-green-500 utility at only medium screen sizes and above.".split(" ")

    const count = router.query.count 

    console.log(router.query.count)
  return <div>
      <div className="text-center my-2 font-semibold text-primary-500"><h1>Top {count} Words</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
          {
              words.map(word => (
                  <div key={word}>
                      <WordButton word={word} href={`/en/hi/${word}`}/>
                  </div>
                  
                
              ))
          }
      </div>
  </div>;
};

export default TopWords;