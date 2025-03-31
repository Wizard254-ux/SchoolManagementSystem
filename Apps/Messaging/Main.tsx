import {JSX} from 'react'
import { Route,Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Message from './Message'
import Deals from './Deals'
import Contact from './Contact';
import Reports from './Reports'


const  Main=():JSX.Element=> {
  return (
    <Routes>
    {/* Add an index route that redirects to profile */}
    <Route index element={<Navigate to="Messages"  />} />
    <Route path='Messages' element={<Message/>} />
    <Route path='Deals' element={<Deals/>} />
    <Route path='Contacts' element={<Contact/>} />
    <Route path='Reports' element={<Reports/>} />
   
  </Routes>
  )
}

export default Main