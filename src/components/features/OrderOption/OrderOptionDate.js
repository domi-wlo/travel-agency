import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './OrderOption.scss';
 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const OrderOptionDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker className={styles.input} selected={startDate} onChange={date => setStartDate(date)} />
  );
};

export default OrderOptionDate;