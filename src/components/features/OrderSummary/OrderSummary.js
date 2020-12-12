import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderSummary';

import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const OrderSummary = ({cost, tripOptions}) => (
  <h2 className={styles.component}>Total: <strong>{formatPrice(calculateTotal(cost, tripOptions))}</strong></h2>
);

OrderSummary.propTypes = {
  cost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;