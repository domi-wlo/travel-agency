import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../layout/Section/Section';

import {Grid, Row, Col} from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

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
  </Section>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;