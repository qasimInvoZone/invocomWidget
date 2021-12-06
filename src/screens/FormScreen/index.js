import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideBot } from "../../Redux/Actions/crossAction.js";
import logo from "../../assets/logos/invocom-log.png";
import Header from "../../Components/Header";
import { sendUserData, sendChatData } from "../../Components/Form/index";
import Brand from "../../Components/Brand";
import "../../assets/styles/global.scss";

const FormScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  // const [chat, setChat] = useState('')
  const navigate = useNavigate();
  let message = [];

  let location = useLocation();
  if (location.state) {
    message = location?.state?.allMessages;
  }
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();

  async function formHandler(event) {
    event.preventDefault();
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
                <form onSubmit={formHandler}>
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={fullname}
                    onChange={(event) => setFullname(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
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
