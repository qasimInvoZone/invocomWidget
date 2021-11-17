/* eslint-disable */
import React,{ useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import ChatHead from "../chatbot-head";
import '../../assets/styles/global.scss';
import messageIcon from '../../assets/icons/message-icon.svg';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import { useAPI }  from '../context/widgetconfig';
import { questions } from "../../assets/questions";

const ChatBot = () => {

const [chat , setChat] = useState(true);

const [configObj , setconfigObj] = useState('');

const history = useHistory();

const email = localStorage.getItem('userEmail');
if(email){
    // if user is deleted form DB clear Local Storage
    history.push('/message');
}

const context = useAPI()

useEffect(() => {
    console.log("Questionsssss : : : : : ",questions);
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
            <h2 className="text-lg  font-semibold">{configObj? configObj.backgroundStatus : "Hi, I’m here to help you find your way."}</h2>
            <h3 className="text-base  text-gray-400">{configObj? configObj.message : "What would you like to do?"}</h3>
            </div>

            <div className="mt-4 p-6" >
                <Link to="/secondscreen">
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>{questions.Screen1.Questions[0]}</p>
                </div>
                </Link>
                <Link to="/form">
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>{questions.Screen1.Questions[1]}</p>
                </div>
                </Link>
                <div className="First-options" style={{backgroundColor: configObj?.backgroundColor}}>
                    <p className='First-option-text'>{questions.Screen1.Questions[2]}</p>
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