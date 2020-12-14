import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
  values: PropTypes.array,
  required: PropTypes.bool,
};

export default OrderOptionDropdown;