/* eslint-disable */
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios'
import '../../assets/styles/global.scss';
require('dotenv').config()
var moment = require('moment');
moment().format();
const displayQuestions = (questions) => {    
    return questions.map((question) => {
        return  <Link to={{ pathname: '/thirdscreen', state: { data: question} }}>
                    <div className="second-options">
                        <p className='second-option-text'>{question.questionStatement}</p>
                    </div>
                </Link>
    })
 }
const chooseoptions1 = (props) => {
return(
        <div className="container second-screen mb-6">
           {displayQuestions(props.questions)}
        </div>
);
}
export default chooseoptions1;
const displayQuestions2 = (data,selectedQuestions) => {
    return data.map((d) => {
        return  <Link to={{ pathname: "/form", state: {data: d, selectedQuestions: selectedQuestions}}}>
                    <div className="second-options">
                        <p className='second-option-text'>{d.questionStatement}</p>
                    </div>
                </Link>
    })
 }
export const Chooseoptions2 = (props) => {
    const history = useHistory();
    const selectedQuestions = [];
    selectedQuestions.push(props.data.data.questionStatement);
    return <div className="container second-screen">
     { props.data.data.childrens ? displayQuestions2(props.data.data.childrens,selectedQuestions) : history.push('/form')}
    </div>
    }

    
    export const Scheduler = (props,DAYS) => {
      useEffect(()=>{
         const isMeeting = localStorage.getItem('isMeeting');
         if(isMeeting == true && isMeeting != null){
            history.push('/message');
         }
       })
      const history = useHistory();
      const [date , setDate] = useState('');
      const [time , setTime] = useState('');
      const email = localStorage.getItem('userEmail');
      const setMeeting = async () => {
         const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
         const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
         const entity = 'meeting'
         const endPoint = `${baseUrl}/${apiVersion}/${entity}/schedule`
         let hoursAndMinutes = time.split(':');
         let updatedDate = moment(date).set("hours",hoursAndMinutes[0]).set("minutes",hoursAndMinutes[1]).set("seconds",'00').toDate();
         try {
            const response = await axios.post(endPoint, { date:updatedDate, email:email })
            if (response.status === 200) {
               localStorage.setItem('isMeeting',true);
               history.push("/message");
            } else {
               localStorage.setItem('isMeeting',false);
               window.alert('slot already booked');
               
            }
         } catch (e) {
            localStorage.setItem('isMeeting',false);
            window.alert('Slot already booked please please try another Date & Time');
         }
      }
      const days = []
      const dateStart = moment()
      const dateEnd = moment().add(30, 'days')
      while (dateEnd.diff(dateStart, 'days') >= 0) {
       days.push(dateStart._d.toString())
       dateStart.add(1, 'days')
      }
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                {
                  breakpoint: 550,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                    breakpoint: 450,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: false
                    }
                  }
            ]
          };
          const renderDay = (day,id) => {
             
            const dayInfo = day.split(' ');
            return  <div className="calender-style" onClick={() => { setDate(day) }}>
            <p className="text-xs" key={id}>{dayInfo[1]}</p>
            <p className="text-xs">{dayInfo[2]}</p>
         </div >
          }
        return(
            <div className="width">
            <div className="flex justify-center mb-2">
                    <Slider className="slider_comp" {...settings}>
                           {days.map((day,id) =>
                              renderDay(day,id)
                           )}
                    </Slider>
                </div>
            <div className="flex justify-center mb-2">
                    <Slider className="slider_comp" {...settings}>
                        <div className="calender-style" onClick={() => { setTime('8:00') }}>
                           <p className="text-xs text-center" >8:00<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('8:30') }}>
                           <p className="text-xs text-center">8:30<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('9:00') }}>
                           <p className="text-xs text-center">9:00<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('9:30') }}>
                           <p className="text-xs text-center">9:30<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('10:00') }}>
                           <p className="text-xs text-center">10:00<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('10:30') }}>
                           <p className="text-xs text-center">10:30<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('11:00') }}>
                           <p className="text-xs text-center">11:00<br /> am</p>
                        </div >
                        <div className="calender-style" onClick={() => { setTime('8:00') }}>
                           <p className="text-xs text-center" >11:30<br /> am</p>
                        </div >
                    </Slider>
                    
                </div>
                <button className="w-full bg-blue-500 rounded py-2 px-2 mt-2 text-sm text-white" onClick={() => setMeeting()}>Comfirm</button>
                </div>
        );
    }