import React, {useState, useEffect} from 'react'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

const ChatInput = ({handleSendMessage}) => {
    //styles
    const styles = {
        container: `grid align-center justify-center px-8 pb-1`,
        btnCont: `align-center flex cursor-pointer text-3xl`,
        emoji: `absolute text-2xl`,
        inputCont: `w-full flex align-center gap-8 rounded-3xl`,
        submit: `flex py-2 px-8 rounded-3xl justif-center align-center border-none text-lg text-white`,
        inp: `text-white focus:outline-none`
    }

    //useStates
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')

    //handlers
    const handleEmojiPickerHS = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event, emoji) => {
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }

    //function
    const sendChat = (evnt) => {
        evnt.preventDefault()
        if (msg.length > 0) {
            handleSendMessage(msg)
            setMsg('')
        }
    }


    //jsx
    return (
        <div className={styles.container}  style={{gridTemplateColumns: '5% 95%', backgroundColor: '#080420'}}>
            <div className={styles.btnCont} style={{ gap: '2rem'}}>
                <div className={styles.emoji} style={{color: '#ffff00c8', fontSize: '1.5rem', paddingTop: '0.35rem'}}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHS} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className={styles.inputCont} onSubmit={(e) => sendChat(e)} style={{backgroundColor: '#ffffff34'}}>
                <input type="text" placeholder="Enter Message" 
                    style={{
                        width: '90%', 
                        backgroundColor: 'transparent',
                        paddingLeft: '1rem',
                        fontSize: '1.2rem'
                    }} 
                    className={styles.inp}
                    value={msg}
                    onChange={(e) => {setMsg(e.target.value)}}
                />
                <button type="submit" className={styles.submit} style={{backgroundColor: '#9a86f3'}}><IoMdSend /></button>
            </form>
        </div>
    )
}

export default ChatInput