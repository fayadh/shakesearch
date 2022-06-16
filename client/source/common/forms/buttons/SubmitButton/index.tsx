import React from 'react';

import { ButtonProps } from '@mui/material';

import { Button } from '../Button';

export const SubmitButton = (props: ButtonProps) => <Button type={'submit'} {...props}></Button>;
