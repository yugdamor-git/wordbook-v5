import { useRouter } from "next/router";
import React, { useState } from "react";
import { Menu } from "@headlessui/react";

import Link from "next/link";

function toTitleCase(text)
{
  let uppercase = `${text.charAt(0).toUpperCase()}${text.slice(1)}`
  return uppercase
}

const LocaleDropdown = ({locale_meta,current_word}) => {
  const router = useRouter();

  const current_locale = locale_meta.code

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
        {({ open }) => (

          <>
          
          <Menu.Button className="bg-primary-500 rounded p-2 text-white text-xs">Change Language</Menu.Button>
        <Menu.Items static className={`grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 ${open == true ? "block" : "hidden"}`}>
        {locales.map(
        (locale) =>
          locale.default == false &&
          <Link key={locale.code}
          passHref
          prefetch={false}
          href={`/en/${current_word.replace(" ", "-")}-meaning-in-${locale.name}`}
        >
          <a>
            
          <Menu.Item as="div" className={`${locale.code == current_locale ? "bg-primary-50 cursor text-primary-500 ":"bg-gray-50 "} transition ease-in-out delay-150 flex items-center mt-4 ml-2 rounded hover:bg-primary-500 hover:text-white dark:bg-slate-900 dark:hover:bg-slate-800`}>
          <div
            >
             
               
                    <p className="dark:text-slate-400 text-sm capitalize p-2 text-center">
                      {toTitleCase(locale.name)}
                    </p>
           
              
            </div>
            </Menu.Item>
            </a>
               </Link>
        )
        }

        </Menu.Items>
          
          </>


        )

        }


        
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
