import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import LocaleDropdown from "./localeDropdown";

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const Player = ({ data,locale_meta }) => {
  const [play] = useSound(data.audio_url);

  const target_locale = locale_meta.code

  return (
    <div className="">
      <div className="flex flex-col justify-around">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">
              {data.localization[target_locale].word}
            </h1>
          </div>
          <div className="pt-2 pl-1 text-gray-600 text-sm dark:text-gray-300">
            <h1>{data.localization[target_locale].part_of_speech}</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray-400 dark:text-gray-600">
        <div>
          <h1 className="capitalize text-xl font-bold">{toTitleCase(data.word)}</h1>
        </div>
        <div className="pt-2 pl-1 text-sm">
          <h1>{data.part_of_speech}</h1>
        </div>
      </div>
      {data.phonetic != null && (
        <div className="flex items-center justify-end">
          <button onClick={play} className="">
            <div className="flex items-center rounded-full shadow p-1 px-2 dark:bg-gray-900">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pt-1.5 h-6 w-6 fill-gray-500 hover:fill-primary-500 dark:hover:fill-primary-500 dark:fill-gray-300"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-gray-500 dark:text-gray-300 text-sm">
                  {data.phonetic}
                </h1>
              </div>
            </div>
          </button>
        </div>
      )}

      <div>
        <LocaleDropdown locale_meta={locale_meta} current_word={data.word} />
      </div>
    </div>
  );
};

export default Player;
