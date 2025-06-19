import { useState } from "react";
import "./Login.css"


function Login(){
    return<><div className="login">
    <form action="submit" className="form">
        <label className="field">Username: <input type="text" name="username" id="username"/></label>
        <br />
        <label className="field">Password: <input type="password" name="password" id="password" /></label>
        <br />
        <button className="submit-btn">Login</button>
        
    </form>
</div></>
    
}

export default Login;