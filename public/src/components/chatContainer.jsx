import React, {useState, useEffect} from 'react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getMsgRoute, sendMsgRoute } from '../utils/APIRoutes'

const ChatContainer = ({currentChat,  currentUser}) => {
    //styles
    const styles = {
        container: `h-full`,
        chat_header: `flex justify-between items-center p-1`,
        user_details: `flex items-center gap-4`,
        avatar: `h-12`,
        username: `text-white`,
        chatInp: `flex flex-col align-center`,
        chat_messages: ``,
        message: ``,
        sended: ``,
        recieved: ``
    }

    //useStates
    const [messages, setMessages] = useState([])

    //useEffects
    useEffect(() => {
        return async () => {
            const res = await axios.post(getMsgRoute, {
                from: currentUser._id,
                to: currentChat._id
            })
            setMessages(res.data)
        }
    }, [currentChat])
    

    //functions
    const handleSendMsg = async (msg) => {
        await axios.post(sendMsgRoute, {
            from:currentUser._id,
            to: currentChat._id,
            message: msg
        })
    }

    //jsx
    return (
        <>
            {currentChat && (
                <div className={styles.container} style={{paddingTop: '1rem'}}>
                    <div className={styles.chat_header}>
                        <div className={styles.user_details}>
                            <div className={styles.avatar}>
                                <img 
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                                    alt="avatar"
                                    style={{height: '3rem'}} 
                                />
                            </div>
                            <div className={styles.username}>
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                    </div>
                        <div className={styles.chat_messages}>
                            {
                                messages.map((message) => {
                                    console.log(message.message)
                                    return (
                    
                                            <div>
                                                <div className={`${styles.message} ${message.fromSelf ? `${styles.sended}`: `${styles.recieved}`}`}>
                                                    <div className={styles.content}>
                                                        <p>
                                                            {message.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
  
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMessage={handleSendMsg} />
                </div>
            )}
        </>
    )
}

export default ChatContainer