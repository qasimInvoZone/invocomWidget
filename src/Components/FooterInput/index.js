import React, {useState} from "react";
import '../../assets/styles/global.scss';
import send from '../../assets/icons/send.png';
import link from '../../assets/icons/link.png';
import emoji from '../../assets/icons/emoji.png';
import Picker from 'emoji-picker-react';
import axios from 'axios'
require('dotenv').config()
const Footer = () => {
    const [message, setMessage] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        let tempString = message +' '+emojiObject.emoji;
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
            if(response.status == 200){
                setMessage('');
            }
        } catch (e) {

        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
      }

    return (
        <div className="footer w-lg h-inputfoot border border-primary border-t-0 flex items-center">
            <div className="input_container w-full bg-lightGrey flex justify-between items-center px-3 relative">
                <input type="text"  value={message} placeholder="Type your message here" onClick={() => setShowEmoji(false)} onChange={(e) => { setMessage(e.target.value) }} onKeyPress={(e) => handleKeyPress(e)}/>
                {showEmoji ? (
                    <div className="emoji_picker">
                        <Picker onEmojiClick={(event, emojiObject)=>onEmojiClick(event, emojiObject)} /> 
                    </div>
                    ) : (
                    ''
                    )
                }
                <div className="button_container flex justify-evenly items-center">
                    <img src={emoji} alt="" onClick={() => showEmoji? setShowEmoji(false) : setShowEmoji(true)}/>
                    <img src={link} alt="" />
                    <button onClick={() => sendMessage()}>
                        <img src={send} alt="" />
                    </button>
                </div>
                <div className="branding absolute ml-0 mb-0">
                    <p>Powered by <span>InvoZone</span></p>
                </div>
            </div>

        </div>
    )
}

export default Footer