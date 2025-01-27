import { RefObject } from 'react'
import { Character } from '../types/types'
import CharacterItem from './CharacterItem'
import Loader from './Loader'

type ResultsProps = {
  page: number
  totalPages: number
  characters: Character[]
  firstCharacter: RefObject<HTMLElement>
  totalCharacters: number
  searching: boolean
  error: boolean
}

const Results = ({
  page,
  totalPages,
  characters,
  firstCharacter,
  totalCharacters,
  searching,
  error
}: ResultsProps) => {
  return (
    <section
      className='results'
      aria-label='character results'
      aria-live='polite'
    >
      {searching && <Loader />}
      {!searching && characters.length > 0 && (
        <>
          <p className='results__info'>
            Showing{' '}
            {page === totalPages
              ? totalCharacters - (characters.length - 1)
              : (page - 1) * characters.length + 1}
            -{page === totalPages ? totalCharacters : page * characters.length}{' '}
            of {totalCharacters} characters
          </p>
          {characters.map((character, index) => (
            <CharacterItem
              character={character}
              key={character.id}
              index={index}
              firstCharacter={firstCharacter}
            />
          ))}
        </>
      )}
      {!searching && !error && characters.length === 0 && (
        <p className='results__message'>No Characters Found</p>
      )}
      {!searching && error && (
        <p className='results__message'>Error Retrieving Characters</p>
      )}
    </section>
  )
}

export default Results
