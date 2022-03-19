import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { setGoogleMapLoaded } from '../_actions';

const scriptId = 'gMapScript';
const ApiKey = 'AIzaSyBL_PjXFSNBZTLvWit_3yTYfXLLTYJ6pQc&v=3.exp';

function withGoogleMapApi(WrappedComponent) {
  class HOCComponent extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if (!document.querySelector(`#${scriptId}`)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places,geometry&language=${this.props.language}`;
        document.body.appendChild(script);
        script.addEventListener('load', () => {
          this.props.setGoogleMapLoaded(true);
        });
      }
    }

    componentWillUnmount() {
      const { pathname } = window.location;
      if (
        pathname.indexOf('profile') === -1
        && pathname.indexOf('contact') === -1
        && pathname.indexOf('nearby') === -1
      ) {
        this.props.setGoogleMapLoaded(false);
        setTimeout(() => (window.google = {}), 0);
        if (document.querySelector(`#${scriptId}`)) {
          document.querySelector(`#${scriptId}`).remove();
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    language: state.mainReducer.locale,
    googleMapScriptLoaded: state.mainReducer.googleMapScriptLoaded,
  });

  const mapDispatchToProps = (dispatch) => bindActionCreators({ setGoogleMapLoaded }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(HOCComponent);
}

export default withGoogleMapApi;
