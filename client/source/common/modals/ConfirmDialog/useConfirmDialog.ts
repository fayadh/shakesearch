import { useState } from 'react';

export const useConfirmDialog = <T>() => {
  const [newValue, setNewValue] = useState<T | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const confirm = (onSuccessCallback: <U = T | undefined>(input: U) => void): void => {
    onSuccessCallback(newValue);
    setIsModalOpen(false);
  };

  const cancel = () => {
    setIsModalOpen(false);
  };

  const openConfirm = (pickedValue: T | undefined) => {
    setNewValue(pickedValue);
    setIsModalOpen(true);
  };

  return { isModalOpen, confirm, cancel, openConfirm, newValue };
};
