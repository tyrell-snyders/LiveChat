import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import loader from '../assets/loader.gif'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer'

const SetAvatar = () => {
	// styles
	const styles = {
		container: `flex flex-col items-center justify-center h-screen w-screen bg-primary text-white gap-12`,
		titleContainer: `text-white mb-4`,
		avatars: `flex flex-row gap-8`,
		avatar: `border-8 mt-4 
					border-solid border-transparent grow-0 flex rounded-lg 
					justify-center items-center`,
		loader: ``,
		selected: `border-solid border-pinkorpurple border-8`,
		btnSumbit: `rounded-3xl bg-btn text-white px-8 py-4 font-bold text-base uppercase transition ease-in-out delay 600 hover:bg-btnhov hover:cursor-pointer`,
	}

	//api
	const api = 'https://api.multiavatar.com/57676634'
	const key = 'eEkbz0lOiwhrcT'

	//navigate
	const navigate = useNavigate()

	//states
	const [avatars, setAvatars] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [selectedAvatar, setSelectedAvatar] = useState(undefined)

	//toast options
	const toastOptions = {
		position: "top-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	}

	//ProfilePic
	const setProfilePic = async () => {
		if(selectedAvatar === undefined) {
			toast.error('Please select an avatar', toastOptions)
		} else {
			const user = await JSON.parse(localStorage.getItem('chat-app-user'))
			const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
				image:avatars[selectedAvatar]
			})
			if (data.isSet) {
				user.isAvatarImageSet = true
				user.avatarImage = data.image
				localStorage.setItem('chat-app-user', JSON.stringify(user))
				navigate('/')
			} else {
				toast.error('Error setting avatar. Please try again later', toastOptions)
			}
		}
	}

	//useEffects
	useEffect(() => {
		const data = []
		const getImage = async () => {
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 50)}?apikey=${key}`
				)
				const buffer = new Buffer(image.data)
				data.push(buffer.toString("base64"))
			}
			setAvatars(data)
			setIsLoading(false)
		}
		getImage()
	}, [])

	useEffect(() => {
		if(!localStorage.getItem('chat-app-user')) {
			navigate('/login')
		}
	}, [])

	//jsx
	return (
		<>
			{
				isLoading ? 
				<div className={styles.container}>
					<img src={loader} alt="Loading..." className={styles.loader} />
				</div> 
				: 
				(
					<>
						<div className={styles.container}>
							<div className={styles.titleContainer}>
								<h1>
									Pick an avatar as your profile picture
								</h1>
							</div>
							<div className={styles.avatars}>
								{
									avatars.map((avatar, index) => {
										return (
											<div
												className={`${styles.avatar} ${selectedAvatar === index ? `${styles.selected}` : ''}`}
												key={index}
												style={{padding: 3, marginTop: 30, margin: 10, borderRadius: 50}}
											>
												<img
													src={`data:image/svg+xml;base64,${avatar}`}
													alt="avatar"
													onClick={() => {
															setSelectedAvatar(index)
														}
													}
													style={{ height: 45}}
													className={styles.ima}
												/>
											</div>
										)
									})
								}
							</div>
							<button 
								className={styles.btnSumbit} 
								onClick={setProfilePic}
							>
								Set as profile picture
							</button>
						</div>
						<ToastContainer />
					</>
				)
			}
			
		</>
	)
}

export default SetAvatar