import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Defination from "./defination";
import LocaleDropdown from "./localeDropdown";
import Player from "./player";

const WordDetails = ({ data }) => {
  const router = useRouter();
  const target_locale = router.query.locale
  const word = data[0]

  const locale_to_lang = {
    hi:"hindi",
    ta:"tamil",
    te:"telugu",
    bn:"bengali",
    kn:"kannada",
    mr:"marathi",
    ml:"malayalam",
    gu:"gujarati",
    pa:"punjabi",
    ur:"urdu"
  }

  const meta_localization = {
    "hi":{
      "definations":"परिभाषाएं",
      "examples":"उदाहरण",
      "synonyms":"समानार्थी शब्द",
      "antonyms":"विलोम शब्द",
      "heading":`सरल उदाहरणों और परिभाषाओं के साथ $$$ का वास्तविक अर्थ जानें।.`
    },
    "gu":{
      "definations":"વ્યાખ્યાઓ",
      "examples":"ઉદાહરણ",
      "synonyms":"સમાનાર્થી શબ્દો",
      "antonyms":"વિરોધી શબ્દો",
      "heading":`સરળ ઉદાહરણો અને વ્યાખ્યાઓ સાથે $$$ નો વાસ્તવિક અર્થ જાણો.`
    },
    "ta":{
      "definations":"வரையறைகள்",
      "examples":"உதாரணங்கள்",
      "synonyms":"இணைச்சொற்கள்",
      "antonyms":"எதிர்ச்சொற்கள்",
      "heading":`எளிய எடுத்துக்காட்டுகள் மற்றும் வரையறைகளுடன் $$$ இன் உண்மையான அர்த்தத்தை அறியவும்.`
    },
    "te":{
      "definations":"నిర్వచనాలు",
      "examples":"ఉదాహరణలు",
      "synonyms":"పర్యాయపదాలు",
      "antonyms":"వ్యతిరేక పదాలు",
      "heading":`సాధారణ ఉదాహరణలు మరియు నిర్వచనాలతో $$$ యొక్క నిజమైన అర్థాన్ని తెలుసుకోండి.`
    },
    "bn":{
      "definations":"সংজ্ঞা",
      "examples":"উদাহরণ",
      "synonyms":"সমার্থক শব্দ",
      "antonyms":"বিপরীতার্থক শব্দ",
      "heading":`সাধারণ উদাহরণ এবং সংজ্ঞা সহ $$$ এর আসল অর্থ জানুন।.`
    },
    "kn":{
      "definations":"ವ್ಯಾಖ್ಯಾನಗಳು",
      "examples":"ಉದಾಹರಣೆಗಳು",
      "synonyms":"ಸಮಾನಾರ್ಥಕ ಪದಗಳು",
      "antonyms":"ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು",
      "heading":`ಸರಳ ಉದಾಹರಣೆಗಳು ಮತ್ತು ವ್ಯಾಖ್ಯಾನಗಳೊಂದಿಗೆ $$$ ನ ನಿಜವಾದ ಅರ್ಥವನ್ನು ತಿಳಿಯಿರಿ.`
    },
    "mr":{
      "definations":"व्याख्या",
      "examples":"उदाहरणे",
      "synonyms":"समानार्थी शब्द",
      "antonyms":"विरुद्धार्थी शब्द",
      "heading":`सोप्या उदाहरणे आणि व्याख्यांसह $$$ चा खरा अर्थ जाणून घ्या.`
    },
    "ml":{
      "definations":"നിർവചനങ്ങൾ",
      "examples":"ഉദാഹരണങ്ങൾ",
      "synonyms":"പര്യായങ്ങൾ",
      "antonyms":"വിപരീതപദങ്ങൾ",
      "heading":`ലളിതമായ ഉദാഹരണങ്ങളും നിർവചനങ്ങളും ഉപയോഗിച്ച് $$$ എന്നതിന്റെ യഥാർത്ഥ അർത്ഥം മനസ്സിലാക്കുക.`
    },
    "pa":{
      "definations":"ਪਰਿਭਾਸ਼ਾਵਾਂ",
      "examples":"ਉਦਾਹਰਣਾਂ",
      "synonyms":"ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ",
      "antonyms":"ਵਿਰੋਧੀ ਸ਼ਬਦ",
      "heading":`ਸਧਾਰਨ ਉਦਾਹਰਣਾਂ ਅਤੇ ਪਰਿਭਾਸ਼ਾਵਾਂ ਦੇ ਨਾਲ $$$ ਦਾ ਅਸਲ ਅਰਥ ਜਾਣੋ।.`
    },
    "ur":{
      "definations":"تعریفیں",
      "examples":"مثالیں",
      "synonyms":"مترادفات",
      "antonyms":"متضاد الفاظ",
      "heading":`سادہ مثالوں اور تعریفوں کے ساتھ $$$ کا حقیقی معنی جانیں۔`
    },
    // "ta":{
    //   "defination":""
    // }
    
  }



  return (
    <div className="p-2 m-1">

      <NextSeo
      title="WordBook"
      description={`The easy to understand dictionary with Example Sentences , Famous Quotes and Audio Pronunciations`}
      canonical="https://uptoword.com/"
      openGraph={{
        url: 'https://uptoword.com/',
        title: `${word.word} meaning and definition.`,
        description:`Know the real meaning of ${word.word} with simple examples and definitions.` ,
        images: [
          {
            url: `https://api.inasentence.me/image_generator_testing?text=${word.word}`,
            width: 320,
            height: 220,
            alt: 'Home Image',
            type: 'image/jpeg',
          },
        ],
        site_name: 'uptoword',
      }}
      twitter={{
        cardType: 'The easy to understand dictionary with Example Sentences , Famous Quotes and Audio Pronunciations',
      }}
    />
      <div>
        <p className="text-lg text-gray-600 mb-2 capitalize shadow p-2 rounded-full text-center dark:text-gray-400">
          <span className="font-bold">{word.word}</span> meaning in <span className="font-bold">{locale_to_lang[target_locale]}</span>
        </p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold text-sm md:text-xl text-center">
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
      <div className="flex justify-center">
        <img word={word.word} className="shadow-lg rounded h-auto border-none mt-5" src={`https://api.inasentence.me/image_generator_testing?text=${word.word}`} ></img>
      </div>
      </div>
      
  );
};



export default WordDetails;
