import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'

const Logout = () => {
    //styles
    const styles = {
        container: `flex flex-col align-center justify-center`,
        btn: `bg-btn rounded text-white px-4 py-2 font-bold text-base uppercase transition ease-in-out delay 600 hover:bg-btnhov hover:cursor-pointer`
    }

    const navigater = useNavigate()

    //funtions
    const handleClick = async () => {
        localStorage.clear()
        navigater('/register')
    }

    //jsx
    return (
        <div>
            <button onClick={handleClick} className={styles.btn}><BiPowerOff /></button>
        </div>
    )
}

export default Logout