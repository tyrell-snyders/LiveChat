import React, {useEffect, useState} from 'react'
import Logo from '../assets/logo.svg'
import {useNavigate} from 'react-router-dom'
import { getUserAvatar } from '../utils/APIRoutes'
import axios from 'axios'
import {useMediaQuery} from 'react-responsive'
import '../styles/tailwind.css'

const Contacts = ({ contacts, currentUser }) => {
	//styles
	const styles = {
		container: `grid grid-row-3 overflow-hidden`,
		avatar: `mt-4 grow-0`,
		brand: `flex align-center justify-center`,
		user: `text-white `,
		title: `text-white uppercase`,
		contacts: `flex flex-col align-center overflow-auto gap-3`,
		username: `text-white mt-7 grow-0`,
		contact: 'rounded cursor-pointer transition ease-in-out delay-150',
		con: `rounded align-center flex`,
		selected: `bg-sel`,
		currentuser: `bg-user justify-center align-center flex gap-8`,
		mobileUser: `bg-user justify-center align-center flex gap-2 text-xs`
	}

	//MediaQueries
	const isMobile = useMediaQuery({ maxWidth: 720})
	const isLandScape = useMediaQuery({minWidth: 721})

	//states
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined)

	//useEffects
	useEffect(() => {
		const setUser = async () => {
			console.log(contacts)
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
	11
	//jsx
	return (
		<>
			{
				currentUserImage && currentUserName && (
					<div className={styles.container}
						style={{backgroundColor: '#080420', overflow: 'hidden'}}
					>
						<div className={styles.brand} style={{alignItems: 'center'}}>
							<img src={Logo} alt="Logo" style={{width: '45px'}} />
							<h3  className={styles.title}
								style={{marginLeft: '20px'}}
							>OomBabbel</h3>
						</div>
						<div className={styles.contacts} >
							{
								contacts.map((contact, index) => {
									return (
										<>
										<div 
											className={
												`${styles.contact} ${index === currentSelectedUser ? `${selected}` : ''}`
											} 
											key={index}
											style={{marginLeft: '10px', marginRight: '10px', marginBottom: '20px',  backgroundColor: '#ffffff39'}}
											
										>
											<div className={styles.con} >
												<div className={styles.avatar}>
													<img 
														src={`data:image/svg+xml;base64,${contact.avatarImage}`}
														alt="avatar" 
														style={{width: '50px', margin:'5px'}}
													/>
												</div>
												<div className={styles.username} style={{marginLeft: '10px', marginRight: '10px'}}>
													<h3>{contact.username}</h3>
												</div>
											</div>
										</div>
									</>
									)
								})
							}
							{
								contacts.map((contact, index) => {
									return (
										<>
										<div 
											className={
												`${styles.contact} ${index === currentSelectedUser ? `${selected}` : ''}`
											} 
											key={index}
											style={{marginLeft: '10px', marginRight: '10px', marginBottom: '20px',  backgroundColor: '#ffffff39'}}
											
										>
											<div className={styles.con} >
												<div className={styles.avatar}>
													<img 
														src={`data:image/svg+xml;base64,${contact.avatarImage}`}
														alt="avatar" 
														style={{width: '50px', margin:'5px'}}
													/>
												</div>
												<div className={styles.username} style={{marginLeft: '10px', marginRight: '10px'}}>
													<h3>{contact.username}</h3>
												</div>
											</div>
										</div>
									</>
									)
								})
							}
							{
								contacts.map((contact, index) => {
									return (
										<>
										<div 
											className={
												`${styles.contact} ${index === currentSelectedUser ? `${selected}` : ''}`
											} 
											key={index}
											style={{marginLeft: '10px', marginRight: '10px', marginBottom: '20px',  backgroundColor: '#ffffff39'}}
											
										>
											<div className={styles.con} >
												<div className={styles.avatar}>
													<img 
														src={`data:image/svg+xml;base64,${contact.avatarImage}`}
														alt="avatar" 
														style={{width: '50px', margin:'5px'}}
													/>
												</div>
												<div className={styles.username} style={{marginLeft: '10px', marginRight: '10px'}}>
													<h3>{contact.username}</h3>
												</div>
											</div>
										</div>
									</>
									)
								})
							}{
								contacts.map((contact, index) => {
									return (
										<>
										<div 
											className={
												`${styles.contact} ${index === currentSelectedUser ? `${selected}` : ''}`
											} 
											key={index}
											style={{marginLeft: '10px', marginRight: '10px', marginBottom: '20px',  backgroundColor: '#ffffff39'}}
											
										>
											<div className={styles.con} >
												<div className={styles.avatar}>
													<img 
														src={`data:image/svg+xml;base64,${contact.avatarImage}`}
														alt="avatar" 
														style={{width: '50px', margin:'5px'}}
													/>
												</div>
												<div className={styles.username} style={{marginLeft: '10px', marginRight: '10px'}}>
													<h3>{contact.username}</h3>
												</div>
											</div>
										</div>
									</>
									)
								})
							}	
						</div>
						{
							isLandScape &&
							<div className={styles.currentuser}>
								<div className={styles.avatar}>
									<img 
										src={`data:image/svg+xml;base64,${currentUserImage}`}
										alt="avatar" 
										style={{width: '4rem', maxInlineSize: '100%'}}
									/>
								</div>
								<div className={styles.username}>
									<h2 className={styles.user}>{currentUserName}</h2>
								</div>
							</div>
						}
						{
							isMobile &&
							<div className={styles.mobileUser}>
							<div className={styles.avatar}>
								<img 
									src={`data:image/svg+xml;base64,${currentUserImage}`}
									alt="avatar" 
									style={{width: '4rem', maxInlineSize: '100%'}}
								/>
							</div>
							<div className={styles.username}>
								<h2 className={styles.user}>{currentUserName}</h2>
							</div>
						</div>
						}
					</div> 
				)
			}
		</>
	)
}

export default Contacts