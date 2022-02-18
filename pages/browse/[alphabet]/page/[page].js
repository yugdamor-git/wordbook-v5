import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import BreadCrumb from "../../../../components/breadCrumb";
import Browse from "../../../../components/browse";
import Pagination from "../../../../components/pagination";
import WordButton from "../../../../components/wordButton";
import { connectToDatabase } from "../../../../lib/mongodb";

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

const Alphabet = ({ data }) => {
  const words = JSON.parse(data.words);
  const pagination = data.pagination;

  const router = useRouter();

  const current_alphabet = router.query.alphabet;

  const breadcrum_items = [
    {
      name:"Home",
      href:"/"
    },
    {
      name:"Browse",
      href:"/browse/a/page/1"
    },
    {
      name:current_alphabet,
      href:`/browse/${current_alphabet}/page/1`
    },
    {
      name:pagination.page,
      href:`/browse/${current_alphabet}/page/${pagination.page}`
    }
  ]

  return (
    <div>
      <BreadCrumb breadcrum_items={breadcrum_items}/>
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-center text-primary-500 font-semibold">
        Browse the Dictionary
      </h1>
      <div>
        <Browse selected={current_alphabet} page_type="browse"></Browse>
      </div>
      <div>
        <h1 className="text-center text-primary-500 text-lg font-semibold">
          Words starts with -{" "}
          {current_alphabet && current_alphabet.toUpperCase()}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
        {words.map((word) => (
          <div key={word._id}>
            <WordButton word={word.word} href={`/en/hi/${word.word.toString().replaceAll(" ","-")}`} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          current_page={+pagination.page}
          max_page={pagination.pageCount}
          pageType="alphabet"
        ></Pagination>
      </div>
    </motion.div>
    </div>
  );
};

export default Alphabet;

export async function getStaticProps({ params }) {

  const current_alphabet = params.alphabet;

  let current_page = params.page;

  const size = 20;

  if (current_page == null) {
    current_page = 1;
  }

  const skip = (current_page - 1) * size;

  const { db } = await connectToDatabase();

  const words = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({ word: { $regex: `^${current_alphabet}` } })
      .project({word: 1})
      .limit(size)
      .skip(skip)
      .toArray()
  );

  const total_docs = parseInt(
    await db
      .collection(process.env.DATA_COLLECTION)
      .count({ word: { $regex: `^${current_alphabet}` } })
  );

  const total_pages = Math.ceil(total_docs / size);

  const pagination = {
    total: total_docs,
    pageCount: total_pages,
    pageSize: size,
    page: current_page,
  };

  return {
    props: { data: { words: words, pagination: pagination } },revalidate: 60,
  };
}

export async function getStaticPaths() {
  let paths = []
  alphabets.map(char => (
    paths.push({
      params:{
        alphabet:char.toLocaleLowerCase(),
        page:"1"
      }
    })
  ))
  
  
  return { paths, fallback: 'blocking' }
  
  }
  

