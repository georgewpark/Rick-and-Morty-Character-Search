import { RefObject } from 'react'
import { Character } from '../types/types'
import CharacterItem from './Character'
import Loader from './Loader'

type ResultsProps = {
  page: number,
  totalPages: number,
  characters: Character[],
  firstCharacter: RefObject<HTMLElement>,
  totalCharacters: number,
  searching: boolean,
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
    <div className='results' aria-live='polite'>
      {
        searching ? (
          <Loader />
        ) : (
          <>
            {
              characters.length > 0 ? (
                <>
                  <p className='results__info'>
                    Showing {(page - 1) * characters.length + 1}-{page === totalPages ? totalCharacters : page * characters.length} of {totalCharacters} characters
                  </p>
                  {
                    characters.map((character, index) => (
                      <CharacterItem
                        character={character}
                        key={character.id}
                        index={index}
                        firstCharacter={firstCharacter}
                      />
                    ))
                  }
                </>
              ) : (
                error ? (
                  <p className='results__message'>Error Retrieving Characters</p>
                ) : (
                  <p className='results__message'>No Characters Found</p>
                )
              )
            }
          </>
        )
      }

    </div>
  )
}

export default Results