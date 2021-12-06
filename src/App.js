import './App.scss';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import MainScreen from '../src/screens/WelocomScreen/mainScreen';
import Questions from './screens/SeconScreen'
import FormScreen from './screens/FormScreen';
import CalendarScreen from './screens/CalendarScreen';
import ChatScreen from './screens/ChatScreen';
import Blog from './screens/Blogs'
const App = () => {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainScreen/>} />
          <Route  path="/second-screen" element={<Questions/>} />
          <Route  path="/form-screen" element={<FormScreen/>} />
           <Route path="/calendar" element={<CalendarScreen />} />
           <Route path="/chat" element={<ChatScreen />} />
           <Route path="/blogs" element={<Blog />} />

        </Routes>
     </Router>
    </div>
  );
}

export default App;
