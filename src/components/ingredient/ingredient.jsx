import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { OPEN_INGREDIENT_DETAILS, INCREASE_INGREDIENT } from '../../services/actions/burger';

export const Ingredient = React.memo(props => {
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, ingredient: props });
  };

  const handleAddInConstructor = () => {
    dispatch({ type: INCREASE_INGREDIENT, ingredient: props });
  };

  return (
    <article
      className={styles.card}
      onClick={handleShowDetails}
      onDragStart={handleAddInConstructor}
      draggable={'true'}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {props.qty ? (
        <div className={styles.counter}>
          <Counter count={props.qty} size="default" />
        </div>
      ) : null}
    </article>
  );
});

Ingredient.propTypes = ingredientPropTypes.isRequired;
