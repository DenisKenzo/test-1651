import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

const withLanguage = (WrappedComponent) => connect(mapStateToProps)(class extends Component {
  render() {
    return (
      <WrappedComponent
        {...this.props}
      />
    );
  }
});

export default withLanguage;
