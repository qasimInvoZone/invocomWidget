import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/global.scss';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import dotenv from  'dotenv'
import validator from 'validator'
const BotDialogues1 = () => {


return(
  
       <div>
           <p className="text-xs text-gray-400">Iz bot 11:54 am</p>
           <p className="text-sm mb-3">Get access to pool of tech experts across multiple domains</p>
       </div>
       
);
}

export default BotDialogues1;


export const BotDialogues4 = () => {


    return(
      
           <div className="text-container">
               <p className="text-sm mb-1">Please select the date and time that you're available, also confirm your email address</p>
           </div>
           
    );
    }

    export const BotDialogues2 = () => {


        return(
          
               <div>
                   <p className="text-xs text-gray-400">Iz bot 11:54 am</p>
                   <p className="text-sm mb-3">What kind of work design & development work do you need ?</p>
               </div>
               
        );
        }
    export const Form = (props) =>
    {
        const message = props.message;
        console.log(message);
        const [email, setEmail] = useState('')
        const [fullname, setFullname] = useState('')
        const [username, setUsername] = useState('')
        const [chat, setChat] = useState('')
        const [isExist, setIsExist] = useState(false)
        const history = useHistory();
        const [emailError, setEmailError] = useState(false)
        const validateEmail = (e) => {
            setEmail(e.target.value)
            if (validator.isEmail(email)) {
                setEmailError(false)
            } else {
                setEmailError(true)
            }
    }

        const registerUser = async () => {
            const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
            const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
            const entity = 'user'
            const role = 'USER'
            const endPoint = `${baseUrl}/${apiVersion}/${entity}/register`
            try {
                const response = await axios.post(endPoint, { username, fullname, email, role })
                if (response.status === 200) {
                    localStorage.setItem('userEmail', email)
                    localStorage.setItem('username', username)
                    const entity = 'chat'
                    const status = true
                    const endPoint2 = `${baseUrl}/${apiVersion}/${entity}/usermessage`
                    const response = await axios.post(endPoint2, { email, message, status })
                    if (response.status === 200) {  
                        setChat(response.data.chat);
                        history.push("/calender")
                    }
                }
            } catch (e) {
                setIsExist(true);
            }
        }
            return(
                <>
                <div className="" style={{fontSize:"0.9rem"}}>
                Fill in the details below and we'll zone in your project in no time!
                </div>
                <div className="form-wrapper">
                    <input type="email" required placeholder="Email Address" className="input-wrapper" onChange={(e) => validateEmail(e)}/><br />
                    {emailError? <span>Invalid Email</span> : '' }
                    <input type="text" required placeholder="Full Name" className="input-wrapper mt-2" onChange={(e) => { setFullname(e.target.value) }}/><br />
                    <input type="text" required placeholder="Username" className="input-wrapper mt-2" onChange={(e) => { setUsername(e.target.value) }}/><br />
                    {email == '' || username == '' || fullname == '' ? 
                        (<div className="invalid-data"><span> Cannot set Empty user data </span><button className="bg-blue-500 rounded py-1 px-2 mt-2 text-xs text-white">Send</button></div> )
                        : isExist? <div className="user-exist"><span> User Already Exists </span><button className="bg-blue-500 rounded py-1 px-2 mt-2 text-xs text-white">Send</button></div> 
                        : <button className="bg-blue-500 rounded py-2 px-2 mt-2 text-xm text-white" onClick={() => registerUser()}>Send</button>
                        
                    }
                </div>
                </>
            );

    }