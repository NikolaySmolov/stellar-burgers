import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, FILLING, ingredientPropTypes } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';

export default function Ingredient(props) {
  const { burgerContextDispatcher } = React.useContext(BurgerContext);

  const handleShowDetails = () => {
    props.handleShowDetails(props);
  };

  const handleAddInConstructor = () => {
    const isBun = props.type === BUN;

    burgerContextDispatcher({ type: isBun ? BUN : FILLING, payload: props });
  };

  return (
    <article
      className={styles.card}
      onClick={handleShowDetails}
      onDragStart={handleAddInConstructor}
      draggable={'true'}
    >
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>
          {' '}
          {props.price}{' '}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {props.count ? (
        <div className={styles.counter}>
          <Counter count={props.count} size="default" />
        </div>
      ) : null}
    </article>
  );
}

Ingredient.propTypes = ingredientPropTypes.isRequired;
