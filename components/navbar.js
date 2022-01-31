import {React,Fragment} from 'react';
import Search from './search';
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';


const Navbar = () => {
  return <div className="shadow px-4 py-4 lg:py-1 sticky top-0 z-50 bg-white">
        <nav>
        <Menu>
            <div className="flex items-center justify-between">
                <div className="flex justify-items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-primary-600" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div className="mx-2 font-bold text-primary-600">Word Book</div>
                </div>
                <div className="hidden lg:block"><Search/></div>
                <div className="hidden lg:block">
                    <div className="flex justify-items-center text-gray-500 text-xs">
                        <Link href={"/"}>
                        <div className="bg-primary-500 text-white p-2 mx-1 rounded cursor-pointer">
                            Home
                        </div>
                        </Link>

                        <Link href={"/en"}>
                        <div className="p-2 mx-1 rounded hover:bg-primary-50 hover:text-indigo-500 cursor-pointer">
                            <button>All Words</button>
                        </div>
                        </Link>

                        <Link href={"/browse"}>
                        <div className="p-2 mx-1 rounded hover:bg-primary-50 hover:text-indigo-500 cursor-pointer">
                            <button>Browse</button>
                        </div>
                        </Link>

                        <Link href={"/top/150"}>
                        <div className="p-2 mx-1 rounded hover:bg-primary-50 hover:text-indigo-500 cursor-pointer">
                            <button>Top 150</button>
                        </div>
                        </Link>
                        <Link href={"/top/200"}>
                        <div className="p-2 mx-1 rounded hover:bg-primary-50 hover:text-indigo-500 cursor-pointer">
                            <button>Top 200</button>
                        </div>
                        </Link>
                    </div>
                </div>

                <Menu.Button className="lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-primary-500" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Menu.Button>

                
                    
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-90"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-90"
                >
            <Menu.Items>
                    <div  className="py-1 bg-white text-sm text-center pt-5 text-gray-500">
                        <Menu.Item>
                        <Link href="/">
                            <div className="bg-primary-500 text-white p-2 my-1 rounded">Home</div>
                        </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="p-2 my-1 rounded hover:bg-primary-50 hover:text-indigo-500"><Link href="/en">All Words</Link></div>
                        </Menu.Item> 
                        <Menu.Item>
                            <div className="p-2 my-1 rounded hover:bg-primary-50 hover:text-indigo-500"><Link href="/browse">Browse</Link></div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="p-2 my-1 rounded hover:bg-primary-50 hover:text-indigo-500"><Link href="/top/150">Top 150</Link></div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="p-2 my-1 rounded hover:bg-primary-50 hover:text-indigo-500"><Link href="/top/200">Top 200</Link></div>
                        </Menu.Item>
                    </div>
                </Menu.Items>
                </Transition>
        </Menu>
        </nav>
  </div>;
};

export default Navbar;
