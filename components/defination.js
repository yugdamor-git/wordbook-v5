import { useRouter } from "next/router";
import React from "react";
import Antonyms from "./antonyms";
import Example from "./example";
import Synonyms from "./synonyms";

const Defination = ({ d, index,locale_meta,word }) => {

  const target_locale = locale_meta.code

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
    <div className="px-4 mt-4 py-2 border-y-2 border-gray-300 dark:border-gray-600">
      <div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-2">
        <p className="text-primary-500 font-semibold">
          {index}. {d.localization[target_locale]}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {index}. {d.defination}
        </p>
        </div>
        
        <div className=" my-2 dark:border-gray-600">
        {d.examples.length > 0 &&
          <div>
          <h1 className="mt-4 text-gray-600 dark:text-gray-300">{meta_localization[target_locale].examples}</h1>
          <h1 className="text-gray-400 text-sm dark:text-gray-600">Examples</h1>
          
            <div className="px-4 mt-2">
              {d.examples.map((e, e_index) => (
                <Example key={e.example} example={e} e_index={e_index + 1} locale_meta={locale_meta} word={word} />
              ))}
            </div>
            </div>
          }

          {d.antonyms.length > 0 &&
            <div className=" my-2 py-2 dark:border-gray-600">
            <h1 className="text-gray-600 dark:text-gray-300">{meta_localization[target_locale].antonyms}</h1>
            <h1 className="text-gray-400 text-sm dark:text-gray-600">Antonyms</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-2">
              {d.antonyms.map((a_en, index) => (
                <Antonyms key={a_en.antonym} antonym={a_en} a_index={index} locale_meta={locale_meta} />
              ))}
            </div>
          </div>
          }
          

          {d.synonyms.length > 0 &&
            <div className=" my-2 py-2 dark:border-gray-600">
            <h1 className="text-gray-600 dark:text-gray-300">{meta_localization[target_locale].synonyms}</h1>
            <h1 className="text-gray-400 text-sm dark:text-gray-600">Synonyms</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-2">
              {d.synonyms.map((s_en, index) => (
                <Synonyms key={s_en.synonym} synonym={s_en} a_index={index} locale_meta={locale_meta} />
              ))}
            </div>
          </div>
          }


        </div>
      </div>
    </div>
  );
};

export default Defination;
