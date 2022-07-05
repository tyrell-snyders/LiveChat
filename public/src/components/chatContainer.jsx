import React, {useState, useEffect, useRef} from 'react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getMsgRoute, sendMsgRoute } from '../utils/APIRoutes'
import { useMediaQuery} from 'react-responsive'
import {v4 as uuidv4} from 'uuid'

const ChatContainer = ({currentChat,  currentUser, socket}) => {
    //styles
    const styles = {
        container: `h-full grid overflow-hidden`,
        chat_header: `flex justify-between items-center p-1`,
        user_details: `flex items-center gap-4`,
        avatar: `h-12`,
        username: `text-white`,
        chatInp: `flex flex-col align-center`,
        chat_messages: `py-4 px-8 flex flex-col gap-4 overflow-auto`,
        message: `flex align-center`,
        sended: `justify-end`,
        recieved: ``,
        content: `max-w-2/5 break-words p-4 text-sm rounded-2xl text-white`
    }

    const isMobile = useMediaQuery({ maxWidth: 720})
	const isLandScape = useMediaQuery({minWidth: 721})

    //useStates
    const [messages, setMessages] = useState([])
    const [arrivalMsg, setArrivalMsg] = useState(null)

    //refs
    const scrollRef = useRef()
    
    
    //functions
    const handleSendMsg = async (msg) => {
        await axios.post(sendMsgRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        })
        const msgs = [...messages]
        msgs.push({fromSelf: true, message: msg})
        setMessages(msgs)
    }

    //useEffects
    useEffect(() => {
        if(socket.current) {
            socket.current.on('msg-recieved', (msg) => {
                setArrivalMsg({fromSelf: false, message: msg})
            })
        }
    },[])
    
    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' }) //
    }, [messages])

    useEffect(() => {
        if (currentChat) {
            const getFromSelf = async () => {
                const res = await axios.post(getMsgRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                })
                setMessages(res.data)
            }
            getFromSelf()
        }
    }, [currentChat])

    //jsx
    return (
        <>
            {currentChat && isLandScape && (
                <div className={styles.container} style={{paddingTop: '1rem', gridTemplateRows: '15% 80% 5%', gap: '0.1rem'}}>
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
                                    return (
                    
                                            <div ref={scrollRef}  key={uuidv4()}>
                                                <div className={
                                                    `${styles.message} ${message.fromSelf ? 'justify-end': `${styles.recieved}`}`
                                                }
                                                >
                                                    <div 
                                                        className={styles.content}
                                                        style={message.fromSelf ? {backgroundColor: '#4f04ff21'} : {backgroundColor: '#9900ff20'}}
                                                    >
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
            {currentChat && isMobile && (
                <div className={styles.container} style={{paddingTop: '1rem', gridTemplateRows: '15% 80% 4%', gap: '0.1rem'}}>
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
                                    return (
                    
                                            <div>
                                                <div className={
                                                    `${styles.message} ${message.fromSelf ? `${styles.sended}` : `${styles.recieved}`}`
                                                }
                                                >
                                                    <div 
                                                        className={styles.content}
                                                        style={message.fromSelf ? {backgroundColor: '#4f04ff21'} : {backgroundColor: '#9900ff20'}}
                                                    >
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