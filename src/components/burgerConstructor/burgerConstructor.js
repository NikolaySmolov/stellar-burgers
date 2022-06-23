import React from 'react';
import styles from './burgerConstructor.module.css';
import ConstructorRow from '../constructorRow/constructorRow';
import { CurrencyIcon } from '../icons';
import { Button } from '../button/button';

export default function BurgerConstructor({data}) {
  return ( data &&
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <ConstructorRow isBun={true} type='top' data={data[0]} />
        <ul className='custom-scroll'>
          {data.map((ing, pos, array) => {
            if(pos > 0 && (pos !== array.length - 1)) {
              return <ConstructorRow key={ing._id} isBun={false} data={ing} />
            }
            return null
          })}
        </ul>
        <ConstructorRow isBun={true} type='bottom' data={data[0]} />
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