import React from "react";
import Tab from '../tab/tab';
import tabBarStyles from './tabBarStyles.module.css';

export default function TabBar() {
  const [current, setCurrent] = React.useState('puns')
  return (
    <ul className={`${tabBarStyles.tabBar}`}>
      <li className={tabBarStyles.item}><Tab active={current === 'puns'} value='puns' onClick={setCurrent} children='Булки'/></li>
      <li className={tabBarStyles.item}><Tab active={current === 'sauces'} value='sauces' onClick={setCurrent} children='Соусы'/></li>
      <li className={tabBarStyles.item}><Tab active={current === 'filling'} value='filling' onClick={setCurrent} children='Начинка'/></li>
    </ul>
  )
}