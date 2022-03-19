import React from 'react';
import { Form, Field } from 'formik';
import InputWrapper from '../../_components/InputWrapper';
import TranslationContainer from '../../_components/TranslationContainer';
import CreditCard from '../../_components/CreditCard';
import './index.scss';

class CreditCardForm extends React.Component {
  state = {
    flipped: false,
  };

  render() {
    const { errors, values, setFieldValue } = this.props;
    const { flipped } = this.state;

    return (
      <Form className="form transactions-form">
        <div className="wrap">
          <div className="noWrapRow">
            <div className="col-md-7">
              <div className="noWrapRow rowCreditCard">
                <div className="inputCol firstRow">
                  <div>
                    <InputWrapper
                      classElement="input-flex mt-6 position-relative cardHolder"
                      error={Boolean(errors.cardHolder)}
                      errorText={errors.cardHolder}
                      label="cardHolder"
                      name="cardHolder"
                      type="text"
                      onFocusFunction={() => this.setState({ flipped: false })}
                    />
                  </div>
                  <div>
                    <InputWrapper
                      classElement="input-flex mt-6 position-relative cardNumber"
                      error={Boolean(errors.cardNumber)}
                      errorText={errors.cardNumber}
                      label="cardNumber"
                      name="cardNumber"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      type="text"
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      onFocusFunction={() => this.setState({ flipped: false })}
                      onChangeFunction={(e) => {
                        setFieldValue('cardNumber', e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className=" wrapperInput">
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative expireDate"
                    error={Boolean(errors.expires)}
                    errorText={errors.expires}
                    label="expires"
                    name="expires"
                    placeholder="MM/YYYY"
                    type="text"
                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/]}
                    onFocusFunction={() => this.setState({ flipped: false })}
                    onChangeFunction={(e) => {
                      setFieldValue('expires', e.target.value);
                    }}
                  />
                  <InputWrapper
                    classElement="input-flex mt-6 position-relative cvvStyle"
                    error={Boolean(errors.cvv)}
                    errorText={errors.cvv}
                    label="cvv"
                    name="cvv"
                    type="text"
                    mask={[/\d/, /\d/, /\d/]}
                    onFocusFunction={() => this.setState({ flipped: true })}
                    onChangeFunction={(e) => {
                      setFieldValue('cvv', e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <CreditCard {...{ values, flipped }} />
          </div>
          <div className="col-md-6 col-sm-12 margin-cutom-form d-flex align-items-center">
            <div className="checkbox-form mt-6 checkboxWrap">
              <label>
                <Field
                  type="checkbox"
                  name="saveAddress"
                  value="saveAddress"
                  hidden
                  checked={values.saveAddress}
                />
                <span className="label-text">
                  <TranslationContainer translationKey="save_address" />
                </span>
              </label>
            </div>
          </div>
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
        </div>
        <div className="mt-7 btnCardWrapper">
          <button
            className="btn btn-outline-primary btnTransactionCancel btn-lg "
            type="button"
            onClick={() => {
              values.closeHandler();
            }}
          >
            <TranslationContainer translationKey="cancel" />
          </button>
          <button
            className="btn btn-outline-primary btnTransactionSubmit  btn-lg"
            type="submit"
          >
            <TranslationContainer translationKey="saveCard" />
          </button>
        </div>
      </Form>
    );
  }
}

export default CreditCardForm;
