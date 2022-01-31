import React from 'react';
import WordDetails from '../../../../components/word';



const Word = () => {
    const word  = 
        {
            word:"abductions",
            meaning :"the action of forcibly taking someone away against their will.",
            phonetic :`əbˈdʌkʃn`,
            audio_url:"https://ssl.gstatic.com/dictionary/static/sounds/20200429/abduction--_gb_1.mp3",
            origin:"mid 1900",
            examples:"he action of forcibly taking someone away against their will.",
            locales:[
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


        }
    
  return <div>
   <WordDetails word={word}></WordDetails>
  </div>;
};

export default Word;
