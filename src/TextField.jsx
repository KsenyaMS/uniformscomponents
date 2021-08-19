import classnames from 'classnames';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

function Text({
  autoComplete,
  className,
  disabled,
  error,
  errorMessage,
  icon,
  iconLeft,
  iconProps,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  showInlineError,
  type,
  value,
  wrapClassName,
  maxLength,
  onAfterChange,
  ...props
}) {
  const inputProps = { maxLength };
  const displayType = props.displayType || 'input';
  return (
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
        {displayType == 'input' && (
          <input
            autoComplete={autoComplete}
            disabled={disabled}
            id={id}
            name={name}
            onChange={(event) => {
              onChange(event.target.value);
              onAfterChange && onAfterChange(event.target.value);
            }}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            type={type}
            value={value ?? ''}
            {...inputProps}
          />
        )}
        {displayType == 'text' && value}

        {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
      </div>

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField(Text, { kind: 'leaf' });
