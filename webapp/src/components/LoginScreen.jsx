import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure to import the initialized Firebase auth instance
import '../styles/LoginScreen.css';

const LoginScreen = () => {
    const [formData, setFormData] = useState({
        role: 'viewer', name: '', rollNo: '', code: '', password: '', course: '', email: ''
    });
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Track if the user is in Sign Up mode or Login mode
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || (formData.role === 'admin' && isSignUp && (!formData.email || !formData.password || !formData.course)) || (formData.role === 'admin' && !isSignUp && (!formData.password || !formData.email)) || (formData.role === 'viewer' && (!formData.rollNo || !formData.code))) {
            setError('All fields are required');
            return;
        }

        setError('');
        console.log('Form Submitted:', formData);

        try {
            if (formData.role === 'admin' && isSignUp) {
                // Admin Sign-Up
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // After successful sign-up, store additional info if needed
                console.log('Admin signed up:', user);

                // After admin sign-up, automatically log them in and navigate to the dashboard
                const loggedInUserCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const loggedInUser = loggedInUserCredential.user;
                console.log('Admin logged in:', loggedInUser);

                navigate('/dashboard'); // Redirect to the dashboard for the admin
            } else if (formData.role === 'admin' && !isSignUp) {
                // Admin Login
                const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                console.log('Admin logged in:', user);
                
                // Redirect to the dashboard for the admin
                navigate('/dashboard');
            } else if (formData.role === 'viewer') {
                // Viewer Login
                navigate('/clientPage'); // Redirect to ClientPage for the viewer
            }
        } catch (err) {
            setError('Authentication failed. Please check your credentials and try again.');
            console.error('Authentication error:', err.message);
        }
    };

    const handleReset = () => {
        setFormData({ role: 'viewer', name: '', rollNo: '', code: '', password: '', course: '', email: '' });
        setError('');
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{formData.role === 'admin' ? (isSignUp ? 'Sign Up' : 'Login') : 'Login'} to Present_IT</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Role:</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    {formData.role === 'admin' && (
                        <>
                            {isSignUp && (
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            )}
                            {isSignUp && (
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Course:</label>
                                <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                            </div>
                        </>
                    )}

                    {formData.role === 'admin' && !isSignUp && (
                        <>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                        </>
                    )}

                    {formData.role === 'viewer' && (
                        <>
                            <div className="form-group">
                                <label>Roll No:</label>
                                <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Alphanumeric Code:</label>
                                <input type="text" name="code" value={formData.code} onChange={handleChange} required pattern="[A-Za-z0-9]+" />
                            </div>
                        </>
                    )}

                    <div className="button-group">
                        {formData.role === 'admin' && isSignUp ? (
                            <button type="submit">Sign Up</button>
                        ) : (
                            <button type="submit">Login</button>
                        )}
                        <button type="button" onClick={handleReset}>Reset</button>
                    </div>
                </form>

                {formData.role === 'admin' && (
                    <p>
                        {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
                        <span onClick={toggleMode} className="toggle-link">
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginScreen;
