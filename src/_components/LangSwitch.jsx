import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePath, withRouter } from 'react-router-dom';

import { LANG_NAMES } from '../_constants';

class LangSwitch extends Component {
  state = {
    cacheMaps: {},
  };

  setLanguage = (lang) => {
    const { pathname } = this.props.history.location;
    const url = this.props.history.location.pathname.split('/');

    url[1] = ':lang';

    window.location.href = generatePath(url.join('/'), { lang });
  };

  render() {
    return (
      <div className="langs_block">
        {LANG_NAMES.map((language, i) => (
          <div
            key={i}
            className={` ${this.props.locale === language.locale ? 'selected_lang lang_block' : 'lang_block'} ${language.locale === 'he' && 'dir-rtl'}`}
            onClick={() => this.setLanguage(language.locale)}
          >
            <img src={`../assets/images/lang/${language.locale}.svg`} />
            <p>{language.name}</p>
            {this.props.locale === language.locale && <img src={`../assets/images/lang/icon.svg`} />}
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(LangSwitch);

LangSwitch.propTypes = {
  locale: PropTypes.string.isRequired,
  setLanguage: PropTypes.func,
};
