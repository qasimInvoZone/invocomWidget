import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideBot } from '../../Redux/Actions/crossAction.js';
import back from '../../assets/icons/back.png';
import cross from '../../assets/icons/cross.png';
import avatar from '../../assets/icons/avatar.png';
import '../../assets/styles/global.scss';
const Header = ({
  renderQuestions,
  historyStack,
  setQuestions,
  messages,
  isBacktrack,
  setIsBacktrack}) => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const traverseBack = () => {
    if(historyStack){
      const history = historyStack?.pop();
      if(historyStack?.length === 0){
        setIsBacktrack(false);
      }
      messages?.pop();
      setQuestions(history);
      renderQuestions(history);
    }
  }
  return (
    <div>
      <div className='header w-lg bg-primary text-white p-4 pt-8'>
        <div className='header_top flex justify-between items-center'>
          <div className='left_top_header flex items-center'>
          <img src={back} onClick={() => isBacktrack ? traverseBack() : navigate('../')} alt='' />

            <div className='middle_top_header flex items-center ml-8'>
              <img src={avatar} alt='' />
              <p>Invocom</p>
            </div>
          </div>
          <img src={cross} alt='' onClick={() => dispatch(hideBot())} />
        </div>
        <div className='header_bottom mt-3'>
          <p>
            <span>Hi</span>,<br />I can help you learn more about our software
            solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
