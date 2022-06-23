import React from 'react';
import styles from './constructorRow.module.css';
import { ConstructorElement } from '../constructorElement/constructorElement';
import { DragIcon } from '../icons';

export default function ConstructorRow({isBun, type, data}) {

  return (
    isBun
      ? <div className={`${styles.bun} pl-4 pr-4`}>
          <ConstructorElement
            type={type}
            text={`${data.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
            price={data.price}
            thumbnail={data.image}
            isLocked='true'
          />
        </div>
      : <li className={`${styles.ingredient} mt-4 mb-4`}>
          <DragIcon/>
          <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
      />
    </li>
  )
}