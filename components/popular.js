import React from 'react';
import WordButton from './wordButton';

const Popular = () => {
    const words =
    "To control the text color of an input placeholder at a specific breakpoint, add a {screen}: prefix to any existing text color utility. For example, use md:placeholder-green-500 to apply the placeholder-green-500 utility at only medium screen sizes and above.".split(
      " "
    );

  return <div className="shadow pb-4 rounded dark:bg-black">
      <div className="bg-primary-500 p-1 mt-4 text-white text-center rounded-t mb-1 font-semibold dark:text-slate-300 dark:bg-primary-500">
          <h1>Most Popular Words</h1>
      </div>
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

export default Popular;
