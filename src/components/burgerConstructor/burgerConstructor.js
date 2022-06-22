import React from 'react';
import styles from './burgerConstructor.module.css';
import { ConstructorElement } from '../constructorElement/constructorElement';
import { LockIcon, DragIcon, DeleteIcon, CurrencyIcon} from '../icons';
import { Button } from '../button/button';

export default function BurgerConstructor() {

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <div className={`${styles.bun} pl-4 pr-4`}>
          <ConstructorElement
            type='top'
            text={`Краторная булка N-200i ${'(верх)'}`}
            price={1255}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            isLocked='true'
          />
        </div>
        <ul className='custom-scroll'>
          <li className={`${styles.ingredient} mt-4 mb-4`}>
            <DragIcon/>
            <ConstructorElement
              text='Говяжий метеорит (отбивная)'
              price={3000}
              thumbnail='https://code.s3.yandex.net/react/code/meat-04.png'
            />
          </li>
        </ul>
        <div className={`${styles.bun} pl-4 pr-4`}>
          <ConstructorElement
            type='bottom'
            text={`Краторная булка N-200i ${'(низ)'}`}
            price={1255}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            isLocked='true'
          />
        </div>
      </div>
      <div className={`${styles.ordering} mt-10`}>
        <div className={`${styles.total} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon type='primary' />
        </div>  
        <Button type='primary' size='large'>Оформить заказ</Button>
      </div>
    </section>
  )
}