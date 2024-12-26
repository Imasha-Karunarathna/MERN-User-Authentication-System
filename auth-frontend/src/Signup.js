import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state

    const handleSignup = async () => {
        // Preventing multiple requests while one is in progress
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, password });
            setMessage(response.data.message);
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
        <div className="signup-container">
            <h2>---Signup---</h2>
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
            <button onClick={handleSignup} disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Signup'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
