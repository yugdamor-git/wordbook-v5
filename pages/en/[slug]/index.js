import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import NavbarSearch from '../../../components/navbarSearch';
import Suggestions from '../../../components/suggestions';
import WordDetails from '../../../components/word';
import { connectToDatabase } from '../../../lib/mongodb';

const locale_to_lang = {
  hi:"hindi",
  hindi:"hi",
  ta:"tamil",
  tamil:"ta",
  te:"telugu",
  telugu:"te",
  bn:"bengali",
  bengali:"bn",
  kn:"kannada",
  kannada:"kn",
  mr:"marathi",
  marathi:"mr",
  ml:"malayalam",
  malayalam:"ml",
  gu:"gujarati",
  gujarati:"gu",
  pa:"punjabi",
  punjabi:"pa",
  ur:"urdu",
  urdu:"ur"
}

const meta_localization = {
  "hi":{
    "definations":"परिभाषाएं",
    "examples":"उदाहरण",
    "synonyms":"समानार्थी शब्द",
    "antonyms":"विलोम शब्द",
    "heading":`सरल उदाहरणों और परिभाषाओं के साथ $$$ का वास्तविक अर्थ जानें।.`,
    "meta_title":"अर्थ"
  },
  "gu":{
    "definations":"વ્યાખ્યાઓ",
    "examples":"ઉદાહરણ",
    "synonyms":"સમાનાર્થી શબ્દો",
    "antonyms":"વિરોધી શબ્દો",
    "heading":`સરળ ઉદાહરણો અને વ્યાખ્યાઓ સાથે $$$ નો વાસ્તવિક અર્થ જાણો.`,
    "meta_title":"અર્થ"
  },
  "ta":{
    "definations":"வரையறைகள்",
    "examples":"உதாரணங்கள்",
    "synonyms":"இணைச்சொற்கள்",
    "antonyms":"எதிர்ச்சொற்கள்",
    "heading":`எளிய எடுத்துக்காட்டுகள் மற்றும் வரையறைகளுடன் $$$ இன் உண்மையான அர்த்தத்தை அறியவும்.`,
    "meta_title":"பொருள்"
  },
  "te":{
    "definations":"నిర్వచనాలు",
    "examples":"ఉదాహరణలు",
    "synonyms":"పర్యాయపదాలు",
    "antonyms":"వ్యతిరేక పదాలు",
    "heading":`సాధారణ ఉదాహరణలు మరియు నిర్వచనాలతో $$$ యొక్క నిజమైన అర్థాన్ని తెలుసుకోండి.`,
    "meta_title":"అర్థం"
  },
  "bn":{
    "definations":"সংজ্ঞা",
    "examples":"উদাহরণ",
    "synonyms":"সমার্থক শব্দ",
    "antonyms":"বিপরীতার্থক শব্দ",
    "heading":`সাধারণ উদাহরণ এবং সংজ্ঞা সহ $$$ এর আসল অর্থ জানুন।.`,
    "meta_title":"অর্থ"
  },
  "kn":{
    "definations":"ವ್ಯಾಖ್ಯಾನಗಳು",
    "examples":"ಉದಾಹರಣೆಗಳು",
    "synonyms":"ಸಮಾನಾರ್ಥಕ ಪದಗಳು",
    "antonyms":"ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು",
    "heading":`ಸರಳ ಉದಾಹರಣೆಗಳು ಮತ್ತು ವ್ಯಾಖ್ಯಾನಗಳೊಂದಿಗೆ $$$ ನ ನಿಜವಾದ ಅರ್ಥವನ್ನು ತಿಳಿಯಿರಿ.`,
    "meta_title":"ಅರ್ಥ"
  },
  "mr":{
    "definations":"व्याख्या",
    "examples":"उदाहरणे",
    "synonyms":"समानार्थी शब्द",
    "antonyms":"विरुद्धार्थी शब्द",
    "heading":`सोप्या उदाहरणे आणि व्याख्यांसह $$$ चा खरा अर्थ जाणून घ्या.`,
    "meta_title":"अर्थ"
  },
  "ml":{
    "definations":"നിർവചനങ്ങൾ",
    "examples":"ഉദാഹരണങ്ങൾ",
    "synonyms":"പര്യായങ്ങൾ",
    "antonyms":"വിപരീതപദങ്ങൾ",
    "heading":`ലളിതമായ ഉദാഹരണങ്ങളും നിർവചനങ്ങളും ഉപയോഗിച്ച് $$$ എന്നതിന്റെ യഥാർത്ഥ അർത്ഥം മനസ്സിലാക്കുക.`,
    "meta_title":"അർത്ഥം"
  },
  "pa":{
    "definations":"ਪਰਿਭਾਸ਼ਾਵਾਂ",
    "examples":"ਉਦਾਹਰਣਾਂ",
    "synonyms":"ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ",
    "antonyms":"ਵਿਰੋਧੀ ਸ਼ਬਦ",
    "heading":`ਸਧਾਰਨ ਉਦਾਹਰਣਾਂ ਅਤੇ ਪਰਿਭਾਸ਼ਾਵਾਂ ਦੇ ਨਾਲ $$$ ਦਾ ਅਸਲ ਅਰਥ ਜਾਣੋ।.`,
    "meta_title":"ਮਤਲਬ"
  },
  "ur":{
    "definations":"تعریفیں",
    "examples":"مثالیں",
    "synonyms":"مترادفات",
    "antonyms":"متضاد الفاظ",
    "heading":`سادہ مثالوں اور تعریفوں کے ساتھ $$$ کا حقیقی معنی جانیں۔`,
    "meta_title":"معنی"
  },
  
}

const Word = ({data,suggestion_words}) => {

  const router = useRouter()

  let slug = router.query.slug.replace("-meaning-in-",":::").split(":::")
  

  let lang = slug[1]

  const locale_meta = {
    name:lang,
    code:locale_to_lang[lang],
    name_upper:`${lang.charAt(0).toUpperCase()}${lang.slice(1)}`
  }

  
  const word = JSON.parse(data)

  const w_suggestions = JSON.parse(suggestion_words)
 

  const seo = {
    site_name:"UpToWord",
    url :`https://uptoword.com`,
    title:`Trust Meaning In ${locale_meta.name_upper} - ${word[0].localization[locale_meta.code].word} ${meta_localization[locale_meta.code].meta_title}`,
    desc : "Find word meaning from English to your language. Free online dictionary to find word meanings."
  }
 
  return <div className="py-2">
     <NextSeo
      title={seo.title}
      description={seo.desc}
      openGraph={{
        url: seo.url,
        title: seo.title,
        description:seo.desc,
        site_name: seo.site_name,

      }}
      />
    <NavbarSearch meta_locale={locale_meta}/>
   <WordDetails locale_meta={locale_meta} data={word} meta_localization={meta_localization} locale_to_lang={locale_to_lang} ></WordDetails>
   <Suggestions locale_meta={locale_meta} words={w_suggestions}/>
  </div>;
};


export async function getServerSideProps(context) {

  let slug = context.query.slug.replace("-meaning-in-",":::").split(":::")
  
  let word = slug[0]

  let lang = slug[1]

  const lang_code = locale_to_lang[lang]
  const current_word = decodeURI(word).replaceAll("-", " ").toLowerCase();

  const { db } = await connectToDatabase();

  const w = await db
    .collection(process.env.DATA_COLLECTION)
    .find({ word: current_word })
    .toArray();

  if (w.length == 0 || lang_code == null)
  {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
  

  const data = JSON.stringify(w);

  db.collection(process.env.DATA_COLLECTION).updateOne(
    { word: current_word },
    { $inc: { views: 1 } }
  );

  const suggestion_words = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({ word: { $regex: `^${current_word.slice(0, 3)}` } })
      .project({ word: 1 })
      .limit(20)
      .toArray()
  );

  return {
    props: { data, suggestion_words }
  };
}



// export async function getStaticPaths() {

//   const { db } = await connectToDatabase();

//   const words = await db
//       .collection(process.env.DATA_COLLECTION)
//       .find({})
//       .sort({views:-1,likes:-1})
//       .project({ word: 1 })
//       .limit(10)
//       .toArray()

//   const l = await db.collection("locales").find({}).toArray()

//   let paths = []

//   words.map(w =>{

//     l.map(locale=>{
//       if (locale["code"] != "en")
//       {
//         paths.push({
//           params:{
//             word:w.word,locale:locale["code"]
//           }
//         })
//       }
     
//     })
    
//   }
   
//   )


//   return { paths, fallback: "blocking" }


// }




export default Word;
