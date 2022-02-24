import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Defination from "./defination";
import LocaleDropdown from "./localeDropdown";
import Player from "./player";



const WordDetails = ({ data,locale_meta,locale_to_lang,meta_localization }) => {
  const router = useRouter();

  

  const target_locale = locale_meta.code

  let slug = router.query.slug.replace("-meaning-in-",":::").split(":::")

  let lang = slug[1]

  const word = data[0]

  console.log(locale_meta)

  let t_word = locale_meta.name

  t_word = t_word.charAt(0).toUpperCase() + t_word.slice(1)

  

  return (
    <div className="p-2 m-1">

     
      <div>
        <p className="text-lg md:text-3xl text-gray-600 mb-2 capitalize p-2 text-center dark:text-gray-400">
          <h1><span className="font-bold">{word.word.charAt(0).toUpperCase() + word.word.slice(1)}</span> Meaning In <span className="font-bold">{t_word}</span></h1>
        </p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold text-center text-[16px]">
          <span>{meta_localization[target_locale].heading.split("$$$")[0]}</span>
          <span className="text-primary-500 font-bold">{word.word}</span>
          <span>{meta_localization[target_locale].heading.split("$$$")[1]}</span>
        </p>
      </div>
      <div className="flex justify-end items-center my-2">
        <div className="text-primary-500 text-xs mx-2">{word.views}</div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-primary-500" viewBox="0 0 20 20">
  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
</svg>
        </div>
      </div>
      
      <div className="">
        <Player locale_meta={locale_meta} data={word}/>
      </div>

      {
        word.definations.length > 0 &&

        <div className="mt-8">
      <h1 className="text-gray-600 dark:text-gray-300">{meta_localization[target_locale].definations}</h1>
      <h1 className="text-gray-600 text-sm">Definitions</h1>

      {
        word.definations.map((d,index) => (
          <Defination key={index} d={d} index={index + 1} locale_meta={locale_meta}  />
        ))
      }

      </div>
 
    
      }
      <div className="flex justify-center">
        <img word={word.word} className="shadow-lg rounded h-auto border-none mt-5" src={`https://api.uptoword.com/generate_image?text=${word.word}&locale=${locale_to_lang[target_locale]}`} ></img>
      </div>
      </div>
      
  );
};



export default WordDetails;
