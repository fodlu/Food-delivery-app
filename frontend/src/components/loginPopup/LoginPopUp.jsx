import { useContext, useState } from 'react'
import './loginPopUp.css'
import { assets } from '../../assets/assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState('Sign Up')
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {url, setToken, token} = useContext(StoreContext)

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value

        setData({...data, [name]: value})
    }

    const onLogin = async(e) => {
        e.preventDefault();
        let newUrl = url;

        if(currentState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/sign-up'
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currentState === 'Login' ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name...' required />}
                <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />

                <button type='submit'>{currentState === "Sign Up" ? 'Create Account' : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing, I agree to the terms and condition of use and privacy policy.</p>
                </div>
            </div>
            {currentState === 'Login' ?
            <p>Create a new account? <span onClick={()=> setCurrentState("Sign Up")}>Click here</span></p>
            :
            <p>Already have an account? <span onClick={()=> setCurrentState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp
