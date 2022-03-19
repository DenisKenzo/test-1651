import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Translation from './Translation';
import { TRANSLATIONS } from '../_constants';

class TranslationContainer extends Component {
  state = {
    translation: '',
  };

  componentDidMount() {
    this._updateTranslation(this.props.translationKey, this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    // update the translation if one of the props will change
    if (this.props.translationKey !== nextProps.translationKey || this.props.locale !== nextProps.locale) {
      this._updateTranslation(nextProps.translationKey, nextProps.locale);
    }
  }

  _updateTranslation(translationKey, activeLanguageCode) {
    if (translationKey && activeLanguageCode) {
      try {
        this.setState({ translation: TRANSLATIONS[activeLanguageCode][translationKey] });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    if (!this.state.translation || this.state.translation === '') return null;
    return (
      <Translation translation={this.state.translation} variableBlock={this.props.variableBlock} valueBlock={this.props.valueBlock} />
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.mainReducer.locale,
});

export default connect(mapStateToProps, null)(TranslationContainer);

TranslationContainer.propTypes = {
  translationKey: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};
