import { useRouter } from "next/router";
import React from "react";
import Player from "./player";

const WordDetails = ({ data, playAudio }) => {
  const router = useRouter();
  const target_locale = router.query.locale;

 const audio_url = data.data[0].attributes.audio_url

 

  return (
    <div className="">
      <div className="">
        <Player url={audio_url} word={data.data[0].attributes.word} phonetic={data.data[0].attributes.phonetic}/>
       
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
