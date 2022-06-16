/* eslint-disable max-lines-per-function */
import React, { useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { useStyles } from './styles';

interface IImageInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  /**
   * Name of field to be registered with the useForm register function.
   */
  registrationFieldName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
}

/**
 * Common Input that displays the name of the selected file and stores the file datastring in the form state.
 */
export const ImageInput: React.FC<IImageInputProps> = ({
  register,
  registrationFieldName,
  setValue,
}) => {
  const [fileName, setFileName] = useState('');
  const classes = useStyles({ hasFileName: !!fileName });
  // Used to clear image input value.
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { files },
    } = event;

    if (!files) {
      return;
    }

    const file = files.item(0);

    if (!file) {
      return;
    }

    setFileName(file.name);
    setValue(registrationFieldName, file);
  };

  const clearSelectedImage = () => {
    setFileName('');
    setValue(registrationFieldName, null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const registrationProps = register(registrationFieldName, {
    onChange: handleFileInputChange,
  });

  const id = `${registrationFieldName}-file-input`;

  return (
    <>
      <input className={classes.textInput} type="text" {...registrationProps} />
      <input
        accept={'image/gif, image/jpeg, image/png, image/svg+xml'}
        className={classes.imageInput}
        id={id}
        multiple
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        type="file"
        ref={inputRef}
      />

      <div className={classes.wrapper}>
        <label htmlFor={id}>
          <Button variant="outlined" component="span" className={classes.fileButton}>
            {fileName || 'SELECT IMAGE'}
          </Button>
        </label>

        <Button
          className={classes.clearButton}
          component="span"
          variant="contained"
          onClick={clearSelectedImage}
        >
          <CloseIcon className={classes.closeIcon} />
        </Button>
      </div>
    </>
  );
};
