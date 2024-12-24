"use client"

import Properties from "@/components/common/Properties"
import { useAppSelector } from "@/hooks/redux_selectors";

const Search = () => {
  const { searchProperties, status } = useAppSelector(state => state.Properties);
  return (
    <>
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Search Results</h1>
         
            
          <p className="mb-8 text-lg font-normal text-gray-300 mx-auto w-20 lg:text-xl sm:px-16 lg:px-48 border-b-2 rounded"></p>
     
        </div>
      </section>
      <Properties  properties={searchProperties} status={status}/>
    </>

  )
}

export default Search