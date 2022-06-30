
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-bar.module.css';

export default function TabBar({bunSectionRef, sauceSectionRef, mainSectionRef}) {
  const [current, setCurrent] = React.useState('buns')

  const scrollToMain = () => {
    setCurrent('filling');
    mainSectionRef.current.scrollIntoView({behavior: "smooth"});
  }

  const scrollToSauces = () => {
    setCurrent('sauces');
    sauceSectionRef.current.scrollIntoView({behavior: "smooth"});
  }

  const scrollToBun = () => {
    setCurrent('buns');
    bunSectionRef.current.scrollIntoView({behavior: "smooth"});
  }

  return (
    <ul className={`${styles.tabBar}`}>
      <li className={styles.item}><Tab active={current === 'buns'} value='buns' onClick={scrollToBun} children='Булки'/></li>
      <li className={styles.item}><Tab active={current === 'sauces'} value='sauces' onClick={scrollToSauces} children='Соусы'/></li>
      <li className={styles.item}><Tab active={current === 'filling'} value='filling' onClick={scrollToMain} children='Начинка'/></li>
    </ul>
  )
}