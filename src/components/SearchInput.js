import React from 'react';
import PropTypes from 'prop-types';

function SearchInput({ handleSearchInput }) {
    return (
        <div className="search">
            <label htmlFor="search-input" className="search-input-label">Character Search:</label>
            <input type="text" id="search-input" className="search-input" placeholder="e.g. 'rick'" spellCheck="false" onChange={ handleSearchInput } />
        </div>
    );
}

SearchInput.propTypes = {
    handleSearchInput: PropTypes.func.isRequired
}

export default SearchInput;