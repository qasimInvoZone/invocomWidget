/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideBot } from "../../Redux/Actions/crossAction.js";
import logo from "../../assets/logos/invocom-log.png";
import Header from "../../Components/Header";
import Brand from "../../Components/Brand";
import uuid from "react-uuid";
import "../../assets/styles/global.scss";

const mainScreen = () => {
  const navigate = useNavigate();
  let allMessages = [];
  const [historyStack, setHistoryStack] = useState([]);
  const [isBacktrack, setIsBacktrack] = useState(false);
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showDialogue, setShowDialogue] = useState(true);
  
  const toggleBot = useSelector((state) => state.isCrossedReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    async function getParentQuestion() {
      try {
        const baseUrl = process.env.REACT_APP_INVOCOM_API_URL;
        const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION;
        const entity = "question";
        const response = await fetch(`${baseUrl}/${apiVersion}/${entity}`, {
          method: "GET",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    }
    getParentQuestion();
  }, []);

  const renderQuestions = (questionsArray) => {
    if (questionsArray?.childrens === undefined) {
      navigate("/form-screen", { state: { allMessages } });
    }
    return questionsArray?.childrens?.map((question) => {
      return (
        <div
          key={uuid()}
          onClick={() => {
            setIsBacktrack(true);
            allMessages = [...messages, question.question];
            question.question === 'Educational Content' ? navigate("/blogs") : renderQuestions(question)
            setMessages(allMessages);
            const history = [...historyStack, questionsArray];
            setHistoryStack(history);
            setQuestions(question);
          }}
          className="option max-w-md w-max break-all border border-primary rounded p-2 hover:bg-primary hover:text-white hover:cursor-pointer"
        >
          <p>{question.question}</p>
        </div>
      );
    });
  };
  return (
    <div className="complete_bot absolute">
      {toggleBot ? (
        <div className="widget">
          <Header
            renderQuestions={renderQuestions}
            historyStack={historyStack}
            messages={messages}
            setQuestions={setQuestions}
            setIsBacktrack={setIsBacktrack}
            isBacktrack={isBacktrack}
          />
          <div className="message_body w-lg h-lg border border-primary border-b-0 relative overflow-y-auto">
            <div className="welcome_message_container flex ">
              <img src={logo} alt="" />
              <div className="welcome_message w-md break-all bg-secondary p-4 relative rounded">
                <strong>Invocom</strong>
                <p>
                  Welcome to InvoZone!
                  <br />
                  {questions?.questionStatement}
                </p>
                {/* <span>11:35 AM</span> */}
              </div>
            </div>
            <div className="options_list absolute">
              {renderQuestions(questions)}
            </div>
          </div>

          <Brand />
        </div>
      ) : (
        <div>
          {showDialogue ? (
            <div className="bot_first_effect w-sm h-sm p-4 rounded-lg relative bg-grey border border-primary">
              <p>
                Welcome to InvoZone!
                <br />
                How may I help You today?
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <img
        onClick={() => {
          dispatch(hideBot());
          setShowDialogue(false);
        }}
        src={logo}
        alt=""
      />
    </div>
  );
};

export default mainScreen;
