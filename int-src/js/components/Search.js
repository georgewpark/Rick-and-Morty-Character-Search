const Search = ({ handleSearchInput }) => {
  return (
    <div className='search'>
      <label htmlFor='search' className='search__label'>
        Character Search:
      </label>
      <input
        type='text'
        id='search'
        className='search__input'
        placeholder='e.g. rick'
        spellCheck='false'
        onChange={ handleSearchInput }
      />
    </div>
  )
}

export default Search