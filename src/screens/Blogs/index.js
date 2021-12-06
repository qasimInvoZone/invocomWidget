/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/invocom-log.png';
import invoNews from '../../assets/logos/invoNews.png';
import invoLogo from '../../assets/logos/invozone-logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { hideBot } from '../../Redux/Actions/crossAction.js';
import Header from '../../Components/Header';
import Brand from '../../Components/Brand';
import '../../assets/styles/global.scss';

const Blog = () => {
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();

  return (
    <div className='complete_bot absolute'>
      {toggleBot ? (
        <div className='widget'>
          <Header />

          <div className='message_body pl-12 pt-6 w-lg h-lg border border-primary border-b-0 relative overflow-y-auto  justify-center'>
            <div className='w-md my-4'>
              <div className='flex justify-center -mt-8'>
                <img className='w-12 h-12 rounded-full' src={invoNews} alt='' />
              </div>
              <div>
                <div className='wrap h-16 -mt-8 rounded-lg rounded-b-none'>
                  {/* <img className="h-full rounded-lg rounded-b-none" src={Banner} alt=""/> */}
                </div>
                <div className='wrap2 py-2 px-8 bg-white shadow-lg rounded-lg rounded-t-none m  hover:bg-lightGrey'>
                  <h2 className='text-gray-800 text-xl font-semibold'>
                    InvoNews
                  </h2>
                  <p className='mt-1 text-xs text-gray-600'>
                    Your source of authentic top tech news and info on tech
                    startups.
                  </p>
                  <div className='flex justify-end mt-4'>
                    <a
                      href='https://www.linkedin.com/company/invonews/'
                      target='_blank'
                      class='text-sm  underline font-medium text-primary hover:text-indigo-500'
                    >
                      Visit Page
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-md my-2 '>
              <div className='flex justify-center mt-4'>
                <img
                  className='w-12 h-12  bg-white rounded-full'
                  src={invoLogo}
                  alt=''
                />
              </div>
              <div>
                <div className='wrap3 h-16 -mt-8 rounded-lg rounded-b-none'>
                  {/* <img className="h-full rounded-lg rounded-b-none" src={Banner} alt=""/> */}
                </div>
                <div className='wrap2 py-2 px-8 bg-white shadow-lg rounded-lg rounded-t-none m  hover:bg-lightGrey'>
                  <h2 className='text-gray-800 text-xl font-semibold'>
                    InvoZone
                  </h2>
                  <p className='mt-1 text-xs text-gray-600'>
                    Your Go-to Technology Partner for Innovation | We Turn Your
                    Vision Into A Digital Reality!
                  </p>
                  <div className='flex justify-end mt-4'>
                    <a
                      href='https://www.linkedin.com/company/invozone/'
                      target='_blank'
                      class='text-sm  underline font-medium text-primary hover:text-indigo-500'
                    >
                      Visit Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Brand />
        </div>
      ) : (
        ''
      )}

      <img src={logo} onClick={() => dispatch(hideBot())} alt='' />
    </div>
  );
};

export default Blog;
