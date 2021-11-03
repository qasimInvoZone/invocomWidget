
import React from "react";
import {useHistory} from 'react-router-dom';
import '../../assets/styles/global.scss';

const chatHead = () => {

// eslint-disable-next-line react-hooks/rules-of-hooks
const history = useHistory();

return(
        <div className="rounded-tr-lg rounded-tl-lg bot-head bg-blue-500 p-4">
            
            <h3 onClick={() => history.push('/')} className="text-lg font-semibold text-white">InvoCom</h3>
            
            <p className="text-sm text-white">What can I help learn more about?</p>
        </div>

);
}

export default chatHead;