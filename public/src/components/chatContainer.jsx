import React from 'react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { sendMsgRoute } from '../utils/APIRoutes'

const ChatContainer = ({currentChat,  currentUser}) => {
    //styles
    const styles = {
        container: `h-full`,
        chat_header: `flex justify-between items-center p-1`,
        user_details: `flex items-center gap-4`,
        avatar: `h-12`,
        username: `text-white`,
        chatInp: `flex flex-col align-center`
    }

    //functions
    const handleSendMsg = async (msg) => {
        await axios.post(sendMsgRoute, {
            from:currentUser._id,
            to: currentChat._id,
            message: msg
        })
    }

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
                        <Messages />
                        <ChatInput handleSendMessage={handleSendMsg} />
                </div>
            )}
        </>
    )
}

export default ChatContainer