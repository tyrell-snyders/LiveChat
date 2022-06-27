import React, {useEffect, useState} from 'react'
import Logo from '../assets/logo.svg'
import { getUserAvatar } from '../utils/APIRoutes'
import axios from 'axios'
import {useMediaQuery} from 'react-responsive'
import '../styles/tailwind.css'
import Logout from './Logout'

const Contacts = ({ contacts, currentUser, changeChat }) => {
	//styles
	const styles = {
		container: `grid grid-row-3 overflow-hidden`,
		avatar: `mt-4 grow-0`,
		brand: `flex align-center justify-center`,
		user: `text-white `,
		title: `text-white uppercase`,
		contacts: `flex flex-col align-center overflow-auto gap-3`,
		username: `text-white mt-7 grow-0`,
		contact: 'rounded bg-primary cursor-pointer transition ease-in-out delay-50',
		con: `rounded align-center flex`,
		selected: `bg-btn`,
		currentuser: `bg-user justify-center align-center flex flex-col gap-8`,
		mobileUser: `bg-user justify-center align-center flex flex-col gap-2 text-xs`
	}

	//MediaQueries
	const isMobile = useMediaQuery({ maxWidth: 720})
	const isLandScape = useMediaQuery({minWidth: 721})

	//states
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentSelected, setCurrentSelected] = useState(undefined)

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
		setCurrentSelected(index)
		changeChat(contact)
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
							<div className={styles.contacts}>
								{
									contacts.map((contact, index) => {
										return (
											<>
											<div 
												className={
													`${styles.contact} ${index === currentSelected ? `${styles.selected}` : ''}`
												} 
												key={index}
												style={{marginLeft: '10px', marginRight: '10px', marginBottom: '20px'}}
												onClick={() => changeCurrentChat(index, contact)}
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
							<div className={styles.currentuser}  style={{paddingLeft: '10px'}}>
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
								<div className={styles.logout}>
									<Logout />
								</div>
							</div>
						}
						{
							isMobile &&
							<div className={styles.mobileUser} style={{paddingLeft: '10px'}}>
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
								<div className={styles.logout}>
									<Logout />
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