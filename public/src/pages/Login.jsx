import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Logo from '../assets/logo.svg'
import { loginRoute } from '../utils/APIRoutes'
import axios from 'axios'

const Login = () => {
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
		password: "",
	})

	//functions
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (handleValidation()) {
				const { password, username } = values
				//post the data to loginRoute
				const { data } = await axios.post(loginRoute, {
					username,
					password,
				})
				if (data.status === false) {
					toast.error(data.msg, toastOptions)
				} else {
					localStorage.setItem('chat-app-user', JSON.stringify(data.user))
					navigate('/')
				}
			}
		} catch (error) {
			toast.error(error.message, toastOptions)	
		}
	}

	const handleValidation = () => {
		const { password, username } = values;
		if (username === '') {
			toast.error('Username and password is required',
				toastOptions)
			return false
		} else if (password === '') {
			toast.error('Username and password is required',
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
				<form className={styles.frm} onSubmit={(evnt) => handleSubmit(evnt)}>
					<div className={styles.brand}>
						<img src={Logo} alt="Logo" className={styles.logo} />
						<h1 className={styles.title}>OomBabbel</h1>
					</div>
					<input
						className={styles.inp}
						type="text" name="username"
						placeholder='Username'
						min="3"
						onChange={e => handleChange(e)} />
					<input
						className={styles.inp}
						type="password" name="password"
						placeholder='Password'
						onChange={e => handleChange(e)} />
					<button type='submit' className={styles.btn}>Login</button>
					<span className={styles.light}>
						Don't have an account?
						<Link to="/register" className={styles.lnk}> Create Account</Link>
					</span>
				</form>
			</div>
			<ToastContainer />
		</>
	)
}

export default Login