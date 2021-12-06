import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideBot } from '../../Redux/Actions/crossAction.js';
import logo from '../../assets/logos/invocom-log.png';
import Header from '../../Components/Header';
import Brand from '../../Components/Brand';
import Calendar from '../../Components/Calendar';
import '../../assets/styles/global.scss';
var moment = require('moment');
moment().format();

const CalendarScreen = () => {
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();
  return (
    <div className='complete_bot absolute'>
      {toggleBot ? (
        <div className='widget'>
          <Header />
          <div className='message_body message_body w-lg h-lg border border-primary border-b-0 relative overflow-y-auto'>
            <div className='calendar_container flex justify-center items-center h-full'>
              <div className='calendar_body h-calender'>
                <p>
                  <strong>Select Date & Time</strong>
                </p>
                <p>
                  (30 min meeting) <span> UTC +05:00 Islamabad, Karachi </span>{' '}
                </p>
                <p>
                  <strong>October 10, 2021</strong>
                </p>
                <Calendar />
              </div>
            </div>
          </div>
          <Brand />
        </div>
      ) : (
        ''
      )}
      <img onClick={() => dispatch(hideBot())} src={logo} alt='' />
    </div>
  );
};

export default CalendarScreen;
