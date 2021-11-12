import React, {useState} from "react";
import ChatHead from "../chatbot-head";
import ChatFooter from "../chatbot-footer";
import { Form } from '../bot-Dialogues';
import messageicon from '../../assets/icons/message-icon.svg';
import '../../assets/styles/global.scss';
const formScreen = (props) => {
    let message;
    console.log(props);

    if(props.location.state){
        message = props?.location?.state?.messages;
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chat , setChat] = useState(true);

return(
    <div className="complete_bot second_screen_size">
       
        {chat? 
         <>
         <div className=" border border-blue-500 rounded-lg" style={{height: '100%'}}>

         <ChatHead />

                <div className="p-4 mt-14">
                <div>
                {message ?
                    <Form message={message}/> : 
                    <Form />
                }
                </div>
                </div>
                <div className="">
                </div>
            </div></>
   
     :
      ''
      }
 <div className="chat_icon">
  <img onClick={() => setChat(!chat)} src={messageicon} alt="" />
</div>
 </div>

);
}

export default formScreen;