import React from 'react';
import { Main } from './style';

type ArrayPlates = {
  name: string,
  img: string,
  description: string,
};

type Array = {
  plates: [
    name: string,
    img: string,
    description: string,
  ],
};

export default function Box({ children }) {
  return (
    <Main>
      { children }
    </Main>
  );
}
