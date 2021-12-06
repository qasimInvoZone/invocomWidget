import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideBot } from "../../Redux/Actions/crossAction.js";
import logo from "../../assets/logos/invocom-log.png";
import Header from "../../Components/Header";
import { sendUserData, sendChatData } from "../../Components/Form/index";
import Brand from "../../Components/Brand";
import { AvForm, AvField} from 'availity-reactstrap-validation';
import "../../assets/styles/global.scss";

const FormScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const handleValidSubmit = (values) => {
    setEmail({ email: values.email });
  };
  const handleInvalidSubmit = (event, errors, values) => {
    setEmail({ email: values.email, error: true });
  };

  const navigate = useNavigate();
  let message = [];

  let location = useLocation();
  if (location.state) {
    message = location?.state?.allMessages;
  }
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();

  async function formHandler() {
    try {
      const role = "USER";
      const user = await sendUserData({
        email: email,
        fullname: fullname,
        username: username,
        role: role,
      });
      if (user.status === 200) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
        const status = true;
        const chat = await sendChatData({
          message: message,
          email: email,
          status: status,
        });

        if (chat.status === 200) {
          navigate("/calendar");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="complete_bot absolute">
      {toggleBot ? (
        <div className="widget">
          <Header />

          <div className="message_body w-lg h-lg border border-primary border-b-0 relative overflow-y-auto">
            <div className="form_body h-md flex justify-center items-center">
              <div className="form_container w-form">
                <p>
                  fill in the details below and we'll zone in your project in no
                  time!
                </p>
                <AvForm
                  onValidSubmit={handleValidSubmit}
                  onInvalidSubmit={handleInvalidSubmit}
                >
                  <AvField
                    style={{ margin: '0' }}
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    
                  />
                  <AvField
                    name='name'
                    type='Full name'
                    placeholder='Full name'
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />

                  <AvField
                    name='username'
                    type='Username'
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </AvForm>
                <button onClick={()=> formHandler()}>Submit</button>
              </div>
            </div>
          </div>
          <Brand />
        </div>
      ) : (
        ""
      )}

      <img onClick={() => dispatch(hideBot())} src={logo} alt="" />
    </div>
  );
};

export default FormScreen;
