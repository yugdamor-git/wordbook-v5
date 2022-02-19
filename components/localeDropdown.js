import { useRouter } from "next/router";
import React from "react";
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Popover } from '@headlessui/react'

const LocaleDropdown = () => {
  const router = useRouter();

  const current_locale = router.query.locale;

  const current_word = decodeURI(router.query.word);

  const locales = [
    {
      name: "english",
      code: "en",
      default: true,
    },
    {
      name: "hindi",
      code: "hi",
      default: false,
    },
    {
      name: "tamil",
      code: "ta",
      default: false,
    },
    {
      name: "telugu ",
      code: "te",
      default: false,
    },
    {
      name: "bengali",
      code: "bn",
      default: false,
    },
    {
      name: "kannada",
      code: "kn",
      default: false,
    },
    {
      name: "marathi",
      code: "mr",
      default: false,
    },
    {
      name: "malayalam",
      code: "ml",
      default: false,
    },
    {
      name: "gujarati",
      code: "gu",
      default: false,
    },
    {
      name: "punjabi",
      code: "pa",
      default: false,
    },
    {
      name: "urdu",
      code: "ur",
      default: false,
    },
  ];

  return (

    <div>
      <Menu>
        <Menu.Button className="bg-primary-500 rounded p-2 text-white text-xs">Change Language</Menu.Button>
        <Menu.Items className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 space-x-2 space-y-2">
        {locales.map(
        (locale) =>
          locale.default == false &&
          <Link
          href={`/en/${locale.code}/${current_word.replace(" ", "-")}`}
        >
          <Menu.Item as="div" className={`${locale.code == current_locale ? "bg-primary-50 text-primary-500 ":"bg-gray-50 "} transition ease-in-out delay-150 flex items-center mt-2 ml-2 rounded hover:bg-primary-500 hover:text-white dark:bg-slate-900 dark:hover:bg-slate-800`}>
          <motion.div
              initial={{ opacity: 0, scale: Math.random() }}
              transition={{ duration: 0.3, delay: Math.random() }}
              exit={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={locale.code}
            >
             
                <button className="">
                    <p className="dark:text-slate-400 text-sm capitalize p-2 text-center">
                      {locale.name}
                    </p>
                </button>
           
              
            </motion.div>
            </Menu.Item>
               </Link>
        )
        }

        </Menu.Items>
      </Menu>
    </div>
    // <Menu className="relative">
    //     <Menu.Button className="mr-0 p-2 m-1 text-xs bg-primary-500 rounded text-white">Change Language</Menu.Button>
    //     <Menu.Items className="relative">
    // <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10">
    //   {locales.map(
    //     (locale) =>
    //       locale.default == false && (
    //         <motion.div
    //           initial={{ opacity: 0, scale: Math.random() }}
    //           transition={{ duration: 0.3, delay: Math.random() }}
    //           exit={{ opacity: 0, scale: 0 }}
    //           whileInView={{ opacity: 1, scale: 1 }}
    //           viewport={{ once: true }}
    //           key={locale.code}
    //         >
    //           <Link
    //             href={`/en/${locale.code}/${current_word.replace(" ", "-")}`}
    //           >
    //             <button>
    //             <div className={`${locale.code == current_locale ? "bg-primary-500 text-white ":"bg-gray-50 "}transition ease-in-out delay-150 flex items-center mt-2 rounded m-1 p-1 hover:bg-primary-500 hover:text-white dark:bg-slate-900 dark:hover:bg-slate-800`}>
    //               {/* <div class="bg-primary-400 h-2 w-2 rounded-full mr-2"></div> */}
    //               <div>
    //                 <span className="dark:text-slate-400 text-center text-sm">
    //                   {locale.name}
    //                 </span>
    //               </div>
    //             </div>
    //             </button>
    //           </Link>
    //         </motion.div>
    //       )
    //   )}
    // </div>
    // </Menu.Items>
    // </Menu>
  );
};

export default LocaleDropdown;
