import React, { PureComponent } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { closeSuccessWindow, contact } from '../../_actions';
import TranslationContainer from '../../_components/TranslationContainer';

class NotFound extends PureComponent {
  render() {
    const { language } = this.props;

    return (
      <div className="container notFoundPage">
        <div className="mt-8 mb-6">
          <div className="d-flex justify-content-center align-items-center">
            <img src={`../assets/images/404/vector.svg`} />
            <div className="position-absolute">
              <img src={`../assets/images/404/group.svg`} />
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <div className="text-uppercase not_found_status"><p>404</p></div>
          <div className="mt-4"><p className="p-x-large"><TranslationContainer translationKey="cant_see" /></p></div>
        </div>
        <Row>
          <div className="col-lg-4 col-sm-12 justify-content-center text-center">
            <div className="link_block">
              <Link to={`/${language}/`}>
                <div className="d-flex text-initial align-items-center">
                  <div className="ml-4 mr-4">
                    <img src={`../assets/images/404/home.svg`} />
                  </div>
                  <div>
                    <div><h3 className="text-uppercase"><TranslationContainer translationKey="home_page" /></h3></div>
                    <div><p><TranslationContainer translationKey="home_text" /></p></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 justify-content-center text-center">
            <div className="link_block">
              <Link to={`/${language}/search/*`}>
                <div className="d-flex text-initial align-items-center">
                  <div className="ml-4 mr-4">
                    <img src={`../assets/images/404/search.svg`} />
                  </div>
                  <div>
                    <div><h3 className="text-uppercase"><TranslationContainer translationKey="search_page" /></h3></div>
                    <div><p><TranslationContainer translationKey="search_text" /></p></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 justify-content-center text-center">
            <div className="link_block">
              <Link to={`/${language}/help`}>
                <div className="d-flex text-initial align-items-center">
                  <div className="ml-4 mr-4">
                    <img src={`../assets/images/404/help.svg`} />
                  </div>
                  <div>
                    <div><h3 className="text-uppercase"><TranslationContainer translationKey="help_page" /></h3></div>
                    <div><p><TranslationContainer translationKey="help_text" /></p></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(NotFound);
