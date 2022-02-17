import { useRouter } from "next/router";
import React from "react";
import Defination from "./defination";
import LocaleDropdown from "./localeDropdown";
import Player from "./player";

const WordDetails = ({ data }) => {
  const router = useRouter();
  const target_locale = router.query.locale
  const word = data[0]

  const meta_localization = {
    "hi":{
      "definations":"परिभाषाएं",
      "examples":"उदाहरण",
      "synonyms":"समानार्थी शब्द",
      "antonyms":"विलोम शब्द"
    },
    "gu":{
      "definations":"વ્યાખ્યાઓ",
      "examples":"ઉદાહરણ",
      "synonyms":"સમાનાર્થી શબ્દો",
      "antonyms":"વિરોધી શબ્દો"
    },
    "ta":{
      "definations":"வரையறைகள்",
      "examples":"உதாரணங்கள்",
      "synonyms":"இணைச்சொற்கள்",
      "antonyms":"எதிர்ச்சொற்கள்"
    },
    "te":{
      "definations":"నిర్వచనాలు",
      "examples":"ఉదాహరణలు",
      "synonyms":"పర్యాయపదాలు",
      "antonyms":"వ్యతిరేక పదాలు"
    },
    "bn":{
      "definations":"সংজ্ঞা",
      "examples":"উদাহরণ",
      "synonyms":"সমার্থক শব্দ",
      "antonyms":"বিপরীতার্থক শব্দ"
    },
    "kn":{
      "definations":"ವ್ಯಾಖ್ಯಾನಗಳು",
      "examples":"ಉದಾಹರಣೆಗಳು",
      "synonyms":"ಸಮಾನಾರ್ಥಕ ಪದಗಳು",
      "antonyms":"ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು"
    },
    "mr":{
      "definations":"व्याख्या",
      "examples":"उदाहरणे",
      "synonyms":"समानार्थी शब्द",
      "antonyms":"विरुद्धार्थी शब्द"
    },
    "ml":{
      "definations":"നിർവചനങ്ങൾ",
      "examples":"ഉദാഹരണങ്ങൾ",
      "synonyms":"പര്യായങ്ങൾ",
      "antonyms":"വിപരീതപദങ്ങൾ"
    },
    "pa":{
      "definations":"ਪਰਿਭਾਸ਼ਾਵਾਂ",
      "examples":"ਉਦਾਹਰਣਾਂ",
      "synonyms":"ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ",
      "antonyms":"ਵਿਰੋਧੀ ਸ਼ਬਦ"
    },
    "ur":{
      "definations":"تعریفیں",
      "examples":"مثالیں",
      "synonyms":"مترادفات",
      "antonyms":"متضاد الفاظ"
    },
    // "ta":{
    //   "defination":""
    // }
    
  }



  return (
    <div className="p-2 m-1">
      <div className="flex justify-end items-center">
        <div className="text-primary-500 text-xs mx-2">{word.views}</div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-primary-500" viewBox="0 0 20 20">
  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
</svg>
        </div>
      </div>
      <div className="">
        <Player data={word}/>
      </div>

      {
        word.definations.length > 0 &&

        <div className="mt-8">
      <h1 className="text-gray-600 dark:text-gray-300">{meta_localization[target_locale].definations}</h1>
      <h1 className="text-gray-600 text-sm">Definitions</h1>

      {
        word.definations.map((d,index) => (
          <Defination key={index} d={d} index={index + 1}  />
        ))
      }

      </div>
 
    
      }
      </div>
      
  );
};

export default WordDetails;
