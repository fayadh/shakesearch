import React, { useState, useEffect } from 'react';

import { ButtonDiv } from '@common/buttons/ButtonDiv';

import { useStyles } from './styles';

export interface ISearchInputProps {
  onClearValue: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
}

/**
 * SearchInput with div container.
 */
export const SearchInput = React.forwardRef<HTMLDivElement, ISearchInputProps>(
  ({ onClearValue, onKeyDown, placeholder = 'search', value }, ref) => {
    const classes = useStyles();

    const [inputValue, setInputValue] = useState(value);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
      setInputValue(value);
    };

    const onCloseIconClick: React.MouseEventHandler<HTMLInputElement> = () => {
      setInputValue('');
      onClearValue();
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <div className={classes.root} ref={ref}>
        <input
          className={classes.input}
          data-cy={'search-input'}
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        {value && (
          <ButtonDiv
            className={classes.clearInput}
            dataCy={'clear-search-filter'}
            onClick={onCloseIconClick}
          />
        )}
      </div>
    );
  },
);
