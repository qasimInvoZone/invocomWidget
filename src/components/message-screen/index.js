import React,{ useState, useEffect, useRef } from "react";
import ChatHead from "../chatbot-head";
import ChooseOption1 from "../select-options";
import ChatFooter from "../chatbot-footer";
import BotDialogues1 from "../bot-Dialogues";
import messageicon from "../../assets/icons/message-icon.svg";
import '../../assets/styles/global.scss';
import './index.css';
import axios from 'axios'
import { io } from "socket.io-client";
var moment = require('moment');
require('dotenv').config()


const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const MessageScreen = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [chat , setChat] = useState([]);
  const ENDPOINT = process.env.REACT_APP_INVOCOM_API_URL;
  
  const fetchChats = async () => {
    const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
    const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
    const entity = 'chat'
    const endPoint = `${baseUrl}/${apiVersion}/${entity}/user`
    const email = localStorage.getItem('userEmail');
    if( email ){
      const response = await axios.post(endPoint, { email })
      if (response.status == 200) {
        if (response?.data?.data?.chats[0]?.messages?.length > 0) {
          setChat(response?.data?.data?.chats[0]?.messages);
        }
        else {
          setChat([]);
        }
      }
    }
    
  }
  useEffect(() => {
    fetchChats();
    
    const socket = io(process.env.REACT_APP_INVOCOM_API_URL, {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax' : 5000,
      'reconnectionAttempts': 5,
      transports: ['websocket'],
      upgrade: false,
    });


    socket.on('sendNewMessageToClient', (updatedChat) => {
      const email = localStorage.getItem('userEmail')

      if (
        JSON.stringify(updatedChat.client.email) === JSON.stringify(email)
      ) {
        setChat(updatedChat.messages)
      }
    })

    socket.on('newMessageFromClient', (updatedChat) => {
      const email = localStorage.getItem('userEmail');
      if (
        chat && (JSON.stringify(updatedChat.client.email) === JSON.stringify(email))
      ) {
        setChat(updatedChat.messages)
      }
    })
  },[io,setChat])

  const renderChat = (chat) => {
    const leadName = localStorage.getItem('username')
    return chat.map((message) => {
      return  <div className={`message-main ${message.senderName == leadName?   'sender': 'reciever'}`}>
                <div className="d-flex align-items-start comment">
                  
                  <div className="comment_item">
                    <span className="comment_desc">{message.message}</span>
                  </div>
                  <p> {moment(message.createdAt).format("hh:mm a")} </p>
                </div>
                
                <AlwaysScrollToBottom />
              </div>
    })
  }
  return (
    <div className="complete_bot second_screen_size">
        {chat? 
         <>
          <div className=" border border-blue-400 rounded-lg">
            <ChatHead />
            <div className="message_body" style={{height:"350px"}}>
              {renderChat(chat)}
            </div>
            <ChatFooter />
          </div>
          </>
   
   :
    ''
    }
      <div className="chat_icon">
  <img onClick={() => setChat(!chat)} src={messageicon} alt="" />
</div>
    </div>
  );
};

export default MessageScreen;