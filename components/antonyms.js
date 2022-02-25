import { route } from "next/dist/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const Antonyms = ({ antonym,locale_meta }) => {

  const target_locale = locale_meta.code

  return (
    <div className="cursor-pointer">
      <Link passHref href={`/en/${antonym.antonym.replaceAll(" ","-")}-meaning-in-${locale_meta.name}`}>
        <a>
      <div className="text-xs bg-slate-50 rounded-md m-1 text-center text-gray-500 p-1 dark:bg-gray-900 hover:bg-slate-100">
        <div className="flex flex-col">
          <div className="text-gray-600 dark:text-gray-300">
            {antonym.localization[target_locale]}
          </div>
          <div className="text-gray-400 mt-1 dark:text-gray-500">
            {toTitleCase(antonym.antonym)}
          </div>
        </div>
      </div>
      </a>
      </Link>
    </div>
  );
};

export default Antonyms;
