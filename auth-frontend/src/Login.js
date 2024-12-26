import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async () => {
        // Preventing multiple requests while one is in progress
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            localStorage.setItem('token', response.data.token); // Store token
            setMessage(response.data.message);
            navigate('/profile'); // Redirect to profile
        } catch (error) {
            // Error handling
            if (error.response) {
                // Server error
                setMessage(error.response.data.message || 'Something went wrong!');
            } else {
                // Network error
                setMessage('Network error, please try again later!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>---Login---</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
