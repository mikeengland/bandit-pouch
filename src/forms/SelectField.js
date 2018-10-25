import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Select from '../ui/Select';
import FormField from './FormField';

/**
 * Component that encapsulates the `react-select` component
 */
const SelectField = ({
  input,
  label,
  defaultValue,
  help,
  meta,
  options,
  valueKey,
  isLoading,
  clearable,
  multi,
  creatable,
  async,
  onChangeValue,
  innerRef,
  onChangeWithValue = true,
  denormalize,
  ...props
}) => {
  const denormalized = (denormalize ? denormalize(input.value) : input.value) || defaultValue;

  return (
    <FormField id={input.id} label={label} help={help} meta={meta}>
      <Select
        value={denormalized}
        options={options}
        clearable={clearable}
        multi={multi}
        onChange={(selection) => {
          let value = selection;

          // Passing the onChangeWithValue prop means the React-Select 'value' key will be used
          // onChangeValue.  If this is false, the entire option object is stored, meaning additional data
          // can be stored onChangeValue if needed.
          if (onChangeWithValue) {
            value = multi
              ? selection && _.map(selection, valueKey)
              : selection && selection[valueKey];
          }

          input.onChange(value);
          onChangeValue(value);
        }}
        onBlur={() => input.onBlur()}
        onFocus={() => input.onFocus()}
        isLoading={isLoading}
        ref={innerRef}
        {...props}
      />
    </FormField>
  );
};

SelectField.propTypes = {
  /**
   * Original input field passed by the React Form
   */
  input: PropTypes.any.isRequired,
  /**
   * Input field label
   */
  label: PropTypes.string,
  /**
   * Help text used to describe the field's purpose
   */
  help: PropTypes.string,
  /**
   * Metadata object that is passed by the React Form
   */
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  }),
  /**
   * Key used to extract the value from the options object. Defaults to `value`
   */
  valueKey: PropTypes.string,
  /**
   * Default value for the select field
   */
  defaultValue: PropTypes.string,
  /**
   * Available select options
   */
  options: PropTypes.arrayOf(PropTypes.any),
  /**
   * Should the component show a loading indicator
   */
  isLoading: PropTypes.bool,
  /**
   * Can a value be deselected
   */
  clearable: PropTypes.bool,
  /**
   * Could a
   */
  creatable: PropTypes.bool,
  /**
   * Is the data loaded asynchronously
   */
  async: PropTypes.bool,
  /**
   * Function that can transform the original input value
   */
  denormalize: PropTypes.bool,
  /**
   * Callback executed when a value is selected
   */
  onChangeValue: PropTypes.func,
  /**
   * Passing the onChangeWithValue prop means the React-Select 'value' key will be used
   * onChangeValue.
   *
   * If this is false, the entire option object is stored, meaning additional data
   * can be stored onChangeValue if needed.
   */
  onChangeWithValue: PropTypes.bool,
};

SelectField.defaultProps = {
  help: null,
  label: null,
  meta: { touched: false, error: [] },
  defaultValue: null,
  valueKey: 'value',
  options: [],
  isLoading: false,
  clearable: false,
  creatable: false,
  async: false,
  denormalize: false,
  onChangeValue: () => {},
  onChangeWithValue: true,
};

export default SelectField;
