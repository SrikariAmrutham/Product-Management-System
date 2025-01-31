import React, {useState} from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import './Login.css'

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [error, setError] = useState('');
    

    const handleLogin = async() => {
        try {
          const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
          localStorage.setItem('token', data.token);
          const user = jwtDecode(data.token);
          console.log('role', user.role);
          login(user);
          if (user.role === 'admin') {
            window.location.href = '/admin-dashboard';
          } else {
            window.location.href = '/products';
          }
        } catch (err) {
          setError('Login failed. Please try again.', err);
          console.error(err);
        }
    };

    return(
        <div className='login-container'>
            <h1>Login</h1>
            <input type='name' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            {error && <p>{error}</p>}

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;