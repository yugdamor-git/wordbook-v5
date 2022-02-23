import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center my-56">
        <div className="m-auto">
            <div className="text-2xl md:text-4xl font-bold text-primary-500 m-2 text-center">404</div>
            <div>
                <div className="font-bold text-2xl md:text-4xl m-2 text-center">Page not found</div>
                <div className="text-gray-500 m-2 text-center">Please check the url in address bar and try again</div>
                <div className="text-center">
                    <Link href="/">
                    <button className="bg-primary-500 p-2 rounded text-white">Go back home</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Custom404