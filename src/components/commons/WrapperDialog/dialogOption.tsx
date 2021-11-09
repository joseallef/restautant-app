import React, { useContext } from 'react';
import { WebContext } from '../../../wrappers/context';
import PrintOrder from '../../Print';
import Button from '../Button';
import {
  WrapperDialog, Label, WrapperButton,
} from './style';

export default function DialogOption({ propsDoModal, children }) {
  const { toggleDialog, isPrintActive, isDialogTrue } = useContext(WebContext);
  return (
    <>
      <WrapperDialog
        {...propsDoModal}
      >
        {children}
      </WrapperDialog>
    </>
  );
}
