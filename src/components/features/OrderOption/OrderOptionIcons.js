import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';

import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, setOptionValue, currentValue, defaultValue}) => {
  return ( 
    <div className={styles.component}>
      {required ? '' : (
        <div 
          className={styles.icon}
          onClick={() => setOptionValue('')}
        >
          <Icon name={'times-circle'}/> none
        </div>
      )}
      {values.map((value) => (
        <div 
          key={value.id} 
          onClick={() => setOptionValue(handleToggle(value.id, currentValue, defaultValue))}
          className={currentValue === value.id ? styles.iconActive : styles.icon} 
        > 
          <Icon name={value.icon}/> {value.name} {formatPrice(value.price)}
        </div>
      ))}
    </div>
  );
};

const handleToggle = (id, currentValue, defaultValue) => {
  if (currentValue === id) {
    currentValue = defaultValue;
  }
  return (currentValue = id);
};

OrderOptionIcons.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
  values: PropTypes.array,
  required: PropTypes.bool,
  active: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default OrderOptionIcons;