
import { useState, useEffect, useRef, useMemo } from 'react'
import Header from './Header'
import Search from './Search'
import Results from './Results'
import Pagination from './Pagination'
import debounce from '../debounce'

const RickAndMorty = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searching, setSearching] = useState(true)
  const [searched, setSearched] = useState(false)
  const [characters, setCharacters] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [error, setError] = useState(false)

  const firstCharacter = useRef(null)

  const apiUrl = 'https://rickandmortyapi.com/api/character/'

  const handleSearchInput = useMemo(() =>
    debounce(value => {
      setPage(1)
      setSearchTerm(value)
      setSearching(true)
      setSearched(true)
    })
  )

  const handlePageChange = page => {
    setPage(prevPage => prevPage + page)
    setSearched(true)
  }

  useEffect(() => {
    fetch(`${apiUrl}?page=${page}&name=${searchTerm}`)
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
  }, [searchTerm, page])

  useEffect(() => {
    if (searched && characters.length > 0) {
      // Focus first character in list
      firstCharacter.current.focus()
    }
  }, [characters])

  return (
    <>
      <Header />
      <main>
        <Search
          handleSearchInput={ e => handleSearchInput(e.target.value) }
        />
        <Results
          page={ page }
          totalPages={ totalPages }
          characters={ characters }
          firstCharacter={ firstCharacter }
          totalCharacters={ totalCharacters }
          searching={ searching }
          error={ error }
        />
        {
          !searching && totalPages > 1 && (
            <Pagination
              page={ page }
              totalPages={ totalPages }
              prevPage={ () => handlePageChange(-1) }
              nextPage={ () => handlePageChange(1) }
            />
          )
        }
      </main>
    </>
  )
}

export default RickAndMorty