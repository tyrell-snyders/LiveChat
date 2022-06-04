import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

const Register = () => {
    const FormContainer = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        background-color: #131324;
        .brand {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
            img {
                height: 5rem;
            }
            h1 {
                color: white;
                text-tranform: uppercase;
            }
            
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            background-color: #00000076;
            border-radius: 2rem;
            padding: 3rem 5rem;
            input {
                background-color: transparent;
                padding: 1rem;
                border: 0.1rem solid #4e0eFF;
                border-radius: 0.4rem;
                color: white;
                width: 100%;
                font-size: 1rem;
                &:focus {
                    border: 0.1rem solid #997af0;
                    outline: none;
                }
            }
            button {
                background-color: #4e0eFF;
                color: white;
                padding: 1rem 2rem;
                border: none;
                font-weight: bold;
                border-radius: 0.4rem;
                font-size: 1rem;
                text-transform: uppercase;
                transition: all 0.6s ease-in-out;
                &:hover {
                    cursor: pointer;
                    background-color: #997af0;
                }
            }
            span {
                color: white;
                a {
                    color: #4e0eFF;
                    font-weight: bold;
                    text-decoration: none;
                }
            }
        }
    `;

    //functions
    const handleSubmit = (e) => {
        e.preventDeufault()
        alert('form')
    }

    const handleChange = (ev) => {

    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(evnt) => handleSubmit(evnt)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>OompieChat</h1>
                    </div>
                    <input
                        type="text" name="username"
                        placeholder='Username'
                        onChange={e => handleChange} />

                    <input
                        type="email" name="email"
                        placeholder='Email'
                        onChange={e => handleChange} />

                    <input
                        type="password" name="password"
                        placeholder='Password'
                        onChange={e => handleChange} />

                    <input
                        type="password" name="confirmPass"
                        placeholder='Confirm Password'
                        onChange={e => handleChange} />

                    <button type='submit'>Create Account</button>
                    <span>
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </span>
                </form>
            </FormContainer>
        </>
    )
}

export default Register