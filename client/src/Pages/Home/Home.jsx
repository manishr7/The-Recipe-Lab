import React from 'react'

import Banner from '../../Components/Banner/Banner'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Cards from '../../Components/Cards/Cards'
function Home() {
  return (
    <div >
    
    <Banner/>
    <SearchBar />
    <h2 className='text-center text-blue-600 text-5xl font-bold'>Categories</h2>
    <Cards/>
    <h2 className='text-center text-blue-600 text-xl mb-7 font-bold'>2024 © Developd By Manish Rawat</h2>
    </div>

  )
}

export default Home