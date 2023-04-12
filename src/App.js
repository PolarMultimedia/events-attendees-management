import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Layout } from "./components";
import { 
  Home,
  ToursPage,
  EventsPage,
  AttendeesPage,
  RegisterTourPage,
  RegisterEventPage,
  RegisterAttendeePage,
  AttendeeInfoPage
} from './pages';


function App() {
  return (
    <Layout>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/tours' element={ <ToursPage /> } />
          <Route path='/eventos/:tour_id' element={ <EventsPage /> } />
          <Route path='/invitados/:event_id' element={ <AttendeesPage /> } />
          <Route path='/agregar-tour' element={ <RegisterTourPage /> } />
          <Route path='/agregar-evento/:tour_id' element={ <RegisterEventPage /> } />
          <Route path='/agregar-invitado/:event_id' element={ <RegisterAttendeePage /> } />
          <Route path='/invitado/:user_id' element={ <AttendeeInfoPage /> } />
        </Routes>
    </Layout>
  );
}

export default App;
