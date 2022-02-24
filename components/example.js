import { useRouter } from "next/router";
import React from "react";
import Antonyms from "./antonyms";
import Synonyms from "./synonyms";

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const Example = ({ example, e_index,locale_meta }) => {

  const target_locale = locale_meta.code
  return (
    
    <div className="text-sm bg-gray-50 dark:bg-gray-900 rounded-md p-2">
      <p className="text-gray-600 dark:text-gray-300">
        {e_index}. {example.localization[target_locale]}
      </p>
      <p className="text-gray-400 text-sm dark:text-gray-500">
        {e_index}. {toTitleCase(example.example)}
      </p>
      <div className="text-sm mt-4">
      
      </div>
    </div>
  );
};

export default Example;
