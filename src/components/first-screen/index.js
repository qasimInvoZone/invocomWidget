/* eslint-disable */
import React,{ useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import ChatHead from "../chatbot-head";
import '../../assets/styles/global.scss';
import messageIcon from '../../assets/icons/message-icon.svg';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import { useAPI }  from '../context/widgetconfig';

const ChatBot = () => {

const [chat , setChat] = useState(true);

const [configObj , setconfigObj] = useState('');

const history = useHistory();

const email = localStorage.getItem('userEmail');
if(email){
    history.push('/message');
}

const context = useAPI()

console.log(context);
useEffect(() => {
    setconfigObj(context.data.configObj)
 }, [context]);

return(
        <div className="complete_bot first_secreen_size" >
<div className="" style={{position:"relative", top:"30px"}}>
    {chat? 

        <div className=" border rounded-lg align-bottom" style={{borderColor: configObj?.backgroundColor,height:"550px"}}>
            <div className="header-wrapper" style={{backgroundColor: configObj?.backgroundColor }}>
                <div className="text-lg font-semi-bold" style={{bbackgroundColor: configObj?.backgroundColor}}>
                   <b>InvoCom</b>
                </div>
                <div className="text-sm">
                    What can i help learn more about?
                </div>
            </div>
           <div className="p-6" > 
            <h2 className="text-lg  font-semibold">{configObj?.backgroundStatus}</h2>
            <h3 className="text-base  text-gray-400">{configObj?.message}</h3>
            </div>

            <div className="mt-4 p-6" >
                <Link to="/secondscreen">
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>Hire a Tech Expert</p>
                </div>
                </Link>
                <Link to="/form">
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>Ask a Question</p>
                </div>
                </Link>
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>Learn About InvoZone</p>
                </div>
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>Can't find what you're looking for?</p>
                </div>
            </div>       
        </div>
   
     :
      ''
      }
    
</div>
<div className="chat_icon">
  <img onClick={() => setChat(!chat)} src={messageIcon} alt="" />
</div>
</div>
);
}

export default ChatBot;