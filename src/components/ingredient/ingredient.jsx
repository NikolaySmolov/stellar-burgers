import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/constants';


export default function Ingredient(props) {

  const counter = {isShown: false, count: null};

  const [showModal, setShowModal] = React.useState(false);


  const handleCloseModal = (e) => {
    setShowModal(false);
  };
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const modal = showModal ? (
                  <Modal onClose={handleCloseModal}>
                    <IngredientDetails {...props} />
                  </Modal>
                ) : null;
  
  return (
    <>
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
    </article>
    {modal}
    </>
  )
}

Ingredient.propTypes = ingredientPropTypes.isRequired;