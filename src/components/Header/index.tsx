import React from 'react';
import NextLink from 'next/link';
import { OptionNav, StyleHeader } from './styles';

const links = [
  {
    text: 'Cardápio',
    path: '/cardapio',
  },
  {
    text: 'Pedidos',
    path: '/pedidos',
  },
  {
    text: 'Cadastro',
    path: '/cadastro',
  },
];

function Nav() {
  return (
    <OptionNav>
      {links.map((link) => (
        <li key={link.path}>
          <NextLink href={link.path} passHref>
            {link.text}
          </NextLink>
        </li>
      ))}
    </OptionNav>
  );
}

export default function Header(): JSX.Element {
  return (
    <StyleHeader>
      <Nav />
    </StyleHeader>
  );
}
