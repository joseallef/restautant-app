import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const links = [
  {
    text: 'Cardápio',
    path: '/',
  },
  {
    text: 'Pedidos',
    path: 'pedidos',
  },
  {
    text: 'Cadastro',
    path: 'cadastro',
  },
  {
    text: 'Fechamento',
    path: 'fechamento',
  },
];

const TextLink = styled.a`
  text-decoration: none;
`;

export default function Link() {
  return (
    <>
      {links.map((link) => (
        <NextLink href={link.path}>
          <TextLink>
            {link.text}
          </TextLink>
        </NextLink>
      ))}
    </>
  //   <NextLink href={}>
  //     <TextLink>

  //   </TextLink>
  // </NextLink>
  );
}
