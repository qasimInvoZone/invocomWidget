import React, {useState, useEffect, useRef} from "react";
import '../../assets/styles/global.scss';
import logo from '../../assets/logos/invocom-log.png';
import { io } from "socket.io-client";
import uuid from "react-uuid";
require('dotenv').config()
var moment = require('moment');
const Chat = () => {
    const [chat , setChat] = useState([]);

    const renderChat = (chat) => {
        const leadName = localStorage.getItem('username')
        return chat.map((message) => {
            const isSender = message.senderName === leadName;
            return(
                    <div key={uuid()} className={`flex ${isSender?   'justify-end' : 'justify-start'} p-2`}>
                    <div className='chat_message_container'>{!isSender? <img src={logo} alt=''/> : ''}</div>
                        <div className={`${isSender?  'sent': 'recieved'} w-max p-3 pb-4 rounded-lg ${isSender?   'bg-secondary': 'bg-primary'} break-all relative`}>
                            <p> {message.message} </p>
                            <small>{moment(message.createdAt).format("hh:mm a")} </small>
                        </div>
                        <AlwaysScrollToBottom />
                    </div>
            )
        })
    }

    const fetchChats = async () => {
        const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
        const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
        const entity = 'chat'
        const email = await localStorage.getItem('userEmail');
        if(email){
            const response = await fetch(`${baseUrl}/${apiVersion}/${entity}/user`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const chatsData = await response.json();
            if (response.status === 200) {
                if (chatsData?.data?.chats[0]?.messages?.length > 0) {
                    setChat(chatsData?.data?.chats[0]?.messages);
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
      },[])
      const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };
      return(
        <div className='chat_body message_body w-lg h-md border border-primary border-b-0 relative overflow-y-auto'>
        {renderChat(chat)}
      </div>
      )
}

export default Chat;