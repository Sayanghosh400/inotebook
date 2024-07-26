import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credential, setCredential] = useState({name: "", email: "", password: "", cpassword: ""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://mynotebbokbackend.onrender.com/api/auth/createuser';
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account Created Successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("User Already Exists", "danger");
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className={`container my-3 bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label my-3">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange}aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
