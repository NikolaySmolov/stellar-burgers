import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '../icons/currency-icon';
import { Counter } from '../counter/counter';

export default function Ingredient() {
  return (
    <article className={styles.card}>
      <img className={styles.image} src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" /> {/* src , alt from data */}
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>1255</p> {/* from data */}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>Краторная булка N-200i</p> {/* form data */}
      <div className={styles.counter}>
        <Counter count={1} size="default" />
      </div>
    </article>
  )
}