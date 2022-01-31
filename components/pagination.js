import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const Pagination = ({current_page,max_page}) => {

    const router = useRouter()

    const current_path = router.asPath.split("?")[0]

    const per_page = 3
    
    let start_page = current_page - per_page
    let end_page = current_page + per_page


    console.log(`start page : ${start_page}`)
    console.log(`end page : ${end_page}`)
    console.log(`current page : ${current_page}`)
    if (start_page <= 0)
    {
        start_page = 1
        end_page = per_page * 2
    }
    else if(end_page > max_page)
    {
        start_page = max_page - (per_page * 2)
        end_page = max_page
    }
    else {
         start_page = current_page - per_page
         end_page = current_page + per_page
    }
    let pages = []

    for(let i=start_page;i <= end_page; i++)
    {
        pages.push({"name":i,"href":`${current_path}?page=${i}`})
    }
    console.log(pages)
    console.log(start_page)
    console.log(end_page)
    console.log(current_page)
  return <div className="flex justify-between rounded p-2 items-center text-gray-500 my-2 text-xs">
        <div className="hidden md:block md:ml-0">
            <span>{`Showing ${start_page} to ${end_page} of ${max_page} pages`}</span>
        </div>
        <div className="flex items-center m-auto md:mr-0">
                {
                pages.map(item => (
                    <button>
                    <Link href={item.href}>
                        <div key={item.name} className={`h-8 w-8 m-2 text-center p-2 ${current_page==item.name ? "bg-primary-500 " : "bg-gray-100 hover:bg-primary-50 "}rounded`}>
                            
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
