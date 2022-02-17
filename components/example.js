import { useRouter } from "next/router";
import React from "react";
import Antonyms from "./antonyms";
import Synonyms from "./synonyms";

const Example = ({ example, e_index }) => {

  const router = useRouter()
  const target_locale = router.query.locale

  return (
    
    <div className="text-sm bg-gray-50 dark:bg-gray-900 rounded-md p-2">
      <h1 className="text-gray-600 dark:text-gray-300">
        {e_index}. {example.localization[target_locale]}
      </h1>
      <h1 className="text-gray-400 text-sm dark:text-gray-500">
        {e_index}. {example.example}
      </h1>
      <div className="text-sm mt-4">
      
      </div>
    </div>
  );
};

export default Example;
