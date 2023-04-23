import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Character } from '../types/types'
import Header from './Header'
import Search from './Search'
import Results from './Results'
import Pagination from './Pagination'

const RickAndMorty = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searching, setSearching] = useState(true)
  const [searched, setSearched] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [error, setError] = useState(false)

  const firstCharacter = useRef<HTMLElement>(null)

  const apiUrl = 'https://rickandmortyapi.com/api/character/'

  const handleSearchInput = useDebounce((value: string): void => {
    setPage(1)
    setSearchTerm(value)
    setSearching(true)
    setSearched(true)
  }, 800)

  const handlePageChange = (page: number): void => {
    setPage((prevPage: number) => prevPage + page)
    setSearched(true)
  }

  useEffect(() => {
    const fetchController = new AbortController()
    const { signal } = fetchController

    fetch(`${apiUrl}?page=${page}&name=${searchTerm}`, { signal })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // No results
          setTotalPages(1)
          setCharacters([])
        } else {
          // Results found
          setTotalPages(data.info.pages)
          setTotalCharacters(data.info.count)
          setCharacters([...data.results])
        }
        // Reset any previous error state
        setError(false)
      })
      .catch(() => {
        // Error fetching from API
        setError(true)
        setTotalPages(1)
        setCharacters([])
      })
      .finally(() => setSearching(false))

    return () => fetchController.abort()
  }, [searchTerm, page])

  useEffect(() => {
    if (searched && characters.length > 0) {
      // Focus first character on page
      firstCharacter.current?.focus()
    }
  }, [characters])

  return (
    <>
      <Header />
      <main>
        <Search handleSearchInput={e => handleSearchInput(e.target.value)} />
        <Results
          page={page}
          totalPages={totalPages}
          characters={characters}
          firstCharacter={firstCharacter}
          totalCharacters={totalCharacters}
          searching={searching}
          error={error}
        />
        {!searching && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            prevPage={() => handlePageChange(-1)}
            nextPage={() => handlePageChange(1)}
          />
        )}
      </main>
    </>
  )
}

export default RickAndMorty
