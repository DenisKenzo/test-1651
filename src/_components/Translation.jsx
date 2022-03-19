import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';

export default class Translation extends Component {
  render() {
    if (this.props.variableBlock) {
      let stringTranslation = this.props.translation;

      this.props.variableBlock.forEach(
        (val, key) => (stringTranslation = stringTranslation.replace(
          val,
          this.props.valueBlock[key],
        )),
      );

      return parse(stringTranslation);
    }
    return parse(this.props.translation);
  }
}

Translation.propTypes = {
  translation: PropTypes.string.isRequired,
};
