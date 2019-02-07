import React, { Component, Fragment } from 'react';
import SearchInput from '../components/SearchInput.js';
import SearchOutput from '../components/SearchOutput.js';
import PageNavigation from '../components/PageNavigation.js';
import debounce from '../debounce'

class RickAndMorty extends Component {

    state = {
        page: 1,
        totalPages: 1,
        searchTerm: '',
        searching: false,
        searched: false,
        characters: []
    }

    firstCharacterRef = React.createRef();

    handleSearchInput = debounce(searchTerm => this.setState({ page: 1, searchTerm, searching: true }, this.fetchCharacters));

    fetchCharacters = () => {
        fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}&name=${this.state.searchTerm}`)
            .then(res => res.json())
            .then(data => this.setState({
                totalPages: data.info.pages,
                characters: data.results,
                searching: false,
                searched: true
            }))
            .then(() => this.firstCharacterRef.current.focus())
            .catch(() => this.setState({
                page: 1,
                totalPages: 1,
                characters: [],
                searching: false,
                searched: true
            }));
    }

    changePage = e => {
        Array.from(e.target.classList).includes('page-btn-next') ?
            this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchCharacters) :
            this.setState(prevState => ({ page: prevState.page - 1 }), this.fetchCharacters);
    }

    render() {
        return (
            <Fragment>
                <header>
                    <h1 className="heading">Rick <span>And</span> Morty</h1>
                </header>
                <main>
                    <SearchInput handleSearchInput={e => this.handleSearchInput(e.target.value.replace(" ", "+"))} />
                    {this.state.searching ? <div className="search-loader" /> : null}
                    {this.state.searched && !this.state.searching ? <SearchOutput characters={this.state.characters} firstCharacterRef={this.firstCharacterRef} /> : null}
                    {this.state.totalPages > 1 && !this.state.searching ? <PageNavigation page={this.state.page} totalPages={this.state.totalPages} changePage={this.changePage} /> : null}
                </main>
            </Fragment>
        );
    }
}

export default RickAndMorty;

