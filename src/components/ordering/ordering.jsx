import React from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


export default function Ordering({total}) {

  const [showModal, setModalState] = React.useState(false);

  const handleCloseModal = () => {
    setModalState(false);
  }

  const handleOpenModal = () => {
    setModalState(true);
  }

  const modal = showModal ? (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  ) : null;

  return (
    <div className={`${styles.ordering} mt-10`}>
        <div className={`${styles.total} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{total}</p>
          <CurrencyIcon type='primary' />
        </div>  
        <Button type='primary' size='large' onClick={handleOpenModal}>Оформить заказ</Button>
        {modal}
    </div>
  )
}

Ordering.propTypes = {
  total: PropTypes.number
}