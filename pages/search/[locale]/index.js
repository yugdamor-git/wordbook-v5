import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import BreadCrumb from "../../../components/breadCrumb";
import Search from "../../../components/search";
import WordButton from "../../../components/wordButton";
import { connectToDatabase } from "../../../lib/mongodb";

const SearchPage = ({ data }) => {
  const words = JSON.parse(data);

  const router = useRouter()
  const current_locale = router.query.locale

  if (current_locale == null)
  {
    current_locale ="hi"
  }

  const breadcrum_items = [
    {
      name:"Home",
      href:"/"
    },
    {
      name:"search",
      href:`/search/${current_locale}?q=`
    },
    {
      name:current_locale,
      href:`/search/${current_locale}?q=${router.query.q}`
    }
  ]

  return (
    <div className="py-4">
      <BreadCrumb breadcrum_items={breadcrum_items}/>
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
          word={item.word + " : " + item.localization[current_locale].word}
          href={`/en/${current_locale}/${item.word.replaceAll(" ","-")}`}
        />
      ))}
    </div>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const current_locale = context.query.locale
  const { db } = await connectToDatabase();
  const q = decodeURI(context.query.q).replaceAll("-"," ").trim().toLowerCase();
  console.log(q)
  const find_q = `localization.${current_locale}.word`
  let main_query = {}
  let project = {}
  project[find_q] = 1
  project["word"] = 1

  main_query[find_q] = { $regex: `^${q}` }
  const data = JSON.stringify(
    await db
      .collection(process.env.DATA_COLLECTION)
      .find({word:{ $regex: `^${q}` }})
      .project(project)
      .limit(20)
      .toArray()
  );
    console.log(data)
  return {
    props: { data },
  };
}
