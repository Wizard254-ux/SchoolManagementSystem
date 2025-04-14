import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {JSX} from "react";
import LandingPage from "./LandingPage";
import AppsPage from "./Apps";
import MessageAppRoutes from '../Apps/Messaging/Main'
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";

const App=():JSX.Element=>{
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apps" 
        element={<ProtectedRoute>
                  <AppsPage/>
                 </ProtectedRoute>
                  }   
        />
        <Route 
        path="/apps/communication/*"
         element={<ProtectedRoute>
                   <MessageAppRoutes/>
                </ProtectedRoute>
          } 
          
          />
        {/* <Route path="/*" element={<MessageMain />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}
export default App;
