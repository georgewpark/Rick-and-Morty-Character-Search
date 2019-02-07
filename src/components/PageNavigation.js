import React from 'react';
import PropTypes from 'prop-types';

function PageNavigation({ page, totalPages, changePage }) {
    return (
        <div className="page-navigation">
            {page > 1 ? <button className="page-btn page-btn-prev" onClick={changePage}>Prev Page</button> : null}
            {page < totalPages ? <button className="page-btn page-btn-next" onClick={changePage}>Next Page</button> : null}
        </div>
    );
}

PageNavigation.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default PageNavigation;