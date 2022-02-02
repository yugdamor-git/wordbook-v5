import React from 'react';

const Search = () => {
  return <div className="rounded-3xl shadow m-2 hover:shadow-md bg-white dark:bg-gray-900">
      <form >
          <div className="flex items-center justify-between">
            <input name="search" className="mx-1 p-1 outline-none text-primary-500 placeholder-gray-500 placeholder:text-xs pl-4 text-xs w-full dark:bg-slate-900 dark:placeholder:text-slate-500" placeholder='Search'></input>
            <div className="mx-2 pt-2">
                <button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-gray-500 hover:stroke-primary-500 dark:stroke-slate-500" fill="none" viewBox="0 0 28 28">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
          </div>
      </form>
  </div>;
};

export default Search;
