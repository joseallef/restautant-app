/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Input from './style';

type ValueInput = {
  tag: string | undefined,
  name: string | undefined,
  value: string | undefined,
  placeholder: string | undefined,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
};

export default function TextField({
  tag, name, value, placeholder, onChange,
}: ValueInput) {
  return (
    <Input
      type={tag}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
