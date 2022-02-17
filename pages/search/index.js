import { motion } from "framer-motion";
import React from "react";
import Search from "../../components/search";
import WordButton from "../../components/wordButton";
import { connectToDatabase } from "../../lib/mongodb";

const SearchPage = ({ data }) => {
  const words = JSON.parse(data);

  return (
    <div className="py-4">
      <motion.div
        initial={{ y: 140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Search />
      </motion.div>

      {words.map((item) => (
        <WordButton
          key={item.id}
          word={item.word}
          href={`/en/hi/${item.word.replaceAll(" ","-")}`}
        />
      ))}
    </div>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const q = decodeURI(context.query.q).replaceAll("-"," ").trim().toLowerCase();
  const data = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({ word: { $regex: `^${q}` } })
      .project({word: 1})
      .limit(20)
      .toArray()
  );

  return {
    props: { data },
  };
}
