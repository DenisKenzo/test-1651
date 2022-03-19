import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import { TRANSLATIONS } from '../../_constants';
import { closeSuccessWindow, contact } from '../../_actions';
import SuccessBlock from '../../_components/SuccessBlock';
import MapGoogle from '../../_components/MapGoogle/MapGoogle';
import ContactForm from '../../_forms/ContactForm';
import TranslationContainer from '../../_components/TranslationContainer';
import withGoogleMapApi from '../../_components/withGoogleMapApi';
import './Contact.scss';

class Contact extends PureComponent {
  state = {
    closedSuccess: true,
    activeRound: -1,
    subjects: [],
  };

  setActiveItem = (item) => {
    if (item === this.state.activeRound) {
      this.setState({
        activeRound: -1,
      });
    } else {
      this.setState({
        activeRound: item,
      });
    }
  };

  render() {
    const {
      language,
      contact,
      isSentRequestToContact,
      sentRequestToContact,
      closeSuccessWindow,
      isLogged,
      user,
    } = this.props;
    const { activeRound } = this.state;

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = object().shape({
      telephone: string()
        .required(TRANSLATIONS[language].error_phone)
        .matches(phoneRegExp, TRANSLATIONS[language].error_phone_match),
      firstName: string().required(TRANSLATIONS[language].error_first_name),
      lastName: string().required(TRANSLATIONS[language].error_last_name),
      message: string().required(TRANSLATIONS[language].error_message),
      email: string()
        .email(TRANSLATIONS[language].error_email_match)
        .required(TRANSLATIONS[language].error_email),
    });

    const schemaLogged = object().shape({
      message: string().required(TRANSLATIONS[language].error_message),
    });

    return (
      this.props.googleMapScriptLoaded && (
        <div className="pageContainer contactPage">
          <BreadCrumb
            title="menu_11"
            json={[
              {
                title: 'home',
                status: 'parent',
                url: '/',
              },
              {
                title: 'menu_11',
                status: 'current',
              },
            ]}
          />

          <Row className="hide-desktop">
            <div className="col-lg-4 col-sm-12 justify-content-center text-center">
              <div className="contact_block mt-0">
                <div className="d-flex justify-content-between mt-0">
                  <div
                    className={`round-block round-block-64 ${
                      activeRound === 0 && 'border-round'
                    }`}
                    onClick={() => this.setActiveItem(0)}
                  >
                    <img
                      src={`../assets/images/contact/mail.svg`}
                    />
                  </div>
                  {/* <div className={`round-block round-block-64 ${activeRound===1 && 'border-round'}`} onClick={()=>this.setActiveItem(1)}> */}
                  {/*    <img src={`../assets/images/contact/phone.svg`}/> */}
                  {/* </div> */}
                  <div
                    className={`round-block round-block-64 ${
                      activeRound === 2 && 'border-round'
                    }`}
                    onClick={() => this.setActiveItem(2)}
                  >
                    <img
                      src={`../assets/images/contact/location.svg`}
                    />
                  </div>
                </div>
                {activeRound === 0 && (
                  <>
                    <div className="mt-3">
                      <h3 className="text-uppercase">
                        <TranslationContainer translationKey="email_address" />
                      </h3>
                    </div>
                    <div className="mt-3">
                      <div>
                        <p>
                          <TranslationContainer translationKey="customer_support" />
                          {' '}
                          <span className="font-weight-lighter">
                            support@chipper.co.il
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <TranslationContainer translationKey="tech_support" />
                          {' '}
                          <span className="font-weight-lighter">
                            support@chipper.co.il
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {activeRound === 1 && (
                  <>
                    <div className="mt-3">
                      <h3 className="text-uppercase">
                        <TranslationContainer translationKey="phone_numbers" />
                      </h3>
                    </div>
                    <div className="mt-3">
                      <div>
                        <p className="d-flex justify-content-around">
                          <TranslationContainer translationKey="customer_support" />
                          {' '}
                          <div className="font-weight-lighter dir-ltr" />
                        </p>
                      </div>
                      <div>
                        <p className="d-flex justify-content-around">
                          <TranslationContainer translationKey="tech_support" />
                          {' '}
                          <div className="font-weight-lighter dir-ltr" />
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {activeRound === 2 && (
                  <>
                    <div className="mt-3">
                      <h3 className="text-uppercase">
                        <TranslationContainer translationKey="main_store" />
                      </h3>
                    </div>
                    <div className="mt-3">
                      <div>
                        <p>בולטימור 21, עכו </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Row>

          <div className="hide-desktop mt-3 row-fluid">
            <div className="faq-block justify-content-center">
              <div className="round-block">
                <img
                  src={`../assets/images/contact/faq.svg`}
                />
              </div>
              <div className="mt-3">
                <h3 className="text-uppercase">
                  <TranslationContainer translationKey="faq" />
                </h3>
              </div>

              <div className="mt-3">
                <Link
                  to={`/${language}/help`}
                  className="btn btn-outline-primary btn-lg wid-100 img-btn-right"
                >
                  <TranslationContainer translationKey="open_faq" />
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-4 mb-6 contact_main_block">
            <div className="col-lg-6 col-sm-12">
              <div className="map">
                <MapGoogle
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div className="map_block" />}
                  mapElement={<div style={{ height: '100%' }} />}
                  markers={[{ lat: 32.1, lng: 34.85 }]}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="mb-3">
                <div className="text-uppercase">
                  <h2>
                    <TranslationContainer translationKey="in_touch" />
                  </h2>
                </div>
                <div className="mt-2">
                  <p>
                    <TranslationContainer translationKey="help_you" />
                  </p>
                </div>
              </div>
              {isSentRequestToContact && (
                <div className="loading_form">
                  <img
                    src={`../assets/images/loading.svg`}
                  />
                </div>
              )}
              {!sentRequestToContact ? (
                <Formik
                  component={ContactForm}
                  initialValues={
                    isLogged
                      ? {
                        firstName: user.firstName && user.firstName,
                        lastName: user.lastName && user.lastName,
                        email: user.email && user.email,
                        phone: user.phone && user.phone,
                        message: '',
                        subject: '',
                      }
                      : {
                        firstName: '',
                        lastName: '',
                        email: '',
                        telephone: '',
                        message: '',
                        subject: '',
                      }
                  }
                  validationSchema={!isLogged ? schema : schemaLogged}
                  onSubmit={(values, { setErrors }) => {
                    contact(values);
                  }}
                />
              ) : (
                <SuccessBlock successFunction={closeSuccessWindow} />
              )}
            </div>
          </div>
          <Row className="hide-mobile">
            <div className="col-lg-6 col-sm-12 justify-content-center text-center">
              <div className="contact_block">
                <div className="round-block">
                  <img
                    src={`../assets/images/contact/mail.svg`}
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-uppercase">
                    <TranslationContainer translationKey="email_address" />
                  </h3>
                </div>
                <div className="mt-3">
                  <div>
                    <p>
                      <TranslationContainer translationKey="customer_support" />
                      {' '}
                      <span className="font-weight-lighter">
                        support@chipper.co.il
                      </span>
                    </p>
                  </div>
                  {/* <div><p><TranslationContainer translationKey="tech_support"/> <span className="font-weight-lighter">support@chipper.co.il</span></p></div> */}
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 col-sm-12 justify-content-center text-center"> */}
            {/*     <div className="contact_block"> */}
            {/*         <div className="round-block"> */}
            {/*             <img src={`../assets/images/contact/phone.svg`}/> */}
            {/*         </div> */}
            {/*         <div className="mt-3"> */}
            {/*             <h3 className="text-uppercase"><TranslationContainer translationKey="phone_numbers"/></h3> */}
            {/*         </div> */}
            {/*         <div className="mt-3"> */}
            {/*             /!*<div><p className="d-flex justify-content-center"><TranslationContainer translationKey="customer_support"/> <div className="font-weight-lighter dir-ltr  mr-3 ml-3">+1 (080) 44 357 260</div></p></div>*!/ */}
            {/*             /!*<div><p className="d-flex justify-content-center"><TranslationContainer translationKey="tech_support"/> <div className="font-weight-lighter dir-ltr  mr-3 ml-3">+1 00 33 169 7720</div></p></div>*!/ */}
            {/*         </div> */}
            {/*     </div> */}
            {/* </div> */}
            <div className="col-lg-6 col-sm-12 justify-content-center text-center">
              <div className="contact_block">
                <div className="round-block">
                  <img
                    src={`../assets/images/contact/location.svg`}
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-uppercase">
                    <TranslationContainer translationKey="main_store" />
                  </h3>
                </div>
                <div className="mt-3">
                  <div>
                    <p>בולטימור 21, עכו </p>
                  </div>
                  {/* <div><p>Eilat 34322</p></div> */}
                </div>
              </div>
            </div>
          </Row>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
  language: state.mainReducer.locale,
  sentRequestToContact: state.userReducer.sentRequestToContact,
  isSentRequestToContact: state.userReducer.isSentRequestToContact,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ contact, closeSuccessWindow }, dispatch);
}

export default withGoogleMapApi(
  connect(mapStateToProps, mapDispatchToProps)(Contact),
);
