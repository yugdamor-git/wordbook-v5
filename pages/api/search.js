// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {



  const current_locale = req.query.locale

  const { db } = await connectToDatabase();
  
  const q = decodeURI(req.query.q).replaceAll("-"," ").trim().toLowerCase();
  
  
  const find_q = `localization.${current_locale}.word`
  let main_query = {}
  let project = {}
  project[find_q] = 1
  project["word"] = 1

  main_query[find_q] = { $regex: `^${q}` }
  const data = await db
      .collection(process.env.DATA_COLLECTION)
      .find({word:{ $regex: `^${q}` }})
      .project(project)
      .limit(5)
      .toArray()

  res.status(200).json({data:data})
}
