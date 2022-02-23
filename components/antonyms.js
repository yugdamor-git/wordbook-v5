import { route } from "next/dist/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Antonyms = ({ antonym }) => {
  const router = useRouter();
  const target_locale = router.query.locale;
  return (
    <div className="cursor-pointer">
      <Link href={`/en/${target_locale}/${antonym.antonym}`}>
      <div className="text-xs bg-slate-50 rounded-md m-1 text-center text-gray-500 p-1 dark:bg-gray-900 hover:bg-slate-100">
        <div className="flex flex-col">
          <div className="text-gray-600 dark:text-gray-300">
            {antonym.localization[target_locale]}
          </div>
          <div className="text-gray-400 mt-1 dark:text-gray-500">
            {antonym.antonym}
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Antonyms;
