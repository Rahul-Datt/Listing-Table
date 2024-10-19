import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './UserReducer';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const users = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser({id: users[users.length - 1]. id + 1, firstName, lastName,phone, email}));
        navigate('/')
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border text-white p-5' style={{backgroundColor: 'tomato'}}>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first name">First Name: </label>
                <input type="text" name='first name' className='form-control' placeholder='enter first name' value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="last name">Last Name: </label>
                <input type="text" name='last name' className='form-control' placeholder='enter last name' value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="phone">Phone No.: </label>
                <input type="text" name='phone' className='form-control' placeholder='enter phone number' value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name='email' className='form-control' placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
            </div><br />
            <button type='submit' className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create
