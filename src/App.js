
import React from 'react';
import { APIContextProvider } from "./components/context/widgetconfig"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import chatBot from './components/first-screen';
import secondScreen from './components/second-screen';
import thirdScreen from './components/third-screen';
import formScreen from './components/form-screen';
import CalenderScreen from './components/calender-screen';
import MessageScreen from './components/message-screen';
///testing
require('dotenv').config()
const App = () => {
  return (
    <div className="App">
      <APIContextProvider>
        <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={chatBot}
          />
           <Route
            path="/secondscreen"
            component={secondScreen}
          />
          <Route
            path="/thirdscreen"
            component={thirdScreen}
          />
           <Route
            path="/form"
            component={formScreen}
          />
           <Route
            path="/calender"
            component={CalenderScreen}
          />
           <Route
            path="/message"
            component={MessageScreen}
          />
        </Switch>
      </Router>
      </APIContextProvider>
    </div>
  );
}

export default App;
