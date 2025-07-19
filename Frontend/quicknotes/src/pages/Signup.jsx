import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL=import.meta.env.VITE_BASE_URL;
import styles from './Signup.module.scss';

function Signup() {
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const navigate = useNavigate();

    const handlesignup = async () => {
    //console.log(BASE_URL);
    try {
        const resp = await axios.post(`${BASE_URL}user/signup`, {
            name,
            email,
            password,
        });

        if (resp.data.token) {
            localStorage.setItem("token", resp.data.token);
            navigate(`/dashboard`);
        }

        console.log(name);

    } catch (err) {
        console.log(err.message); 
        if (err.response) {
            seterror(err.response.data.message); 
        } else {
            seterror("Signup failed");
        }
    }
};

    

    
    
    return (
    <div>
        <h1
        className={styles.header}
        >Signup Page</h1>
        <div  className={styles.formContainer}>
            <label>Name</label>
        <br/>
        <input
        type='text'
        name='name'
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setname(e.target.value)}
        
        />
    <br/>
            <label>Email</label>
        <br/>
        <input
        type='email'
        name='Enter Email'
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        />
            <br/>

        <label>Password</label>
        <br/>
        <input
        type='text'
        name='Password'
        placeholder="Enter your password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        />
        <br/>

        <button
         className={styles.addButton}
        // className={styles.addButton} 
        onClick={handlesignup}
        >
            Submit
        </button>
        <p
        className={styles.link}
        onClick={()=>{
              navigate(`/login`);
        }}
        >
            Go to Login page
        </p>
        <br></br>
         {error && <div className={styles.error}>{error}</div>}


        </div>
        

        
    </div>
    )
}

export default Signup
