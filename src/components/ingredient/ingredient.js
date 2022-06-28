import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


export default function Ingredient(props) {

  const [counter, setCount] = React.useState(0);
  const [isShowModal, setShowModal] = React.useState(false);


  function handleCloseModal() {
    console.log('close')
    setShowModal(false);
  }
  
  function handleOpenModal() {
    console.log('open')
    setShowModal(true);
  }

  
  return (
    <article className={styles.card} onClick={handleOpenModal}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}> {props.price} </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {counter.isShown && (<div className={styles.counter}>
        <Counter count={counter.count} size="default" />
      </div>)}
      {isShowModal ? 
      (<Modal onClose={handleCloseModal}>
        <IngredientDetails {...props} />
      </Modal>)
      : null}
    </article>
  )
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}