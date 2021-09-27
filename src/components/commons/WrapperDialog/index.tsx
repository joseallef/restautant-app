import React, { useContext } from 'react';
import { WebContext } from '../../../wrappers/context';
import PrintOrder from '../../Print';
import Button from '../Button';
import {
  WrapperDialog, Label, WrapperButton,
} from './style';

export default function Dialog({ propsDoModal, setIsFormOpen }) {
  const { toggleDialog, isPrintActive, isDialogTrue } = useContext(WebContext);
  return (
    <>
      {isPrintActive && (
      <PrintOrder
        propsDoModal={propsDoModal}
      />
      )}
      {isDialogTrue && (
      <WrapperDialog
        {...propsDoModal}
      >
        <Label>Delivery</Label>
        <WrapperButton>
          <Button onClick={toggleDialog}>Não</Button>
          <Button onClick={setIsFormOpen}>Sim</Button>
        </WrapperButton>
      </WrapperDialog>
      )}
    </>
  );
}
