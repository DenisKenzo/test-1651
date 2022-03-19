import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { bindActionCreators } from 'redux';
import { object, string } from 'yup';
import { updateUserPaymentCard, getUserPaymentCard } from '../../../../../_actions';
import { TRANSLATIONS } from '../../../../../_constants';
import EditCardForm from '../../../../../_forms/EditCardForm';

class EditCard extends React.Component {
  componentDidMount() {
    const { getUserPaymentCard } = this.props;

    getUserPaymentCard();
  }

  render() {
    const { language, userDetails, paymentsCards } = this.props;
    const schema = object().shape({
      fullName: string().required(TRANSLATIONS[language].fullName_req),

      streetAddress: string().required(
        TRANSLATIONS[language].streetAddress_req,
      ),
      city: string().required(TRANSLATIONS[language].city_req),
      state: string().required(TRANSLATIONS[language].state_req),
      zipCode: string().required(TRANSLATIONS[language].zipCode_req),
    });
    return (
      <Formik
        initialValues={{
          fullName: paymentsCards.fullName || '',
          streetAddress: paymentsCards.streetAddress || '',
          city: paymentsCards.city || '',
          zipCode: paymentsCards.zipCode || '',
          state: paymentsCards.state || '',
        }}
        validateOnChange
        validationSchema={schema}
        onSubmit={(values, e) => {
          const requestData = {
            clientPayments: values,
          };
          this.props.updateUserPaymentCard(requestData, language);
          this.handleClose();
        }}
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
            <EditCardForm
              resetErrors={this.resetErrors}
              closeHandler={this.handleClose}
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
    );
  }

  handleClose = () => {
    this.props.history.push(
      `/${this.props.language}/payment-transactions` + '/payment_methods',
    );
    this.props.getUserPaymentCard();
  };

  handleToggleDefault = (id) => {
    if (this.state.defaultCard === id) {
      this.setState({ defaultCard: '' });
    } else {
      this.setState({ defaultCard: id });
    }
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  userDetails: state.auth.user,
  paymentsCards: state.userReducer.paymentsCards,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUserPaymentCard, getUserPaymentCard }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCard),
);
