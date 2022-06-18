import React, { useState, useEffect } from "react";

import { ButtonDiv } from "@common/buttons/ButtonDiv";

import { useStyles } from "./styles";
import { doNothing } from "@common/helpers";
import clsx from "clsx";

export interface ISearchInputProps {
  inputClassName?: string;
  onClearValue: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
}

/**
 * SearchInput with div container.
 */
export const SearchInput = React.forwardRef<HTMLDivElement, ISearchInputProps>(
  (
    {
      inputClassName,
      onClearValue,
      onChange: onChangeCallback = doNothing,
      onKeyDown,
      placeholder = "search",
      value,
    },
    ref
  ) => {
    const classes = useStyles();

    const [inputValue, setInputValue] = useState(value);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      setInputValue(value);
      onChangeCallback(value);
    };

    const onCloseIconClick: React.MouseEventHandler<HTMLInputElement> = () => {
      setInputValue("");
      onClearValue();
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <div className={classes.root} ref={ref}>
        <input
          className={clsx([classes.input, inputClassName])}
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        {value && (
          <ButtonDiv
            className={classes.clearInput}
            onClick={onCloseIconClick}
          />
        )}
      </div>
    );
  }
);
