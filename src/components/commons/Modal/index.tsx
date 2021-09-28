import React, { useContext, ReactNode } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';
import { WebContext } from '../../../wrappers/context';

const WrapperModal = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  background: rgba(0,0,0,0.5);
  margin: auto;
  overflow: hidden;
  transition: .3s;
  z-index: 100;
  text-align: center;

  ${({ isOpen }: any) => {
    if (isOpen) {
      return css`
      opacity: 1;
      pointer-events: all;
    `;
    }

    return css`
    opacity: 0;
    pointer-events: none;
  `;
  }}
`;

const Scroll = createGlobalStyle`
  html, body {
    overflow-y: hidden;
  }
`;

type TypeModal = {
  isOpen: ReactNode,
  onClose: ReactNode,
  children: ReactNode,
};

export default function Modal({ isOpen, onClose, children }: TypeModal) {
  const { toggleDialog } = useContext(WebContext);
  return (
    <WrapperModal
      isOpen={isOpen}
      onClick={(event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const isSafeArea = event.target.closest('[data-modal-safe-area="true"]');
        if (!isSafeArea) {
          onClose();
          toggleDialog();
        }
      }}
    >
      {isOpen && <Scroll />}

      <motion.div
        variants={{
          open: {
            x: 0,
          },
          closed: {
            y: '100%',
          },
        }}
        animate={
          isOpen ? 'open' : 'closed'
        }
        transition={{
          duration: 0.8,
        }}
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        {children({
          'data-modal-safe-area': 'true',
        })}
      </motion.div>

    </WrapperModal>
  );
}
