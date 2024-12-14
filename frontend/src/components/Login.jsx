import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import usePreventBackNavigation from "./nav";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();
    usePreventBackNavigation();
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data.message === "Login successful") {
                    // Store the user token and role in localStorage
                    localStorage.setItem('userToken', result.data.user.id); // Save user ID or token
                    localStorage.setItem('userRole', result.data.user.role); // Save user role
                    localStorage.setItem('userName', result.data.user.name); // Save user name

                    setNotification({
                        type: 'success',
                        message: 'Login successful!'
                    });

                    // Manipulate history to prevent back navigation
                    window.history.replaceState(null, '', '/home'); // Replace current state with home route
                    
                    // Redirect user based on role
                    setTimeout(() => {
                        if (result.data.user.role === 'admin') {
                            // Admin is redirected to admin dashboard
                            navigate('/Home');
                        } else {
                            // Regular users are redirected to the home page
                            navigate('/Home');
                        }
                    }, 2000); 
                } else if (result.data.message === "Wrong password") {
                    setNotification({
                        type: 'error',
                        message: 'Incorrect password! Please try again.'
                    });
                } else {
                    setNotification({
                        type: 'error',
                        message: 'No records found for this email.'
                    });
                }
            })
            .catch(err => {
                setNotification({
                    type: 'error',
                    message: 'An error occurred. Please try again.'
                });
            });
    };

    return (
        <div
            className="d-flex vh-100"
            style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}
        >
            {/* Left Side - Image */}
            <div
                className="d-none d-md-block w-50"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1634148739177-775032f3feb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHNpbXBsZXxlbnwwfHwwfHx8MA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
            </div>
            
            {/* Right Side - Form */}
            <div className="d-flex justify-content-center align-items-center w-100 w-md-50 bg-white">
                <div className="p-4 rounded shadow-sm" style={{ width: '80%', maxWidth: '400px' }}>
                    <h2 className="mb-3 text-primary text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>

                    <p className="text-center my-2">Don't have an account?</p>
                    <Link to="/register" className="btn btn-secondary w-100">Register</Link>

                    {/* Notification card */}
                    {notification && (
                        <div className={`mt-3 p-3 rounded ${notification.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                            <strong>{notification.type === 'success' ? 'Success' : 'Error'}</strong>
                            <p>{notification.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
