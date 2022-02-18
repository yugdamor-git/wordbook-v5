import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BreadCrumb = ({breadcrum_items}) => {

    return <div className="flex items-center text-gray-500 m-1 mt-3 p-1 text-sm dark:text-slate-400">
        {
            breadcrum_items.map(item=>(

                item.name.length > 0 && 
                <div key={item.name} className="flex">
                    {
                        item.name != "Home" &&
                        <span className="mx-2">/</span>
                    }
                  
                  <div>
                    <Link href={item.href}>
                        <a className="hover:text-primary-500 dark:hover:text-primary-400">{item.name}</a>
                    </Link>
                    
                  </div>
                  
                </div>
                

            ))
        }
        
    </div>;
};

export default BreadCrumb;
