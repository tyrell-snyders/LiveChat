import React from 'react'

const chatContainer = ({currentChat}) => {
    const styles = {
        container: ``,
        chat_header: `flex justify-between items-center p-1`,
        user_details: `flex items-center gap-4`,
        avatar: `h-12`,
        username: `text-white`
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

                <div className={styles.msg}>
    
                </div>
                <div className={styles.inp}>
    
                </div>
            </div>
        )}
    </>
  )
}

export default chatContainer