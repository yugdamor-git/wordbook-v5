import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center my-56">
      <NextSeo
      noindex={true}
      />
        <div className="m-auto">
            <div className="text-2xl md:text-4xl font-bold text-primary-500 m-2 text-center">404</div>
            <div>
                <div className="font-bold text-2xl md:text-4xl m-2 text-center capitalize">Page not found</div>
                <div className="text-gray-500 m-2 text-center capitalize">Please check the url in address bar and try again</div>
                <div className="flex justify-center">
                <div className="text-center mx-1 my-1">
                    <Link href="/" passHref>

                    <a className="bg-primary-500 p-2 rounded text-white hover:bg-primary-600 cursor">Home</a>
                    </Link>
                </div>

                <div className="text-center mx-1 my-1">
                    <button onClick={() => router.back()} className="shadow rounded p-2 rounded text-gray-600 hover:bg-gray-100">Go Back</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Custom404