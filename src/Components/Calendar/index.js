import React, { useState } from 'react';
import '../../assets/styles/global.scss';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
var moment = require('moment');
moment().format();

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    var settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
      };
      var settingsTime = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
      const timeSlots = {
        nextSlot: 30,
        startTime: '8:00 ',
        endTime: '17:30 ',
      };

      var slotTime = moment(timeSlots.startTime, 'hh:mm a');
      var endTime = moment(timeSlots.endTime, 'hh:mm a');

      let times = [];
      while (slotTime < endTime) {
        times.push(slotTime.format('hh:mm a'));
        slotTime = slotTime.add(timeSlots.nextSlot, 'minutes');
      }
      const days = [];
      const dateStart = moment();
      const dateEnd = moment().add(7, 'days');
      while (dateEnd.diff(dateStart, 'days') >= 0) {
        days.push(dateStart._d.toString());
        dateStart.add(1, 'days');
      }

    const renderDay = (day, id) => {

        const dayInfo = day.split(' ');
        return (
          <div
            key={id}
            className='dates'
            onClick={(e) => {
              setDate(day);
              setSelectedDate(
                [...document.querySelectorAll('.date_active')].map((x) =>
                  x.classList.remove('date_active')
                )
              );
              setSelectedDate(e.target.classList.add('date_active'));
            }}
          >
            {dayInfo[0]}
            <br />
            {dayInfo[2]}
          </div>
        );
    };

    const setMeeting = async () => {
        if(date !== '' && time !== ''){
           const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
           const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
           const entity = 'meeting'
           let hoursAndMinutes = time.split(':');
           const email = localStorage.getItem('userEmail');
           let updatedDate = moment(date).set("hours",hoursAndMinutes[0]).set("minutes",(hoursAndMinutes[1].split(' '))[0]).set("seconds",'00').toDate();
           try {
               const response = await fetch(`${baseUrl}/${apiVersion}/${entity}/schedule`, {
                method: 'POST',
                body: JSON.stringify({
                    date: updatedDate,
                    email: email
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.status === 200) {
                 localStorage.setItem('isMeeting',true);
                 navigate("/chat");
              } else {
                 localStorage.setItem('isMeeting',false);
                 window.alert('slot already booked');
              }
           } catch (e) {
              localStorage.setItem('isMeeting',false);
              window.alert('Slot already booked please please try another Date & Time');
           }
        } else {
           window.alert('Please select Date & Time');
        }

     }
    return(
        <div>
            <div className='slider_container flex justify-center'>
                  <Slider className='date_slider' {...settings}>
                    {days.map((day, id) => (
                      <div key={id} className='date_option'>
                        {renderDay(day, id)}
                      </div>
                    ))}
                  </Slider>
                </div>

                <div
                  className='slider_container flex justify-center py-4'
                  style={{
                    borderTop: '1px solid #1b3660',
                    borderBottom: '1px solid #1b3660',
                  }}
                >
                  <Slider className='date_slider' {...settingsTime}>
                    {times.map((slotTime, id) => {
                      const selectTime = slotTime;
                      return (
                        <div
                          key={id}
                          className='time_option'
                          onClick={(e) => {
                            setTime(slotTime);
                            setSelectedTime(
                              [
                                ...document.querySelectorAll('.time_active'),
                              ].map((x) => x.classList.remove('time_active'))
                            );
                            setSelectedTime(
                              e.target.classList.add('time_active')
                            );
                          }}
                        >
                          <p>{slotTime}</p>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                <div className='slider_container flex justify-center'>
                  <div className='slick_btn_container w-calBtn flex justify-between'>
                    <button className='cancel-btn'> Cancel</button>
                    <Link to='/chat'>
                      {' '}
                      <button onClick={() => setMeeting()} className='confirm-btn'>Confirm</button>
                    </Link>
                  </div>
                </div>
        </div>
    )
}

export default Calendar;