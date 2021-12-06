import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideBot } from '../../Redux/Actions/crossAction.js';
import logo from '../../assets/logos/invocom-log.png';
import Header from '../../Components/Header';
import Chat from '../../Components/Chat';
import Footer from '../../Components/FooterInput';
import '../../assets/styles/global.scss';
import { useNavigate } from "react-router-dom";
require('dotenv').config()

const Questions = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const email = localStorage.getItem('userEmail');
    if(!email){
      navigate("/")
    }
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();

  return (
    <div className='complete_bot absolute'>
      {toggleBot ? (
        <div className='widget'>
          <Header />
          <Chat/>
          <Footer />

        </div>
      ) : (
        ''
      )}

      <img onClick={() => dispatch(hideBot())} src={logo} alt='' />
    </div>
  );
};

export default Questions;
