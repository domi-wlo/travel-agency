import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption';

import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue}) => (
  <div className={styles.checkboxes}>
    {values.map((value) => (
      <label key={value.id}>
        <input 
          type='checkbox'
          value={value.id}
          checked={currentValue.indexOf(value.id) > -1 ? true : false}
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        ></input>
        {value.name} {formatPrice(value.price)}
        <br/>
      </label>
    ))}
    
  </div>
);

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

OrderOptionCheckboxes.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.array,
};

export default OrderOptionCheckboxes;