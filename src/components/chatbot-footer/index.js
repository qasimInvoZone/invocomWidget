/* disable eslint */
import React, {useState} from "react";
import '../../assets/styles/global.scss';
import send_icon from '../../assets/icons/send_icon.svg';
import emoji from '../../assets/icons/emoji.svg';
import link from '../../assets/icons/link.svg';
import Picker from 'emoji-picker-react';
import axios from 'axios'
require('dotenv').config()
const ChatFooter = () => {
    const [message, setMessage] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null);
    console.log(showEmoji);
    const onEmojiClick = (event, emojiObject) => {
        
        setChosenEmoji(emojiObject.emoji);
        let tempString = message +' '+chosenEmoji;
        setMessage(tempString)
    };
    const sendMessage = async () => {
        const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
        const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
        const entity = 'chat'
        const endPoint = `${baseUrl}/${apiVersion}/${entity}/usermessage`
        const email = localStorage.getItem('userEmail')
        try {
            const response = await axios.post(endPoint, { email, message })
            console.log("response", response)
            console.log(response.status)
            if(response.status == 200){
                setMessage('');
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
      }

return(
        <div className=" border-t border-blue-500 rounded-br-lg rounded-bl-lg p-2">
            <div className="inner_container flex justify-center ">
            <div className="input_container">
            <input className="outline-none" style={{width: '100%'}} type="text" value={message} placeholder="Type here..." onClick={()=>{setShowEmoji(false)}} onChange={(e) => { setMessage(e.target.value) }} onKeyPress={(e) => handleKeyPress(e)}/>
            </div>
            <div className="icon_container flex justify-evenly ">
            <div className="footer-divs">
            <img src={link} alt="" />
            </div>
            
                
                {showEmoji ? (
                    <div>
                        <Picker onEmojiClick={onEmojiClick} /> 
                    </div>
                    ) : (
                    <div className="footer-divs">
                        <img src={emoji} alt="" onClick={() => setShowEmoji(true)}/>
                    </div>
                    )
                }
                             

            <div className="footer-divs">
            <img src={send_icon} alt="" onClick={() => sendMessage()}/>
            </div>
            </div>
            </div>
        </div>

);
}

export default ChatFooter;