import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { generatePath, withRouter } from 'react-router-dom';
import { LANG_NAMES } from './_constants';

class LangSwitchMobile extends Component {
  state = {
    cacheMaps: {},
  };

  setLanguage = (lang) => {
    const url = this.props.history.location.pathname.split('/');

    url[1] = ':lang';

    window.location.href = generatePath(url.join('/'), { lang });
  };

  render() {
    const { locale } = this.props;

    return (
      <li className="lang_select">
        {LANG_NAMES.map((language, i_) => language.locale !== locale && (
          <a className={`lang_wrap ${language.locale === 'he' && 'dir-rtl'}`} onClick={() => this.setLanguage(language.locale)}>
            <div>
              <img src={`./assets/images/lang/${language.locale}.svg`} />
              <p>{language.name}</p>
            </div>
          </a>
        ))}
      </li>
    );
  }
}

export default withRouter(LangSwitchMobile);

LangSwitchMobile.propTypes = {
  locale: PropTypes.string.isRequired,
  setLanguage: PropTypes.func,
};
