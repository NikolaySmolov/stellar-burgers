import React from 'react';
import styles from './navLink.module.css';

export default function NavLink(props) {

  return (
    <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
      <a href={props.href} className={`${styles.link} ${props.isActive && styles.active}`} onClick={props.handleOnClick}>
        {props.children}
        <p className={`${styles.text} ml-2 text text_type_main-default`}>{props.text}</p>
      </a>
    </li>
  )
}