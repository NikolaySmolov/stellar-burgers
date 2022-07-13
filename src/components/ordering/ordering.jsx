import React from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructor-context';
import { submitOrder } from '../../utils/constants';

export default function Ordering({ totalPrice }) {
  const [showModal, setModalState] = React.useState(false);
  const [orderState, setOrderState] = React.useState({
    loading: false,
    success: true,
    order: {
      number: null,
      ingredients: [],
    },
  });
  const { constructorState } = React.useContext(ConstructorContext);

  React.useEffect(() => {
    const listOfIngredientsId = [];

    for (let value of Object.values(constructorState)) {
      if (Array.isArray(value)) {
        value.forEach((ingredient) => listOfIngredientsId.push(ingredient._id));
      } else {
        listOfIngredientsId.push(value._id);
      }
    }

    setOrderState((orderState) => ({
      ...orderState,
      order: { ...orderState.order, ingredients: listOfIngredientsId },
    }));
  }, [constructorState]);

  const handleSubmitOrder = () => {
    setOrderState((orderState) => ({ ...orderState, loading: true, success: false }));

    submitOrder(orderState.order)
      .then((data) => {
        setOrderState((orderState) => ({
          loading: false,
          success: true,
          order: { number: data.order.number, ingredients: [...orderState.order.ingredients] },
        }));
        handleOpenModal();
      })
      .catch((err) => {
        setOrderState((orderState) => ({ ...orderState, loading: false, success: false }));
        console.log(err);
        handleOpenModal();
      });
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const handleOpenModal = () => {
    setModalState(true);
  };

  const modal = showModal ? (
    <Modal onClose={handleCloseModal}>
      <OrderDetails orderId={orderState.order.number} />
    </Modal>
  ) : null;

  return (
    <div className={`${styles.ordering} mt-10`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={handleSubmitOrder} disabled={false}>
        Оформить заказ
      </Button>
      {modal}
    </div>
  );
}

Ordering.propTypes = {
  totalPrice: PropTypes.number,
};
