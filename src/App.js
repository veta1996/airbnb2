import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Spinner from './utility/Spinner/Spinner';
const Home = lazy(() => import('./pages/Home/Home'))
const SingleFullVenue = lazy(() => import('./pages/SingleFullVenue/SingleFullVenue'))
const Modal = lazy(() => import('./utility/Modal/Modal'))
const CityVenues = lazy(() => import('./pages/CityVenues/CityVenues'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess/PaymentSuccess'))
const Account = lazy(() => import('./pages/Account/Account'))
const Search = lazy(() => import('./pages/Search/Search'))

function App() {
 
    return (
      <Router>
      <div>
      <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<><Modal/><Home/></>}/>
            <Route path="/venue/:vid" element={<SingleFullVenue/>}/>
            <Route path="/city/:cityName" element={<CityVenues/>}/>
            <Route path="/payment-success/:stripeToken" element={<PaymentSuccess/>}/>
            <Route path="/account/*" element={<Account/>}/>
            <Route path='/search/:searchId' element={<Search/>}/>
          </Routes>
        </Suspense>
          </div>
      </Router>
    );
}

export default App;