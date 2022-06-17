import React, {useEffect, useState} from 'react'
import Logo from '../assets/logo.svg'
import {useNavigate} from 'react-router-dom'
import { getUserAvatar } from '../utils/APIRoutes'
import axios from 'axios'

const Contacts = ({ contacts, currentUser }) => {
	//styles
	const styles = {
		container: `grid grid-cols-3 overflow-hidden rounded-3xl`,
		contact: ``,
		avatar: `mt-4 grow-0 w-8`,
		brand: `flex flex-col align-center justify-center`,
		user: `text-white`,
		title: `text-white uppercase`,
		contacts: `flex flex-col align-center overflow-auto gap-3`,
		contact: ``
	}

	//states
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined)

	//useEffects
	useEffect(() => {
		const setUser = async () => {
			if (currentUser) {
				const userImage = await axios.get(`${getUserAvatar}/${currentUser._id}`)
				setCurrentUserImage(userImage.data.avatarImage)
				setCurrentUserName(currentUser.username)
			}
		}
		setUser()
	}, [currentUser])

	//functions
	const changeCurrentChat = (index, contact) => {

	}
	
	//jsx
	return (
		<>
			{
				currentUserImage && currentUserName && (
					<div className={styles.container}
						style={{backgroundColor: '#080420', overflow: 'hidden'}}
					>
						<div className={styles.brand}>
							<img src={Logo} alt="Logo" />
							<h3  className={styles.title}>OomBabbel</h3>
						</div>
						<div className={styles.contacts}>
							{
								contacts.map((contact, index) => {
									<div 
										className={
											`
												${styles.contact}
											 	${index === currentSelectedUser ? `${selected}` : ""}
											`
										} 
										key={index}
										style={{ backgroundColor: '#ffffff39'}}
									>
										<div className={styles.avatar}>
											<img 
												src={`data:image/svg+xml;base64,${contact.avatarImage}`}
												alt="avatar" 
		
											/>
										</div>
										<div className={styles.username}>
											<h3>{contact.username}</h3>
										</div>
									</div>
								})
							}
						</div>
						<div className={styles.currentuser}>
							<div className={styles.avatar}>
								<img 
									src={`data:image/svg+xml;base64,${currentUserImage}`}
									alt="avatar" 
								/>
							</div>
							<div className={styles.username}>
								<h2 className={styles.user}>{currentUserName}</h2>
							</div>
						</div>
					</div> 
				)
			}
		</>
	)
}

export default Contacts