import { useRouter } from "next/router";
import React, { useState } from "react";
import SearchResult from "./searchResult";

const NavbarSearch = ({ meta_locale}) => {

    const router = useRouter()

    let current_locale = meta_locale.code

    const [results,setResults] = useState([])


    const [searchInput,setSearchInput] = useState("")

    
    const handleInput = async (value) => {
        
        setSearchInput(value)
        if (value.length == 0)
        {
            setResults([])
        }
        else
        {
            const resp = await fetch(`/api/search?locale=${current_locale}&q=${value}`)
            const json_obj = await resp.json()

            setResults(json_obj.data)
        }



    }

    function clearSearch()
    {
        setSearchInput("")
        setResults([])
    }


  return (
    <div className="my-2">
      <div className="flex items-center justify-between rounded-3xl shadow hover:shadow-md bg-white dark:bg-gray-900">
        <input
          type="search"
          name="q"
          autoComplete="off"
          onChange={(e) => handleInput(e.target.value)}
          value={searchInput}
          className="mx-1 p-1 outline-none text-primary-500 placeholder-gray-500 pl-4 text-[16px] w-full dark:bg-slate-900 dark:placeholder:text-slate-500"
          placeholder="Search"
        ></input>
        <div className="mx-2 pt-2">
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-gray-500 hover:stroke-primary-500 dark:stroke-slate-500 dark:hover:stroke-primary-500"
              fill="none"
              viewBox="0 0 28 28"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
          {
              results.length > 0 &&
              results.map(item => (
                
                  <SearchResult onclickEvent={clearSearch}  key={item.id}
                  word={item.word + " : " + item.localization[current_locale].word}
                  href={`/en/${item.word.replaceAll(" ","-")}-meaning-in-${meta_locale.name}`}/>
              ))
          }
      </div>
    </div>
  );
};

export default NavbarSearch;
