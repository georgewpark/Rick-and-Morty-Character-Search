import React from 'react';
import PropTypes from 'prop-types';
import Character from '../components/Character.js';

function SearchOutput({ characters, firstCharacterRef }) {
    return (
        <div className="search-output">
            {
                characters.length > 0 ?
                    characters.map((character, index) => <Character character={ character } key={ character.id } index={ index } firstCharacterRef={ firstCharacterRef } />) :
                    <p className="no-results">No Results Found</p>
            }
        </div>
    );
}

SearchOutput.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,
    firstCharacterRef: PropTypes.object.isRequired
}

export default SearchOutput;