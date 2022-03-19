import React from 'react';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeUserPaymentCard } from '../../_actions';
import InputWrapper from '../../_components/InputWrapper';
import TranslationContainer from '../../_components/TranslationContainer';
import ToggleWrapper from '../../_components/ToggleWrapper';
import './index.scss';

class EditCardForm extends React.Component {
  state = {
    userDetails: this.props.user && this.props.user,
    defaultCard: '',
  };

  render() {
    const { errors, language, userDetails } = this.props;
    const english = language === 'en';

    return (
      <div>
        <div className="mt-2 d-flex justify-content-start">
          <div className="headerEdit  mt-7 align-items-center">
            <div className="editPaymentsDetails">
              <div className="photoEdit">
                <img src={userDetails.clientPayments?.img} />
              </div>
              <div className="ssssEdit">
                <div className="cardTitleEdit">
                  {userDetails.clientPayments?.title}
                </div>
                <div className="d-flex flex-column">
                  <span className="cardNumberEdit">Card Number</span>
                  {userDetails.clientPayments?.cardNumber}
                </div>
              </div>
            </div>
            <div className="footerCardEdit justify-content-between ">
              <div className="d-flex">
                <div className="mt-2 textEdit">Default Card</div>
                <ToggleWrapper
                  classElement="input-flex  mb-4"
                  label=""
                  opt1=""
                  opt2="defaultCard"
                  name="defaultCard"
                  checked={
                    this?.state.defaultCard === userDetails.clientPayments?.id
                  }
                  onToggle={() => this.handleToggleDefault(userDetails.clientPayments?.id)}
                />
              </div>
              <button
                className=" img-btn-right mr-2 ml-2 btn btn-outline-primary btnTransactionRemove btn-lg "
                onClick={() => onDeleteHandler(userDetails.clientPayments?.id)}
              >
                <img
                  src={`../assets/images/trash.svg`}
                  alt="trash"
                />
                <span className="d-none d-md-block">
                  <TranslationContainer translationKey="remove" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <Form className="form profile-form" autocomplete="off">
          <div className=" noWrapRow">
            <div>
              <div className="noWrapRow rowUserDetails">
                <div className="pl-5">
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative fullname"
                    error={Boolean(errors.fullName)}
                    errorText={errors.fullName}
                    label="fullName"
                    name="fullName"
                    type="text"
                  />
                </div>
                <div>
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative streetAddress"
                    error={Boolean(errors.streetAddress)}
                    errorText={errors.streetAddress}
                    label="streetAddress"
                    name="streetAddress"
                    type="text"
                  />
                </div>
              </div>
              <div className="sizeInputWrap">
                <div>
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative sizeInput"
                    error={Boolean(errors.city)}
                    errorText={errors.city}
                    label="city"
                    name="city"
                    type="text"
                  />
                </div>
                <div>
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative sizeInput"
                    error={Boolean(errors.state)}
                    errorText={errors.state}
                    label="state"
                    name="state"
                    type="text"
                  />
                </div>
                <div>
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative sizeInput"
                    error={Boolean(errors.zipCode)}
                    errorText={errors.zipCode}
                    label="zipCode"
                    name="zipCode"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 btnCardWrapper">
            <button
              className="btn btn-outline-primary btnTransactionCancel btn-lg "
              type="button"
              onClick={() => {
                this.props.closeHandler();
              }}
            >
              <TranslationContainer translationKey="back" />
            </button>
            <button
              className="btn btn-outline-primary btnTransactionSubmit  btn-lg"
              type="submit"
            >
              <TranslationContainer translationKey="edit_card" />
            </button>
          </div>
        </Form>
      </div>
    );
  }

  onDeleteHandler = (id) => {
    this.props.removeUserPaymentCard(id);
  };

  handleToggleDefault = (id) => {
    if (this.state.defaultCard === id) {
      this.setState({ defaultCard: '' });
    } else {
      this.setState({ defaultCard: id });
    }
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeUserPaymentCard }, dispatch);

const mapStateToProps = (state) => ({
  userDetails: state.auth.user,
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCardForm);
