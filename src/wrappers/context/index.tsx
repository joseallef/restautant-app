import React, { createContext, useState } from 'react';

type TypeHooks = {
  isModalOpen: boolean,
  setIsModalOpen: () => boolean;
  isFormOpen: boolean;
  setIsFormOpen: () => boolean;
  toggleDialog: () => void;
};

type platesProps = {
  plates: [
    id: number,
    nome: string,
    amount: number,
    price: number,
  ]
}

export const WebContext = createContext({} as TypeHooks);

interface AuxProps {
  children: JSX.Element | JSX.Element[];
};

export const WebSiteProvider = ({ children }: AuxProps): JSX.Element => {
 
  const [plates, setPlates] = useState({} as platesProps);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPrintActive, setIsPrintActive] = useState(false);
  const [isDialogTrue, seIsDialogTrue] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAndres, setSelectedAndres] = useState({});
  const [isOpenTableCad, setIsOpenTableCad] = useState(false);
  const [isOpenFormCad, setIsOpenFormCad] = useState(false);
  const [isOpenFormCadDrink, setIsOpenFormCadDrink] = useState(false);
  const [isOpenTableCadDrink, setIsOpenTableCadDrink] = useState(false);

  function toggleDialog() {
    setIsPrintActive(!isPrintActive);
    seIsDialogTrue(!isDialogTrue);
  }

  function addNewValue(id: string) {
    if (Number(plates[`${id}`].amount) >= 0) {
      setPlates({
        ...plates, [id]: { name: plates[`${id}`].name, amount: Number(plates[`${id}`].amount) + 1, price: Number(plates[`${id}`].price) },
      });
    }
  }

  function subtractValue(id: number) {
    if (Number(plates[`${id}`].amount) > 0) {
      setPlates({
        ...plates, [id]: { name: plates[`${id}`].name, amount: Number(plates[`${id}`].amount) - 1, price: Number(plates[`${id}`].price) },
      });
    }
  }

  function newObj(id: string) {
    const mykey = Object.keys(plates);
    const newPlates = plates;
    setPlates({});
    mykey.map((key) => {
      if (key != id) {
        setPlates(() => ({
          [key]: { name: newPlates[key].name, amount: newPlates[key].amount, price: newPlates[key].price },
        }));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  type typesTotal = {
    amount: number,
    index: number,
    name: string,
    price: number,
  };

  function hadleChangeTotal(
    amount, index, name, price,
  ) {
    // console.log(index, name, price, amount, 'caindo aqui')
    if (Number(amount) === 0) {
      newObj(index);
    } else {
      setPlates((plates) => ({
        ...plates, [index]: { name, amount, price },
      }));
    }
  }
  return (
    <>
      <WebContext.Provider value={{
        plates,
        setPlates,
        hadleChangeTotal,
        addNewValue,
        subtractValue,
        isModalOpen,
        setIsModalOpen,
        isFormOpen,
        setIsFormOpen,
        toggleDialog,
        isPrintActive,
        isDialogTrue,
        newObj,
        totalPrice,
        setTotalPrice,
        selectedAndres,
        setSelectedAndres,
        isOpenTableCad,
        setIsOpenTableCad,
        isOpenFormCad,
        setIsOpenFormCad,
        isOpenFormCadDrink,
        setIsOpenFormCadDrink,
        isOpenTableCadDrink,
        setIsOpenTableCadDrink,
      }}
      >
        {children}
      </WebContext.Provider>
    </>
  );
};
