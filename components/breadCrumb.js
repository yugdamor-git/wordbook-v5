import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BreadCrumb = () => {


    const router = useRouter();

    const current_path = router.asPath;

    const items = current_path.split("/")

    let breadcrum_items = [];
    let bread_link = ""
    for(let item of items)
    {
        if (item.includes("?"))
        {
            item = item.split("?")[0]
        }
        
        bread_link = bread_link + item + "/"

        breadcrum_items.push({
            "name":item,
            "href":bread_link
        })
        
    }

    console.log(breadcrum_items)

    return <div className="flex items-center text-gray-500 m-1 mt-3 p-1 text-xs">
        
        <div>
            <Link href="/">
                <a className="hover:text-primary-500">Home</a>
            </Link>
        </div>
        {
            breadcrum_items.map(item=>(

                item.name.length > 0 && 
                <div key={item.name} className="flex">
                  <span className="mx-2">/</span>
                  <div>
                    <Link href={item.href}>
                        <a className="hover:text-primary-500">{item.name}</a>
                    </Link>
                    
                  </div>
                </div>
                

            ))
        }
        
    </div>;
};

export default BreadCrumb;
