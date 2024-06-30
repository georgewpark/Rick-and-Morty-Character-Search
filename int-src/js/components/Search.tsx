import { ChangeEvent } from 'react'

type SearchProps = {
  handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ handleSearchInput }: SearchProps) => {
  return (
    <section className='search' aria-label='character search'>
      <label htmlFor='search' className='search__label'>
        Character Search:
      </label>
      <input
        type='text'
        id='search'
        className='search__input'
        placeholder='e.g. rick'
        spellCheck='false'
        onChange={handleSearchInput}
      />
    </section>
  )
}

export default Search
