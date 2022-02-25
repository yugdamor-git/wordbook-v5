import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Browse = () => {

  const router = useRouter()

  let current_alphabet = router.query.startsWith

  let slug = router.query.slug

  if (slug == null)
  {
    slug = "english-to-hindi"
  }

  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];


  return (
    <div className="shadow pb-4 rounded mb-2 dark:bg-black">
        <div><h1 className="bg-primary-500 p-1 mt-4 text-white text-center rounded-t mb-1 font-semibold dark:text-slate-300">Browse Dictionary</h1></div>
      <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 text-gray-500 p-2">
        {alphabets.map((alphabet) => (
          <div key={alphabet}>
            <Link passHref prefetch={false} href={`/en/dictionary/${slug}/1?startsWith=${alphabet.toLowerCase()}`}>
              <a>
              <button
                className={`${ alphabet.toLowerCase() == current_alphabet ? "text-white bg-primary-500 ": "dark:bg-gray-900 dark:text-slate-500 "}h-10 w-10 shadow hover:bg-primary-500 rounded hover:text-white m-1 dark:hover:bg-primary-500 dark:hover:text-white`}
              >
                {alphabet}
              </button>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;