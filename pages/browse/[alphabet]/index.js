import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import Browse from "../../../components/browse";
import Pagination from "../../../components/pagination";
import WordButton from "../../../components/wordButton";
import { connectToDatabase } from "../../../lib/mongodb";

const Alphabet = ({ data }) => {
  const words = JSON.parse(data.words);
  const pagination = data.pagination;

  console.log(words);

  const router = useRouter();

  const current_alphabet = router.query.alphabet;

  return (
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
            <WordButton word={word.word} href={`/en/hi/${word.word.replaceAll(" ","-")}`} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          current_page={+pagination.page}
          max_page={pagination.pageCount}
        ></Pagination>
      </div>
    </motion.div>
  );
};

export default Alphabet;

export async function getServerSideProps(context) {
  const current_alphabet = context.query.alphabet;

  let current_page = context.query.page;

  const size = 20;

  if (current_page == null) {
    current_page = 1;
  }

  const skip = (current_page - 1) * size;

  // const resp = await fetch(`http://65.108.48.228:1337/api/words?filters[word][$startsWith]=${current_alphabet}&pagination[page]=${current_page}`)
  // const data = await resp.json()

  // return {
  //   props: {data},
  // }

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
    props: { data: { words: words, pagination: pagination } },
  };
}
