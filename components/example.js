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


function highlighter(sentence,word)
{
  let s = sentence.toLowerCase().split(word.toLowerCase())
  if (s.length == 2)
  {
    return <><span>{s[0]}</span><span className="text-primary-500">{word}</span><span>{s[1]}</span></>
  }
  else if (s.length == 3)
  {
    return <><span>{s[0]}</span><span className="text-primary-500">{word}</span><span>{s[1]}</span><span className="text-primary-500">{word}</span><span>{s[2]}</span></>
  }
  else{
    return <span>{sentence}</span>
  }
}

const Example = ({ example, e_index,locale_meta,word }) => {

  const target_locale = locale_meta.code
  let target_word = word.localization[target_locale].word
  let target_example = example.localization[target_locale]

  let en_word = word.word
  let en_example = example.example

  console.log(target_word)
  return (
    
    <div className="text-sm bg-gray-50 dark:bg-gray-900 rounded-md p-2 m-1">
      <p className="text-gray-600 dark:text-gray-300">
        {e_index}. <span>{highlighter(target_example,target_word)}</span>
      </p>
      <p className="text-gray-400 text-sm dark:text-gray-500">
        {e_index}. <span>{highlighter(en_example,en_word)}</span>
      </p>
      <div className="text-sm mt-4">
      
      </div>
    </div>
  );
};

export default Example;
