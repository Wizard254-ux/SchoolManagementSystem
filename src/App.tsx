import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MessageMain from '../Apps/Messaging/Main'
import {JSX} from "react";

const App=():JSX.Element=>{
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MessageMain />} />
      </Routes>
    </Router>
  );
}
export default App;
