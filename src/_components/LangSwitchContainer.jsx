import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as translationActions from '../_actions/translations';
import LangSwitch from './LangSwitch';
import LangSwitchMobile from '../LangSwithMobile';

class LangSwitchContainer extends Component {
  render() {
    return (
      this.props.isMobile
        ? <LangSwitchMobile locale={this.props.locale} setLanguage={this.props.translationActions.setLanguage} closeSelect={this.props.closeSelectProp} />
        : <LangSwitch locale={this.props.locale} setLanguage={this.props.translationActions.setLanguage} />
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.mainReducer.locale,
});

const mapDispatchToProps = (dispatch) => ({
  translationActions: bindActionCreators(translationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LangSwitchContainer);

LangSwitchContainer.propTypes = {
  locale: PropTypes.string,
  translationActions: PropTypes.object,
};
