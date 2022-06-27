import React from 'react'
import {useMediaQuery} from 'react-responsive'
import Robot from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {
    //styles
    const styles = {
        container: `flex flex-col align-items items-center`,
        wel: `text-white`
    }
    
  return (
    <div className={styles.container}>
        <img src={Robot} alt="Robot welcome you" />
        <h1 className={styles.wel}>
            Welcome, <span style={{color: '#4e00ff'}}>{currentUser.username}</span>
        </h1>
    </div>
  )
}

export default Welcome