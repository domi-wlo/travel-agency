import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../layout/Section/Section';

import {Grid, Row, Col} from 'react-flexbox-grid';
import Button from '../../common/Button/Button';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';

import {settings} from '../../../data/settings';

const sendOrder = (options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripCost, setOrderOption, options}) => (
  <Section>
    <Grid>
      <Row>
        {pricing.map(optionData => (
          <Col key={optionData.id} md={4}>
            <OrderOption currentValue={options[optionData.id]} setOrderOption={setOrderOption} {...optionData}/>
          </Col>
        ))}
        <Col xs={12}>
          <OrderSummary cost={tripCost} tripOptions={options}/>
        </Col>
      </Row>
    </Grid>
    <Button onClick={() => sendOrder(options, tripCost)}>Order now!</Button>
  </Section>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;