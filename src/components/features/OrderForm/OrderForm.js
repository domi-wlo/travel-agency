import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../layout/Section/Section';

import {Grid, Row, Col} from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = ({tripCost, options}) => (
  <Section>
    <Grid>
      <Row>
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
};

export default OrderForm;