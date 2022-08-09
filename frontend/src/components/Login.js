import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();
    const [creds,setCreds] = useState({email:'',password:''});
    const myStyle = {
        'width': '40vw',
        'marginTop': '10vh'
    }
    const handleSubmit = async (event) =>{
            event.preventDefault();
            const response = await fetch("http://localhost:3030/auth/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({email:creds.email, password:creds.password})
            });
            const json = await response.json();
            console.log(json);
            if(json){
                localStorage.setItem('token',json.authtoken);
                navigate('/');
                console.log('Logged In!!!');
                props.showAlert('Logged In Successfully','success')
            }else{
                props.showAlert('Invalid Credentials','danger');
                console.log('Invalid Credentials');
            }
    }
const onChange = (e) =>{
    setCreds({...creds,[e.target.name]:e.target.value});
}
  return (
    <>
        <form className='container' onSubmit={handleSubmit} style={myStyle}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" value={creds.email} name="email" id="exampleInputEmail1" onChange = {onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" value={creds.password} onChange = {onChange} name="password" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    </>
  )
}

export default Login;
