import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const Pagination = ({current_page,max_page,pageType}) => {

    const router = useRouter()

    const size = 1

    let startsWith = router.query.startsWith

    if (startsWith == null)
    {
        startsWith = "a"
    }

    let pages = []

    if (current_page > 1)
    {
        if (pageType == "alphabet")
        {
            pages.push({
                name:"Prev",
                href:`/en/dictionary/${router.query.slug}/${current_page - 1}?startsWith=${startsWith}`
            })
        }
        else if (pageType == "locale")
        {
            pages.push({
                name:"Prev",
                href:`/en/${router.query.locale}/page/${current_page - 1}`
            })
        }
        
    }

    if(current_page > max_page - size)
        {
        
            if (pageType == "alphabet")
            {
                pages.push({
                    name:1,
                    href:`/en/dictionary/${router.query.slug}/${1}?startsWith=${startsWith}`
                })

                pages.push({
                    name:2,
                    href:`/en/dictionary/${router.query.slug}/${2}?startsWith=${startsWith}`
                })
            }
            else if (pageType == "locale")
            {
                pages.push({
                    name:1,
                    href:`/en/${router.query.locale}/page/${1}`
                })

                pages.push({
                    name:2,
                    href:`/en/${router.query.locale}/page/${2}`
                })
            }

            pages.push({
                name:"...",
                href:router.asPath
            })


        }

    for(let i = current_page - size;i < current_page + size;i++)
    {
        if (i > 0 && i <= max_page)
        {
            if (pageType == "alphabet")
            {
                pages.push({
                    name:i,
                    href:`/en/dictionary/${router.query.slug}/${i}?startsWith=${startsWith}`
                })
            }
            else if (pageType == "locale")
            {
                pages.push({
                    name:i,
                    href:`/en/${router.query.locale}/page/${i}`
                })
            }
        }
         
    }

    if (current_page < max_page - size)
    {
            pages.push({
                name:"...",
                href:router.asPath
            })
            
            for(let i = max_page - size;i < max_page + size;i++)
            {

                if (i <= max_page)
                {
                    if (pageType == "alphabet")
                    {
                        pages.push({
                            name:i,
                            href:`/en/dictionary/${router.query.slug}/${i}?startsWith=${startsWith}`
                        })
                    }
                    else if (pageType == "locale")
                    {
                        pages.push({
                            name:i,
                            href:`/en/${router.query.locale}/page/${i}`
                        })
                    }
                }
                
            }
    }
    
        

    if (current_page < max_page)
    {
        if (pageType == "alphabet")
        {
            pages.push({
                name:"Next",
                href:`/en/dictionary/${router.query.slug}/${current_page + 1}?startsWith=${startsWith}`
            })
        }
        else if (pageType == "locale")
        {
            pages.push({
                name:"Next",
                href:`/en/${router.query.locale}/page/${current_page + 1}`
            })
        }
    }

    

  return <div className="flex justify-between rounded p-2 items-center text-gray-500 my-2 text-xs dark:bg-black">
        <div className="hidden md:block md:ml-0">
            <span>{`Showing page ${current_page} of ${max_page} pages`}</span>
        </div>
        <div className="flex items-center m-auto md:mr-0">
                {
                pages.map(item => (
                  
                    <button key={item.name}>
                    <Link prefetch={false} href={item.href} passHref>
                        <a>
                        <div key={item.name} className={`h-8 w-10 text-xs m-1 text-center p-2 ${current_page==item.name ? "bg-primary-500 " : "bg-gray-100 hover:bg-primary-50 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 "}rounded`}>
                            
                                <a  className={`${current_page == item.name ? "text-white " :""}`}>{item.name}</a>
                            
                        </div>
                        </a>
                        </Link>
                        </button>
                  
                ))
            }
        </div>

      
  </div>;
};

export default Pagination;
