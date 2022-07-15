import React from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { sendOrder } from '../../utils/api';
import ModalError from '../modal-error/modal-error';

export default function Ordering({ inOrder, totalPrice, isDisabled }) {
  const [showModal, setModalState] = React.useState(false);
  const [orderState, setOrderState] = React.useState({
    loading: false,
    success: true,
    orderNumber: null,
  });

  const handleSendOrder = () => {
    debugger;
    setOrderState(orderState => ({ ...orderState, loading: true, success: false }));

    sendOrder(inOrder)
      .then(data => {
        setOrderState({
          loading: false,
          success: true,
          orderNumber: data.order.number,
        });
        handleOpenModal();
      })
      .catch(err => {
        setOrderState({ loading: false, success: false, orderNumber: null });
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
    orderState.success ? (
      <Modal onClose={handleCloseModal}>
        <OrderDetails orderId={orderState.orderNumber} />
      </Modal>
    ) : (
      <ModalError />
    )
  ) : null;

  return (
    <div className={`${styles.ordering} mt-10`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={handleSendOrder} disabled={isDisabled}>
        Оформить заказ
      </Button>
      {modal}
    </div>
  );
}

Ordering.propTypes = {
  totalPrice: PropTypes.number,
};
