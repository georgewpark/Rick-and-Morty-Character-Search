import Character from './Character'
import Loader from './Loader'

const Results = ({
  page,
  totalPages,
  characters,
  firstCharacter,
  totalCharacters,
  searching,
  error
}) => {
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
                    Showing { (page - 1) * characters.length + 1 }-{ page === totalPages ? totalCharacters : page * characters.length } of { totalCharacters } characters
                  </p>
                  {
                    characters.map((character, index) => (
                      <Character
                        character={ character }
                        key={ character.id }
                        index={ index }
                        firstCharacter={ firstCharacter }
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