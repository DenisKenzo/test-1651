import React, { useMemo } from 'react';
import TranslationContainer from '../../_components/TranslationContainer';
import '../../assets/_settings-form.scss';

const ButtonsGroup = React.memo(({
  field, values, hebrew, options, disabled, setFieldValue,
}) => {
  const index = useMemo(() => options.indexOf(values[field]), [options, values[field]]);

  const backgroundStyles = useMemo(
    () => ({
      width: index !== -1 ? `${33.3}%` : 0,
      transform: `translate(${(hebrew ? -index : index) * 100}%, 0)`,
      ...!!disabled && { backgroundColor: '#809097', opacity: 0.5 },
    }),
    [index, disabled],
  );

  return (
    <div className="wid-100 buttons_group">
      <div className="animated-active" style={backgroundStyles} />

      {options.map((value, key) => (
        <div
          className={
                        `checkbox-form animated-button ${disabled && 'disabled'}`
                    }
          key={`option${key}`}
        >
          <label>
            <input
              type="radio"
              name={field}
              value={value}
              hidden
              checked={values[field] === value}
              onChange={() => !disabled && setFieldValue(field, value)}
            />
            <span className="label-text">
              <TranslationContainer translationKey={value} />
            </span>
          </label>
        </div>
      ))}
    </div>
  );
});

export default ButtonsGroup;
