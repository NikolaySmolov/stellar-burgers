import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-bar.module.css';

export default function TabBar() {
  const [current, setCurrent] = React.useState('puns')
  return (
    <ul className={`${styles.tabBar}`}>
      <li className={styles.item}><Tab active={current === 'puns'} value='puns' onClick={setCurrent} children='Булки'/></li>
      <li className={styles.item}><Tab active={current === 'sauces'} value='sauces' onClick={setCurrent} children='Соусы'/></li>
      <li className={styles.item}><Tab active={current === 'filling'} value='filling' onClick={setCurrent} children='Начинка'/></li>
    </ul>
  )
}