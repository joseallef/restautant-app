import React, { useContext, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { WebContext } from '../../wrappers/context';
import { StyleCard, Img, AreaConfirm } from './style';

type DataInformation = {
  name: string,
  img: string,
  price: number,
  index: number,
};

export default function Card({
  name, img, price, index,
}: DataInformation) {
  const router = useRouter();
  const { hadleChangeTotal } = useContext(WebContext);
  // console.log(index, name, price, img)

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/app/pedidos');
  }

  return (
    <StyleCard>
      <Img
        src={img}
        alt="Picture of the author"
      />
      <label id="namePlate">
        {name}
      </label>
      <AreaConfirm>
        <form>
          <select
            name="plates"
            onChange={(e) => {
              // console.log(e.target.value)
              const amount = e.target.value;
              hadleChangeTotal(Number(amount), index, name, Number(price));
            }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            onClick={onSubmit}
          >
            Confirmar
          </button>
        </form>
      </AreaConfirm>
    </StyleCard>
  );
}
