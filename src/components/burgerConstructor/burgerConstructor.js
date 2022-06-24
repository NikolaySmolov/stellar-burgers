import React from 'react';
import styles from './burgerConstructor.module.css';
import ConstructorRow from '../constructorRow/constructorRow';
import { CurrencyIcon } from '../icons';
import { Button } from '../button/button';

export default function BurgerConstructor({data}) {

  const [totalPrice, setTotalPrice] = React.useState(null);

  React.useEffect(() => {
    const sum = data.reduce((prev, item) => {
      return prev + item.price;
    }, 0)

    setTotalPrice(sum);

  },[JSON.stringify(data)])

  return ( data &&
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <ConstructorRow isBun={true} type='top' data={data[0]} />
        <ul className='custom-scroll'>
          {data.map((ing, pos, array) => {
            if(pos > 0 && (pos !== array.length - 1)) {
              return <ConstructorRow key={ing._id} data={ing} />
            }
            return null
          })}
        </ul>
        <ConstructorRow isBun={true} type='bottom' data={data[0]} />
      </div>
      <div className={`${styles.ordering} mt-10`}>
        <div className={`${styles.total} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>  
        <Button type='primary' size='large'>Оформить заказ</Button>
      </div>
    </section>
  )
}