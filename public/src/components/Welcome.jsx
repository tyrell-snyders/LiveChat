import React from 'react'
import {useMediaQuery} from 'react-responsive'
import Robot from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {
    //styles
    const styles = {
        container: `flex flex-col align-items items-center`,
    }
    
  return (
    <div className={styles.container}>
        <img src={Robot} alt="Robot welcome you" />
        <h1>
            Welcome, 
            <span>
                {currentUser.username}
            </span>
        </h1>
    </div>
  )
}

export default Welcome