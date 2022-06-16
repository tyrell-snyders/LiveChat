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
		container: `h-5/6 w-5/6 bg-primary grid grid-cols-2 rounded-3xl`
	}

	const navigate = useNavigate()	

	//MediaQuery
	// const isMobile = useMediaQuery({ maxWidth: 390, maxHeight: 840 })

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
				<div 
					className={styles.container}
					style={{backgroundColor: '#00000076'}}
				>
					<Contacts contacts={contacts} currentUser={user} />
				</div>
			</div>
		</>
	)
}

export default Chat