import React, {
  createContext, useState, FormEvent,
} from 'react';

type TypeHoocks = {
  isModalOpen: boolean,
};

export const WebContext = createContext<TypeHoocks>({});

interface AuxProps {
  children: JSX.Element | JSX.Element[];
}

export const WebSiteProvider = ({ children }: AuxProps): JSX.Element => {
  const [plates, setPlates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPrintActive, setIsPrintActive] = useState(false);
  const [isDialogTrue, seIsDialogTrue] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAndress, setSelectedAndress] = useState({});

  function toggleDialog() {
    setIsPrintActive(!isPrintActive);
    seIsDialogTrue(!isDialogTrue);
  }

  function addNewValue(id: number) {
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

  function newObj(id) {
    const mykey = Object.keys(plates);
    const newPlates = plates;
    setPlates([]);
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
      console.log(index, name, price, amount, plates)
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
        selectedAndress,
        setSelectedAndress,
      }}
      >
        {children}
      </WebContext.Provider>
    </>
  );
};
