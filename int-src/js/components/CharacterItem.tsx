import { RefObject } from 'react'
import { Character } from '../types/types'

type CharacterProps = {
  character: Character
  firstCharacter: RefObject<HTMLElement>
  index: number
}

const CharacterItem = ({
  character,
  firstCharacter,
  index,
}: CharacterProps) => {
  return (
    <details className='character'>
      <summary
        className='character__name'
        ref={index === 0 ? firstCharacter : null}
      >
        {character.name}
      </summary>
      <div className='character__content'>
        <div className='character__info'>
          <details className='character__item' open>
            <summary className='character__item-summary'>Name</summary>
            <p className='character__item-info'>{character.name}</p>
          </details>
          <details className='character__item' open>
            <summary className='character__item-summary'>Species</summary>
            <p className='character__item-info'>{character.species}</p>
          </details>
          <details className='character__item' open>
            <summary className='character__item-summary'>Gender</summary>
            <p className='character__item-info'>{character.gender}</p>
          </details>
          <details className='character__item' open>
            <summary className='character__item-summary'>Location</summary>
            <p className='character__item-info'>{character.location.name}</p>
          </details>
        </div>
        <div className='character__image-container'>
          <img
            className='character__image'
            src={character.image}
            alt={character.name}
          />
        </div>
      </div>
    </details>
  )
}

export default CharacterItem
