import React from 'react'
import { useMdeiaQuery} from 'react-responsive'

const Chat = () => {
	const styles= {
		screen: `h-screen w-screen flex flex-col 
					justify-center items-center bg-primary`,
		container: `h-5/6 w-5/6 bg-primary grid grid-cols-2`
	}
	const isMobile = useMediaQuery({ maxWidth: 390, maxHeight: 840 })
	return (
		<>
			<div className={styles.screen}>
				<div 
					className={styles.container}
					style={{backgroundColor: '#00000076'}}
				>
					Chat
				</div>
			</div>
		</>
	)
}

export default Chat