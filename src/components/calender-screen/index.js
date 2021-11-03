import React, {useState} from "react";
import ChatHead from "../chatbot-head";
import ChatFooter from "../chatbot-footer";
import messageicon from '../../assets/icons/message-icon.svg';
import '../../assets/styles/global.scss';
import { Scheduler } from "../select-options";
import { BotDialogues4 } from "../bot-Dialogues";

const calenderScreen = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chat , setChat] = useState(true);

return(
    <div className="complete_bot second_screen_size">
       
        {chat? 
         <>
         <div className=" border border-blue-500 rounded-lg">

         <ChatHead />
            
        <div className="px-6 pt-2" style={{height: '170px'}}>
        <BotDialogues4 />
        </div>
                <div className="px-4 ">
                           
                <div className="container-scheduler mb-2">
                <div className="mb-2">
                        <p className="text-sm font-bold mb-1">Select Date & Time </p>
                        <p className="text-xs">(30 min meeting) 
                        <span className="text-blue-500">UTC +05:00 Islamabad,karachi</span></p>
                    </div>
                <Scheduler />
                </div>
                <ChatFooter />
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

export default calenderScreen;