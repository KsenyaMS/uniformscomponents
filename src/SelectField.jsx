import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { connectField, filterDOMProps } from 'uniforms';
import classnames from 'classnames';

const Select = ({
  label,
  placeholder,
  withEmptyOption,
  options,
  multiple,
  onChange,
  value,
  field,
  disabled,
  error,
  showInlineError,
  wrapClassName,
  onAfterChange,
  className,
  id,
  iconLeft,
  required,
  icon,
  errorMessage,
  iconProps,
  ...props
}) => {
  const multipleSelect = multiple || field.type === 'array';
  const displayType = props.displayType || 'input';
  const [additions, setAdditions] = useState([]);

  let selectValue = value;
  let selectOptions =
    options.map(({ label, text, value }) => {
      let option = { value };
      option = label && text ? { ...option, label, text } : { ...option, text: label || text };
      return option;
    }) || [];

  selectOptions.push(...additions);

  if (multipleSelect && !value) {
    selectValue = [];
  }
  // handle case when we have only one value as string
  if (multipleSelect && typeof value === 'string') {
    selectValue = [value];
  }
  if (withEmptyOption) {
    selectOptions = [
      {
        value: null,
        content: <div style={{ opacity: 0.5 }}>{label}</div>,
        active: false
      },
      ...options
    ];
  }

  const onSelectionChange = (e, field) => {
    onChange(field.value);
    onAfterChange && onAfterChange(field.value);
  };
  return (
    <>
      {displayType === 'text' ? (
        <div
          className={classnames(className, { disabled, error, required }, 'field')}
          {...filterDOMProps(props)}>
          {label && <label htmlFor={id}>{label}</label>}

          <div
            className={classnames(
              'ui',
              wrapClassName,
              { left: iconLeft, icon: icon || iconLeft },
              'input'
            )}>
            {value}

            {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
          </div>

          {!!(error && showInlineError) && (
            <div className="ui red basic pointing label">{errorMessage}</div>
          )}
        </div>
      ) : (
        <Form.Select
          error={!!error && (showInlineError ? error.message : true)}
          selectOnBlur={false}
          placeholder={placeholder}
          options={selectOptions}
          onAddItem={(e, { value }) =>
            setAdditions((additions) => [...additions, { text: value, value }])
          }
          allowAdditions={field.uniforms?.allowAdditions}
          selection
          search={(field.uniforms && field.uniforms.search) || false}
          scrolling
          value={selectValue}
          multiple={multipleSelect}
          label={label}
          onChange={onSelectionChange}
          disabled={disabled}
        />
      )}
    </>
  );
};

const SelectField = connectField(Select);
export default SelectField;
