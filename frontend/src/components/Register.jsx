import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 


const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    // Check if the user is logged in and redirect if they are
    const checkIfLoggedIn = () => {
        const isLoggedIn = localStorage.getItem('auth_token'); // Example: check if token exists
        if (isLoggedIn) {
            navigate('/home'); // Redirect to home if logged in
        }
    };

    // Run the check when the component mounts
    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: `url('https://images.hdqwalls.com/download/orange-3d-abstract-4k-nl-3840x2160.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div
                className="rounded-2xl shadow-lg p-5"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    background: '#fff',
                    color: '#000',
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
            >
                <h2 className="text-center mb-4 text-primary">Create an Account</h2>
                {notification && (
                    <div className="alert alert-danger text-center">
                        <strong>{notification}</strong>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="form-control"
                            id="exampleInputName"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Address</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
                </form>
                <p className="text-center mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary fw-bold text-decoration-none">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
