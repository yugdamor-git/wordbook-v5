import Link from 'next/link';
import React from 'react';

const Locales = () => {
    const languages = [
        {name:"Hindi",code:"hi"},
        {name:"Gujarati",code:"gu"},
        {name:"Tamil",code:"ta"},
        {name:"Telugu",code:"te"},
        {name:"Bengali",code:"bn"},
        {name:"Kannada",code:"kn"},
        {name:"Marathi",code:"mr"},
        {name:"Malayalam",code:"ml"},
        {name:"Punjabi",code:"pa"},
        {name:"Urdu",code:"ur"}
    ]
  return <div className="shadow rounded">
      <div className="text-center font-semibold text-white bg-primary-500 rounded-t p-1"><h1>Indian Language Dictionaries</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 text-gray-500">
        {
            languages.map(lang=>(
                                <Link href={"/en/" + lang.code + "?page=1"}>
                <div className="bg-gray-50 m-4 p-4 rounded-xl text-center hover:text-primary-500 hover:bg-primary-50 hover:font-semibold shadow cursor-pointer">
                    <span>English To <span className="text-indigo-500">{lang.name}</span></span>
                </div>
                </Link>
                

            ))
        }
      </div>
  </div>;
};

export default Locales;
