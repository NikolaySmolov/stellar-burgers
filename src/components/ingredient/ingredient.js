import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '../icons/currency-icon';
import { Counter } from '../counter/counter';

export default function Ingredient({ name, image, price }) {

  const [counter, setCount] = React.useState( {isShown: false, count: null} )

  const handleAddInConstructor = () => {
    setCount({isShown: true, count: counter.count += 1})
  }

  return (
    <article className={styles.card} onClick={handleAddInConstructor} draggable='true'>
      <img className={styles.image} src={image} alt={name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}> {price} </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {name} </p>
      {counter.isShown && (<div className={styles.counter}>
        <Counter count={counter.count} size="default" />
      </div>)}
    </article>
  )
}