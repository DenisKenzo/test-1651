import React from 'react';
import { Field } from 'formik';
import MaskedInput from 'react-text-mask';
import TranslationContainer from './TranslationContainer';
import { TRANSLATIONS } from '../_constants';
import withLanguage from './withLanguage';

function InputWrapper({
  error,
  label,
  errorText,
  name,
  type,
  classElement,
  placeholder,
  group,
  language,
  noFromWrapper,
  onChangeFunction,
  onFocusFunction,
  valueWrap,
  disabled,
  min,
  floatValue,
  mask,
}) {
  return (
    <div className={classElement}>
      <label htmlFor={name}>
        <TranslationContainer translationKey={label} />
      </label>

      {noFromWrapper ? (
        <input
          value={valueWrap}
          type={type}
          placeholder={placeholder && TRANSLATIONS[language][placeholder]}
          onChange={onChangeFunction}
          min={min}
          // onKeyDown={e => min && (/[\+\-\.\,]$/.test(e.key) && e.preventDefault() )}
          disabled={disabled ? 'disabled' : ''}
        />
      ) : group ? (
        <div className={`input-group ${error ? 'input-group-error' : ''}`}>
          <div className="input-group-prepend">
            <span className="input-group-text" id={name}>
              {TRANSLATIONS[language][group]}
            </span>
            <Field
              className={error ? 'error_input' : ''}
              type={type}
              name={name}
              placeholder={placeholder && TRANSLATIONS[language][placeholder]}
              aria-describedby={name}
              disabled={disabled ? 'disabled' : ''}
            />
          </div>

          {/* {error && <div className="error"><p  className="error-msg">{errorText}</p></div>} */}
        </div>
      ) : mask ? (
        <Field
          name={name}
          render={({ field }) => (
            <MaskedInput
              {...field}
              mask={mask}
              id={name}
              placeholder={placeholder}
              type="text"
              onChange={onChangeFunction}
              onFocus={onFocusFunction}
              className={error ? 'error_input' : ''}
            />
          )}
        />
      ) : (
        <Field
          className={error ? 'error_input' : ''}
          type={type}
          name={name}
          placeholder={placeholder && TRANSLATIONS[language][placeholder]}
          min={min}
          onKeyDown={(e) => (e.keyCode === 8
            ? true
            : min && valueWrap
              ? floatValue && !valueWrap.toString().includes('.')
                ? /\.?[\+\-\,\e]$/.test(e.key) && e.preventDefault()
                : /[\+\-\.\,\e]$/.test(e.key) && e.preventDefault()
              : min
                ? /[\+\-\.\,\e]$/.test(e.key) && e.preventDefault()
                : true)}
          disabled={disabled ? 'disabled' : ''}
        />
      )}
      {error && (
        <div className="error">
          <p className="error-msg">{errorText}</p>
        </div>
      )}
    </div>
  );
}

export default withLanguage(InputWrapper);
