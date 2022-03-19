import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Formik } from 'formik';
import { bindActionCreators } from 'redux';
import {
  object, string, date, boolean,
} from 'yup';
import Avatar from 'react-avatar-edit';
import { isValidNumber } from 'libphonenumber-js';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import SidebarAccount from '../../_components/SidebarAccount';
import { updateUser, resetUserUpdate } from '../../_actions';
import { alertCall } from '../../_actions/alerts.actions';
import { TRANSLATIONS } from '../../_constants';
import withGoogleMapApi from '../../_components/withGoogleMapApi';
import SavedModal from '../../_modals/SavedModal';
import ProfileForm from '../../pages/Profile/ProfileForm/ProfileForm';

import './Profile.scss';
import TranslationContainer from '../../_components/TranslationContainer';
import IncorrectPhoneModal from '../../_modals/IncorrectPhoneModal';

class Profile extends Component {
  state = {
    userDetails: this.props.user && this.props.user,
    isUpdatingUser: false,
    preview: null,
    oldImg: null,
    showModalSuccess: false,
    hideButton: false,
    city: '',
    showModalError: false,
    isImgBadResolution: false,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.user || this.props.user) {
      this.setState({ ...this.state, userDetails: nextProps.user });
    }
    if (nextProps.updateError && typeof nextProps.updateError === 'string') {
      this.setState({ ...this.state, showModalError: true });
    }
    if (!nextProps.updateError) {
      this.setState({ ...this.state, showModalError: false });
    }
    if (nextProps.showModalSucces) {
      this.setState({ ...this.state, showModalSuccess: true });
    }
  }

  componentWillUnmount() {
    const { resetUserUpdate } = this.props;
    resetUserUpdate();
  }

  onClose = () => {
    const { userDetails, previousImageUser } = this.state;

    this.setState({
      ...this.state,
      userDetails: { ...userDetails, imageUser: previousImageUser },
    });
  };

  onCrop = (preview) => {
    const { userDetails } = this.state;
    userDetails.imageUser
      ? this.setState({
        ...this.state,
        previousImageUser: userDetails.imageUser,
      })
      : this.setState({ ...this.state, previousImageUser: null });

    this.setState({
      ...this.state,
      userDetails: { ...userDetails, imageUser: preview },
    });
  };

  onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 7416800) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };

  handleSetIsBadImg = (isImgBadResolution) => {
    this.setState({ ...this.state, isImgBadResolution });
  };

  handleSubmit = (values, { validateForm }) => {
    const { userDetails } = this.state;
    const { language } = this.props;

    if (this.state.isImgBadResolution) {
      this.props.alertCall({ type: 'danger', text: TRANSLATIONS[language].profile_avatar_error });
    } else {
      this.props.updateUser(
        {
          ...values,
          // imageUser: userDetails.imageUser,
          city: this.state.city,
        },
        userDetails._id,
        language,
      );
      validateForm(values);
    }
  };

  showSuccess = () => {
    this.setState({
      ...this.state,
      showModalSuccess: !this.state.showModalSuccess,
    });
  };

  showError = () => {
    this.setState({
      ...this.state,
      showModalError: !this.state.showModalError,
    });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0]);

        const getLocality = results[0].address_components.filter(
          (el) => el.types && el.types.includes('locality'),
        );
        this.setState({ city: getLocality[0].long_name });
      })
      .then((latLng) => {
        // this.props.onLocationChange(latLng);
        this.resetErrors('address');
        this.setState({ coords: latLng, address }, () => this.props.onChange('address', address));
      })
      .catch((error) => console.error('Error', error));
  };

  resetErrors = (value) => {
    const { errors, setErrors } = this.props;

    delete errors[value];
    setErrors({ ...errors });
  };

  render() {
    const { userDetails, hideButton } = this.state;
    const { isUpdatingUser, language, updateError } = this.props;

    const schema = object().shape({
      telephone: string()
        .required(TRANSLATIONS[language].error_phone)
        .test(
          'telephone',
          TRANSLATIONS[language].error_phone_match,
          (value) => value && isValidNumber(`+${value.replace('+', '')}`),
        ),
      email: string()
        .trim()
        .email(TRANSLATIONS[language].error_email_match)
        .required(TRANSLATIONS[language].error_email),
      firstName: string().required(TRANSLATIONS[language].error_first_name),
      lastName: string().required(TRANSLATIONS[language].error_last_name),
      birthDate: date()
        .typeError(TRANSLATIONS[language].error_birth_match)
        .max(new Date(), TRANSLATIONS[language].error_birth)
        .required(TRANSLATIONS[language].error_birth_match),
      address: string().required(TRANSLATIONS[language].error_address),
      gender: string().required('Required'),
      agree1: boolean().test(
        'agree1',
        TRANSLATIONS[language].required,
        (value) => value,
      ),
    });

    const {
      birthDate, gender, address, agree1, agree2,
    } = userDetails;
    const resize = window.innerWidth <= 428;

    return (
      this.props.googleMapScriptLoaded && (
        <div className={`${hideButton && 'hide-button'} Account Profile`}>
          <div className="Profile-Row">
            <BreadCrumb
              title={resize ? '' : 'account'}
              json={[
                {
                  title: 'home',
                  status: 'parent',
                  url: '/',
                },
                {
                  title: 'account',
                  status: 'current',
                },
              ]}
            />
            <div className="Profile-Row__Content">
              <div className="Profile-Row__Content-Sidebar">
                <SidebarAccount />
              </div>

              <div className="Profile-Row__Content-Info">
                <div className="text-uppercase">
                  <h2>
                    <TranslationContainer translationKey="account_settings" />
                  </h2>
                </div>

                <div className="mt-12">
                  <p>
                    <TranslationContainer translationKey="change_settings" />
                  </p>
                </div>

                <div>
                  {isUpdatingUser && (
                    <div className="loading_form">
                      <img
                        alt="loading"
                        src={`../assets/images/loading.svg`}
                      />
                    </div>
                  )}

                  {userDetails.length !== 0 && (
                    <Formik
                      initialValues={{
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        email: this.props.user.email,
                        emailExist: this.props.user.email,
                        telephone: this.props.user.telephone,
                        telephoneExist: this.props.user.telephone,
                        birthDate: birthDate || '',
                        city: userDetails.city,
                        agree1: !!agree1 || true,
                        agree2: !!agree2 || true,
                        language,
                        address,
                        gender,
                        imageUser: userDetails.imageUser,
                      }}
                      validateOnChange={false}
                      validateOnBlur={false}
                      validationSchema={schema}
                      onSubmit={this.handleSubmit}
                    >
                      {(formProps) => {
                        const {
                          values,
                          errors,
                          touched,
                          submitCount,
                          isSubmitting,
                          setValues,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError,
                        } = formProps;
                        return (
                          <ProfileForm
                            resetErrors={this.resetErrors}
                            handleSelect={this.handleSelect}
                            handleSetIsBadImg={this.handleSetIsBadImg}
                            values={values}
                            errors={errors}
                            touched={touched}
                            submitCount={submitCount}
                            isSubmitting={isSubmitting}
                            setValues={setValues}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            setFieldError={setFieldError}
                          />
                        );
                      }}
                    </Formik>
                  )}
                  {/* { this.state.city} */}
                </div>
              </div>
            </div>
          </div>

          <SavedModal
            modal={this.state.showModalSuccess}
            showModal={this.showSuccess}
            customText="savedProfile"
          />
          <IncorrectPhoneModal
            modal={this.state.showModalError}
            showModal={this.showError}
            customText={updateError}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  updateSuccess: state.userReducer?.updateSuccess,
  updateError: state.userReducer?.updateError,
  showModalSucces: state.userReducer?.showModalSucces,
  isUpdatingUser: state.auth.isUpdatingUser,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser, resetUserUpdate, alertCall }, dispatch);
}

export default withGoogleMapApi(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
