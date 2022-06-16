# How to use the Update Confirm modal

Let's say we would like to confirm every time there is a change in a specific value of type T

```typescript
// Represents what s inside the body using the potential new and old value
const SpecificBodyComponent = ({newValue: T, oldValue: T}) => (...)


() => {
  ...
  const { cancel, openConfirm, isModalOpen, newValue, confirm } =
      useUpdateConfirmModal<T | undefined>();

  ...
  return (<div>
    <ConfirmDialog
        {...{
          title: 'Reassign Order?',
          oldValue: assignee,
          newValue,
          confirm: () => confirm(updateCustomerOrderAssignee(_id)),
          open: isModalOpen,
          cancel,
        }}
      >
        <SpecificBodyComponent oldValue={oldValue} newValue={newValue} />
      </ConfirmDialog>
  </div>)
}

```