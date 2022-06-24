import React, {useState, useEffect} from 'react'
import { useMediaQuery} from 'react-responsive'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { allUserRoute } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'

const Chat = () => {
	//styles
	const styles= {
		screen: `h-screen w-screen flex flex-col 
					justify-center items-center bg-primary`,
		container: `h-screen w-screen bg-primary grid grid-rows-1 grid-flow-col`,
		Cont: `row-span-2`,
		chat: `row-span-1`
	}

	const navigate = useNavigate()	

	const isMobile = useMediaQuery({ maxWidth: 720})
	const isLandScape = useMediaQuery({minWidth: 721})

	//Use States
	const [contacts, setContacts] = useState([])
	const [currentUser, setCurrentUser] = useState(undefined)
	const [user, setUser] = useState(undefined)

	//UseEffect
	useEffect(() => {
		const isUserLogged = async () => {
			if (!localStorage.getItem('chat-app-user')) {
				navigate('/login')
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
			}
		}
		isUserLogged()
	}, [])


	useEffect(() => {
		const getContacts = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) { //check if the current user set their avatar image
					const data = await axios.get(`${allUserRoute}/${currentUser._id}`) //get all users except the current user
					setContacts(data.data)
					setUser(currentUser)
					
				} else {
					navigate('/setAvatar')
				}
			}
		}
		getContacts()
	},[currentUser]) //if there is a current user call the api

	
	//jsx
	return (
		<>
			<div className={styles.screen}>
				{isMobile && 
					<>
						<div 
							className={styles.container}
							style={{backgroundColor: '#00000076', gridTemplateColumns: '40% 60%'}}
						>
							<Contacts contacts={contacts} currentUser={user} className={styles.Cont} />
							<div className={styles.chat}>Hello</div>
						</div>
					</>
					
				}  
				{
					isLandScape &&
					<>
						<div 
							className={styles.container}
							style={{backgroundColor: '#00000076', gridTemplateColumns: '25% 75%'}}
						>
							<Contacts contacts={contacts} currentUser={user} className={styles.Cont} />
							<div className={styles.chat}>Hello</div>
						</div>
					</>
				}
			</div>
		</>
	)
}

export default Chat