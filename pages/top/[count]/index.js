import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "../../../components/pagination";
import WordButton from "../../../components/wordButton";
import { connectToDatabase } from "../../../lib/mongodb"

const TopWords = ({ top_words }) => {
  const router = useRouter();
  // const pagination = top_words.meta.pagination;
  const words = JSON.parse(top_words);

  console.log(words);

  const count = router.query.count;

  return (
    <div>
      <NextSeo
      noindex={true}
      />
      <div className="text-center my-2 font-semibold text-primary-500">
        <h1>Top {count} Words</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-500 text-sm">
        {words.map((word) => (
          <div key={word.id}>
            <WordButton word={word.word} href={`/en/${word.word.replaceAll(" ","-")}-meaning-in-hindi`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {

  const { db } = await connectToDatabase();


  const count = + params.count;
  const top_words = JSON.stringify(
    await db.collection(process.env.DATA_COLLECTION)
    .find({})
    .project({word: 1})
    .sort({likes:-1,views:-1})
    .limit(count)
    .toArray()
  );

  return {
    props: { top_words },revalidate:1 * 60 * 60
  };
}

export async function getStaticPaths() {

  let paths = []
  

  return {
    paths:paths,
    fallback: "blocking", // See the "fallback" section below false or "blocking" 
  };
}

export default TopWords;
