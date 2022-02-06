import { useRouter } from "next/router";
import React from "react";
import Player from "./player";

const WordDetails = ({ data, playAudio }) => {
  const router = useRouter();
  const target_locale = router.query.locale;

 

  return (
    <div className="">
      <div className="">
        <div className="flex items-center justify-center">
          <div>
            <Player url={`https:${data.data[0].attributes.audio_url}`}/>
            <h1 className="text-3xl font-bold text-primary-600">{data.data[0].attributes.word} - {data.data[0].attributes.phonetic}</h1>
          </div>
          <button onClick={playAudio} className="px-4 pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 fill-gray-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          
        </div>
       
      </div>

      <div className="my-2 shadow p-3 rounded text">
        <h1 className="font-semibold text-primary-500">Defination :</h1>
        <p className="text-sm">{data.data[0].attributes.part_of_speech}</p>
      </div>
      <div className="my-2 shadow p-3 rounded">
        <h1 className="font-semibold text-primary-500">Origin :</h1>
        <p className="text-sm">{data.data[0].attributes.origin}</p>
      </div>

      <div className="my-2 shadow p-3 rounded">
        <h1 className="font-semibold text-primary-500">Examples :</h1>
        <p>{data.data[0].attributes.createdAt}</p>
      </div>

      <div className="my-2 shadow p-3 rounded">
        <h1 className="font-semibold text-primary-500">Synonyms :</h1>
        <p>{data.data[0].attributes.publishedAt}</p>
      </div>

      <div className="my-2 shadow p-3 rounded">
        <h1 className="font-semibold text-primary-500">Antonyms :</h1>
        <p>{data.data[0].attributes.audio_url}</p>
      </div>
    </div>
  );
};

export default WordDetails;
