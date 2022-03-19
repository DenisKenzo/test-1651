import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { TRANSLATIONS } from '../../_constants';
import SearchBarContext from '../../_contexts/searchBarContext';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      focused: false,
    };
    this.inputRef = React.createRef();
  }

  render() {
    const { language } = this.props;
    const { searchTerm, focused } = this.state;
    const { mobileSearch, toggleMobileSearch } = this.context;

    return (
      <div
        className={`d-flex input-search ${focused ? 'show' : ''} ${
          mobileSearch ? 'mobile-open' : ''
        }`}
      >
        <div className="search-overlay" />
        <input
          type="text"
          ref={this.inputRef}
          placeholder={TRANSLATIONS[language].search}
          value={searchTerm}
          onChange={(e) => this.handleChange(e.target.value)}
          onKeyUp={(e) => this.handleSubmit(e)}
          onFocus={() => this.setState({ ...this.state, focused: true })}
          onBlur={() => this.setState({ ...this.state, focused: false })}
        />
        <span className="arrow" onClick={() => toggleMobileSearch()} />
        <span
          className={`zoom ${focused ? 'show' : ''}`}
          onClick={() => this.handleSearchClick()}
        />
      </div>
    );
  }

  handleChange = (value) => {
    this.setState({ searchTerm: value });
  };

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
    if (e.key === 'Escape') this.inputRef.current.blur();
  };

  handleSearchClick = () => {
    const { history, language } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm !== '') {
      this.context.toggleMobileSearch();
      history.push(`/${language}/search/${searchTerm}`);

      this.setState({ searchTerm: '' }, () => this.inputRef.current.blur());
    }
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

SearchBar.contextType = SearchBarContext;

export default withRouter(connect(mapStateToProps)(SearchBar));
