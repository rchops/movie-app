import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">

        <img src="/search.svg" alt="search icon" />
        <input 
          type = "text"
          placeholder = "Search through thousands of movies"
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
        />
    </div>
  )
}

export default Search