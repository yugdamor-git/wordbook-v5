import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const Pagination = ({current_page,max_page}) => {

    const router = useRouter()

    const current_path = router.asPath.split("?")[0]

    const per_page = 3

    let right = current_page + per_page
    let left = current_page - per_page

    if (left < 1)
    {
        left = 1
    }
    
    if (right > max_page)
    {
        right = max_page
    }


    let start_page = left 
    let end_page = right


    console.log(`start page : ${start_page}`)
    console.log(`end page : ${end_page}`)
    console.log(`current page : ${current_page}`)
    
    let pages = []

    for(let i=start_page;i <= end_page; i++)
    {
        pages.push({"name":i,"href":`${current_path}?page=${i}`})
    }
    console.log(pages)
    console.log(start_page)
    console.log(end_page)
    console.log(current_page)
  return <div className="flex justify-between rounded p-2 items-center text-gray-500 my-2 text-xs dark:bg-black">
        <div className="hidden md:block md:ml-0">
            <span>{`Showing ${start_page} to ${end_page} of ${max_page} pages`}</span>
        </div>
        <div className="flex items-center m-auto md:mr-0">
                {
                pages.map(item => (
                  
                    <button key={item.name}>
                    <Link href={item.href}>
                        <div key={item.name} className={`h-8 w-8 m-2 text-center p-2 ${current_page==item.name ? "bg-primary-500 " : "bg-gray-100 hover:bg-primary-50 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 "}rounded`}>
                            
                                <a  className={`${current_page == item.name ? "text-white " :""}`}>{item.name}</a>
                            
                        </div>
                        </Link>
                        </button>
                  
                ))
            }
        </div>

      
  </div>;
};

export default Pagination;
