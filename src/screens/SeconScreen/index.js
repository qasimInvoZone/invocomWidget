import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideBot } from '../../Redux/Actions/crossAction.js';
import logo from '../../assets/logos/invocom-log.png';
import Header from '../../Components/Header';
import Brand from '../../Components/Brand';
import '../../assets/styles/global.scss';

const Questions = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();
  return (
    <div className='complete_bot absolute'>
      {toggleBot ? (
        <div className='widget'>
          <Header />

          <div className='message_body w-lg h-lg border border-primary border-b-0 relative overflow-y-auto'>
            <div className='welcome_message_container flex'>
              <img src={logo} alt='' />
              <div className='welcome_message w-md break-all bg-secondary p-4 relative rounded'>
                <strong>Invocom</strong>
                <p>
                  Welcome to Invzone!
                  <br />
                  How may I help You today?
                </p>
                <span>11:35 AM</span>
              </div>
            </div>
            <div className='options_list absolute'>
              <Link to='/form-screen'>
                <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                  <p>E-Commerce</p>
                </div>
              </Link>
              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>On-demand Service</p>
              </div>

              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>Fintech</p>
              </div>
              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>Food n Grocery</p>
              </div>
              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>HealthCare</p>
              </div>
              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>Travel and Tourism</p>
              </div>
              <div className='option option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                <p>Education</p>
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

export default Questions;
