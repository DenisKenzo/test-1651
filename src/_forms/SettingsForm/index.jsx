import React from 'react';
import { Form, Field } from 'formik';
import ReactPhoneInput from 'react-phone-input-2';
import { isValidNumber } from 'libphonenumber-js';
import TranslationContainer from '../../_components/TranslationContainer';
import ToggleWrapper from '../../_components/ToggleWrapper';
import ButtonsGroup from '../../_forms/SettingsForm/ButtonsGroup';
import CheckboxItem from '../../_forms/SettingsForm/CheckboxItem';
import '../../assets/_settings-form.scss';

class SettingsForm extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  render() {
    const {
      formProps: {
        values, errors, touched, setFieldValue,
      },
      options,
      language,
    } = this.props;
    return (
      <Form className="form settings-form">
        <div className="d-flex flex-row wid-60">
          <div className="col-md-12 mr-5">
            <ToggleWrapper
              classElement="input-flex  mb-4"
              label=""
              opt1=""
              opt2="email_notification"
              name="email"
              checked={values.isEmailNotification}
              onToggle={() => setFieldValue(
                'isEmailNotification',
                !values.isEmailNotification,
              )}
            />

            <label htmlFor="email">
              <TranslationContainer translationKey="email_for_notification" />
              <Field
                type="text"
                name="email"
                placeholder=""
                disabled={values.emailExist || !values.isEmailNotification}
              />
              <div>
                {touched.email && errors.email && (
                  <p className="error-msg">{errors.email}</p>
                )}
              </div>
            </label>

            <CheckboxItem
              {...{
                field: 'isEmailHot',
                label: 'menu_1',
                description: 'offers_according',
                disabled: !values.isEmailNotification,
                values,
              }}
            />

            <ButtonsGroup
              {...{
                field: 'durationEmail',
                disabled: !values.isEmailHot || !values.isEmailNotification,
                hebrew: language === 'he',
                values,
                options,
                setFieldValue,
              }}
            />

            <CheckboxItem
              {...{
                field: 'isEmailSystem',
                label: 'menu_16',
                description: 'notifications_according',
                disabled: !values.isEmailNotification,
                values,
              }}
            />
          </div>

          <div className="col-md-12">
            <ToggleWrapper
              classElement="input-flex mb-4"
              label=""
              opt1=""
              opt2="sms_notification"
              name="sms"
              checked={values.isSmsNotification}
              onToggle={() => setFieldValue('isSmsNotification', !values.isSmsNotification)}
            />

            <div className="form phone-block">
              <label htmlFor="phone">
                <span className={errors.telephone ? 'error_input_text' : ''}>
                  <TranslationContainer translationKey="phone_for_notification" />
                </span>

                <ReactPhoneInput
                  value={
                    values.telephone && values.telephone.replace(/[()|+]/g, '')
                  }
                  style={{ backgroundColor: 'white' }}
                  onlyCountries={['il', 'ua', 'ru']}
                  inputClass={
                    values.telephone
                    && !isValidNumber(
                      `+${values.telephone.replace(/[()|+]/g, '')}`,
                    )
                      ? ' error_input'
                      : ''
                  }
                  placeholder=""
                  {...(values.telephoneExist === ''
                  || values.telephoneExist === undefined
                    ? undefined
                    : { disabled: true })}
                  country="il"
                  countryCodeEditable={false}
                  onChange={(phone) => setFieldValue(
                    'telephone',
                    `+${phone.replace(/[() ]/g, '')}`,
                  )}
                  masks={{ il: '... ... ...' }}
                  disabled={values.phoneExist || !values.isSmsNotification}
                />
                {errors.telephone && (
                  <div className="error">
                    <p className="error-msg">
                      <TranslationContainer translationKey="error_phone_match" />
                    </p>
                  </div>
                )}
              </label>
            </div>

            <CheckboxItem
              {...{
                field: 'isSmsHot',
                label: 'menu_1',
                description: 'offers_according',
                disabled: !values.isSmsNotification,
                values,
              }}
            />

            <ButtonsGroup
              {...{
                field: 'durationSms',
                disabled: !values.isSmsHot || !values.isSmsNotification,
                hebrew: language === 'he',
                values,
                options,
                setFieldValue,
              }}
            />

            <CheckboxItem
              {...{
                field: 'isSmsSystem',
                label: 'menu_16',
                description: 'notifications_according',
                disabled: !values.isSmsNotification,
                values,
              }}
            />
          </div>
        </div>

        <div className="wid-60 col-md-12">
          <button
            className="btn btn-primary"
            disabled={
              (!values.isEmailNotification && !values.isSmsNotification)
              || Object.keys(errors).length > 0
            }
            onClick={() => {
              const val = values.email.replace(/ /g, '');
              setFieldValue('email', val.trim());
            }}
          >
            <TranslationContainer translationKey="continue" />
          </button>
        </div>
      </Form>
    );
  }
}

export default SettingsForm;
