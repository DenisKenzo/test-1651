import React from 'react';
import { Field } from 'formik';
import TranslationContainer from '../../_components/TranslationContainer';
import '../../assets/_settings-form.scss';

const CheckboxItem = React.memo(({
  field, values, label, disabled, description,
}) => (
  <div className="mt-5 mb-2">
    <label>
      <Field
        type="checkbox"
        name={field}
        value={field}
        checked={!!values[field]}
        disabled={disabled}
      />
      <span className="label-text text-capitalize">
        <TranslationContainer translationKey={label} />
      </span>
    </label>

    <div className="my-2">
      <span className="text-capitalize according ">
        <TranslationContainer translationKey={description} />
      </span>
    </div>
  </div>
));

export default CheckboxItem;
