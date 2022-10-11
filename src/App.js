import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Spinner from './utility/Spinner/Spinner';
import NavBar from './utility/NavBar/NavBar';
import { Container } from '@mui/system';
const Home = lazy(() => import('./pages/Home/Home'))
const SingleFullVenue = lazy(() => import('./pages/SingleFullVenue/SingleFullVenue'))
const Modal = lazy(() => import('./utility/Modal/ModalWindow'))
const CityVenues = lazy(() => import('./pages/CityVenues/CityVenues'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess/PaymentSuccess'))
const Account = lazy(() => import('./pages/Account/Account'))
const Search = lazy(() => import('./pages/Search/Search'))
const ActivityVenue = lazy(() => import('./pages/ActivityVenue/ActivityVenue'))



function App() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
       <Router>
          <Suspense fallback={<Spinner/>}>
          <><Modal/><NavBar/></>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/venue/:vid" element={<><Modal/><SingleFullVenue/></>}/>
                <Route path="/activity/:vid" element={<><Modal/><ActivityVenue/></>}/>
                <Route path="/city/:cityName" element={<CityVenues/>}/>
                <Route path="/payment-success/:stripeToken" element={<PaymentSuccess/>}/>
                <Route path="/account/*" element={<Account/>}/>
                <Route path='/search/:searchId' element={<Search/>}/>
              </Routes>
            </Suspense>
      </Router>
      </Container>
      </ThemeProvider>
    );
}

export default App;