import './Signup.css'



function Signup() {
  return (
    <>
      <div className="signup">
        <form className="form" id="signup">
          <h2>Sign Up</h2>

          <div className="adjacent">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="userName">User Name</label>
            <input type="text" name="userName" id="userName" />
          </div>

          <div className="adjacent">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <div className="field">
            <label htmlFor="cnfpass">Confirm Password</label>
            <input type="password" name="cnfpass" id="cnfpass" />
          </div>
    
          <button  className='submit-button'  type="submit">Let's Go</button>
          
        </form>
      </div>
    </>
  );
}

export default Signup;
