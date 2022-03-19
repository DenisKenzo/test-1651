import React from 'react';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import TranslationContainer from './TranslationContainer';

function ToggleWrapper({
  error, label, errorText, name, classElement, onToggle, checked, opt1, opt2, opt3, active_type, className,
}) {
  return (
    <div className={classElement}>
      <label htmlFor={name}>
        {label && (
        <span className={error ? 'error_input_text' : ''}>
          <TranslationContainer translationKey={label} />
        </span>
        )}

        {error && <div className="error"><p className="error-msg">{errorText}</p></div>}
      </label>
      <div className={`toggler d-flex align-items-center ${className}`}>
        <div>
          <p className={`${!checked && ((active_type && 'not-active-red') || 'active-black')} ${checked && 'not-active'}`}>
            <TranslationContainer translationKey={opt1} />
          </p>
        </div>
        <Switch
          onChange={onToggle}
          checked={checked}
          onColor={active_type ? '#2AC769' : '#FE5900'}
          offColor={active_type ? '#FB4E4E' : '#EEEEEE'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={24}
          width={40}
          handleDiameter={16}
        />
        {!opt3 && (
        <div>
          <p className={`${checked && ((active_type && 'active-green') || 'active-orange')} ${!checked && 'not-active'}`}>
            <TranslationContainer translationKey={opt2} />
          </p>

        </div>
        )}
        {opt3 && (
        <div>
          <p className={`${checked && ((active_type && 'active-green') || 'active-orange')} ${!checked && 'not-active'}`}>
            <TranslationContainer translationKey="agree1" />
          </p>
          <Link to="/he/terms_of_use" className="text-primary">
            <TranslationContainer translationKey="agree2" />
          </Link>
          <p className={`${checked && ((active_type && 'active-green') || 'active-orange')} ${!checked && 'not-active'}`}>
            <TranslationContainer translationKey="agree3" />
          </p>

        </div>
        )}

      </div>
    </div>
  );
}

export default ToggleWrapper;
