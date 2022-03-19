import React from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { object, string } from 'yup';
import TranslationContainer from '../_components/TranslationContainer';
import { TRANSLATIONS } from '../_constants';
import { updateUserAddress } from '../_actions';
import withGoogleMapApi from '../_components/withGoogleMapApi';
import AddressForm from '../_forms/AddressForm';

class AddressModal extends React.Component {
  state = {
    userDetails: this.props.user && this.props.user,
    isUpdatingUser: false,
  };

  render() {
    const {
      modalAge,
      language,
      updateUserAddress,
      isUpdatingUser,
      activateNearby,
    } = this.props;
    const { userDetails } = this.state;

    const hebrew = language === 'he';

    const schema = object().shape({
      address: string().required(TRANSLATIONS[language].error_address),
    });

    const { address } = userDetails;

    return (
      <Modal
        show={modalAge}
        onHide={() => false}
        size="md"
        className={hebrew ? 'rtl-class modal_age' : 'ltr-class modal_age'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Header className="text-center p-4">
          <p className="font-weight-bold text-uppercase wid-100">
            <TranslationContainer translationKey="no_address" />
          </p>
        </Modal.Header>
        <Modal.Body className="row justify-content-center text-center">
          <div className="mt-4 col-12">
            <img
              className="img-age"
              src={`../assets/images/location.svg`}
            />
          </div>
          <div className="mt-4 mb-4 col-12">
            <p>
              <TranslationContainer translationKey="no_address_text" />
            </p>
          </div>

          <div className="mt-4 col-12 modal-nearby">
            {isUpdatingUser && (
              <div className="loading_form">
                <img src={`../assets/images/loading.svg`} />
              </div>
            )}
            <Formik
              component={AddressForm}
              initialValues={{
                address,
              }}
              validationSchema={schema}
              onSubmit={(values, { setErrors }) => {
                updateUserAddress(values, userDetails._id);
                activateNearby(values);
              }}
            />
          </div>
          <div className="col-sm-12">
            <Link
              to={`/${language}/`}
              className="btn btn-outline-primary btn-lg wid-100"
            >
              <TranslationContainer translationKey="cancel" />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  isUpdatingUser: state.auth.isUpdatingUser,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserAddress }, dispatch);
}

export default withGoogleMapApi(
  connect(mapStateToProps, mapDispatchToProps)(AddressModal),
);
