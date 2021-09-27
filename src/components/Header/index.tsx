import React from 'react';
import NextLink from 'next/link';
import HeaderStyle from './styles';

const links = [
  {
    text: 'Cardápio',
    path: '/',
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
    <HeaderStyle.OptionNav>
      {links.map((link) => (
        <li key={link.path}>
          <NextLink href={link.path} passHref>
            {link.text}
          </NextLink>
        </li>
      ))}
    </HeaderStyle.OptionNav>
  );
}

export default function Header(): JSX.Element {
  return (
    <HeaderStyle.StyleHeader>
      <Nav />
    </HeaderStyle.StyleHeader>
  );
}
