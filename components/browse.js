import Link from "next/link";
import React from "react";

const Browse = ({ selected, page_type }) => {
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
  console.log(`selected alphabet - ${selected}`);
  return (
    <div className="shadow pb-4 rounded mb-2 dark:bg-black">
        <div><h1 className="bg-primary-500 p-1 mt-4 text-white text-center rounded-t mb-1 font-semibold dark:text-slate-300">Browse Dictionary</h1></div>
      <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 text-gray-500 p-2">
        {alphabets.map((alphabet) => (
          <div key={alphabet}>
            <Link href={`/${page_type}/${alphabet.toLowerCase()}?page=1`}>
              <button
                className={`${
                  alphabet.toLowerCase() == selected
                    ? "text-primary-500 bg-primary-50 "
                    : ""
                }h-10 w-10 bg-gray-50 hover:bg-primary-50 rounded hover:text-primary-500 m-1 dark:bg-gray-900 dark:text-slate-500 dark:hover:bg-gray-800`}
              >
                {alphabet}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
