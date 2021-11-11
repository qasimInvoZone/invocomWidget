
import React from "react";
import {useHistory} from 'react-router-dom';
import Admins from '../../assets/images/admin.png';
import '../../assets/styles/global.scss';

const chatHead = () => {

// eslint-disable-next-line react-hooks/rules-of-hooks
const history = useHistory();

return(
        <div className="rounded-tr-lg rounded-tl-lg bot-head bg-blue-500 p-4">
            <div className="flex items-center">        
                    <img src={Admins} alt="admins" />
                    <h3 onClick={() => history.push('/')} className="text-xl font-semibold text-white">InvoCom</h3>
            </div>    
            <p className="text-sm text-white ml-2">What can I help learn more about?</p>
        </div>

);
}

export default chatHead;