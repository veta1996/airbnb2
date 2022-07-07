import React from 'react'
import useControlledInput from '../../customHooks/useControlledInput'
import {useNavigate} from 'react-router-dom'
import './SearchBox.css'

function SearchBox(props) {
  const where = useControlledInput('');
  //const [where, setWhere] = useState('')
  const checkIn = useControlledInput('');
  const checkOut = useControlledInput('');
  const guests = useControlledInput(1);
  let navigate = useNavigate();
 

  const submitSearch = (e) => {
    e.preventDefault();
    navigate('/search/' + where.value)
    console.log(where.value, "dfvhbfhjwbfjwehbf")
  }
  return (
    <div className='home-search-box col m4'>
      <h1>Book unique places to stay and things to do.</h1>
      <form className='search-box-form' onSubmit={submitSearch}>
        <div className='col m12'>
          <div className='form-label'>Where</div>
          <div className='input-field' id='where'>
            <input className='browser-default' 
            placeholder='Anywhere'
            type='text'
            {...where}
            />
          </div>
        </div>

        <div className='col m6'>
          <div className='form-label'>Check-In</div>
          <div className='input-field' id='check-in'>
            <input className='browser-default' type='date'
            {...checkIn}/>
          </div>
        </div>

        <div className='col m6'>
          <div className='form-label'>Check-Out</div>
          <div className='input-field' id='check-out'>
            <input className='browser-default' type='date'
            {...checkOut}/>
          </div>
        </div>

        <div className='col m12'>
          <div className='form-label'>Guests</div>
          <div className='input-field' id='number'>
            <input className='browser-default' type='number'
            {...guests}/>
          </div>
        </div>

        <div className='col m12 submit-btn'>
          <div className='input-field' id='submit-btn'>
            <input className='btn-large waves-effect waves-light red accent-2' type='submit'/>
          </div>
        </div>

      </form>
    </div>
  )
}

export default SearchBox