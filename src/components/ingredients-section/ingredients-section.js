import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './ingredients-section.module.css';
import Ingredient from '../ingredient/ingredient';


export default function IngredientsSection({menuSection, data}) {
  return (
    <li className={styles.section}>
      <h2 className='text text_type_main-medium mb-6 mt-10'>{menuSection}</h2>
      <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
        {data.map(itemData => (
          <Ingredient key={itemData._id} {...itemData} />
        ))}
      </ul>
    </li>
  )
}

IngredientsSection.propTypes = {
  menuSection: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
}