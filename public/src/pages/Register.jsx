import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Logo from '../assets/logo.svg'
import {registerRoute} from '../utils/APIRoutes'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    //styles
    const styles = {
        formContainer: `w-screen h-screen flex flex-col justify-center items-center bg-secondary`,
        brand: `flex flex-col items-center gap-4 justify-center`,
        logo: `h-28 w-28`,
        title: `text-white uppercase`,
        frm: `flex flex-col gap-8 bg-primary rounded-lg pl-20 pr-20 py-12 `,
        inp: `p-4 border-solid border-4 border-inpu rounded-lg w-full text-base focus:outline-none focus:border-inpufoc`,
        btn: `bg-btn text-white px-8 py-4 font-bold text-base uppercase transition ease-in-out delay 600 hover:bg-btnhov hover:cursor-pointer`,
        q: `text-white`,
        lnk: `text-pinkorpurple font-bold no-underline`
    };


    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    } //the options for the toastify obj

    useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/') //if user already logged in before on the same device, redirect to chat page
		}
	}, [])
    
    //useState
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    })

    //functions
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const { password, username, email } = values
            //post the data to registerRoute
            const {data} =  await axios.post(registerRoute, {
                username,
                email,
                password
            })    
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            } else {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPass, username, email } = values;
        if (confirmPass !== password) {
            toast.error('Password and Confirm Password must be the same',
            toastOptions)
            return false
        } else if (username.length < 3) {
            toast.error('Username must be at least 3 characters',
            toastOptions)
            return false
        } else if (password.length < 8) {
            toast.error('Password must be at least 8 or more characters',
            toastOptions)
            return false
        } else if (email === '') {
            toast.error('Please enter a valid email address', 
            toastOptions)
            return false
        }
        return true
    }

    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value })
    } //assigning the values to the input fields

    //jsx 
    return (
        <>
            <div className={styles.formContainer}>
                    <form className={styles.frm} onSubmit={ (evnt) => handleSubmit(evnt)}>
                        <div className={styles.brand}>
                            <img src={Logo} alt="Logo" className={styles.logo} />
                            <h1 className={styles.title}>OomBabbel</h1>
                        </div>
                        <input
                            className={styles.inp}
                            type="text" name="username"
                            placeholder='Username'
                            onChange={e => handleChange(e)} />
                        <input
                            className={styles.inp}
                            type="email" name="email"
                            placeholder='Email'
                            onChange={e => handleChange(e)} />
                        <input
                            className={styles.inp}
                            type="password" name="password"
                            placeholder='Password'
                            onChange={e => handleChange(e)} />
                        <input
                            className={styles.inp}
                            type="password" name="confirmPass"
                            placeholder='Confirm Password'
                            onChange={e => handleChange(e)} />
                        <button type='submit'  className={styles.btn}>Create Account</button>
                        <span className={styles.light}>
                            Already have an account?
                            <Link to="/login" className={styles.lnk}> Login</Link>
                        </span>
                    </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register