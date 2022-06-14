import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import loader from '../assets/loader.gif'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer'

const SetAvatar = () => {
	//Allow user to upload a profile picture to mongoDB through a form submission
	const [avatar, setAvatar] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (avatar) {
            setAvatar(avatar)
			}
	}, [avatar])

	const [avatarError, setAvatarError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [errorText, setErrorText] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

        if (loading) {
            return
        }

        try {
            setLoading(true)
			const { data } = await axios({
				method: 'post',
				url: `${setAvatarRoute}`,
				data: {
					avatar,
					avatarError,
				},
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (data.status === false) {
				setAvatarError(data.message)
				return
			}

			setAvatar(data)
			setAvatarError(null)
			} catch (error) {
				setAvatarError(error.message)
            }
			setLoading(false)
			}
			
	const handleChange = (e) => {
		setAvatar(e.target.value)
        setAvatarError(null)
	}

	return (
		<div>
			<div className="card">
				<div className="header">
					<h3 className="card-title mb-3">Upload Image</h3>
				</div>
				<div className="content">
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="form-group">
							<label htmlFor="avatar">Avatar</label>
							<input type="file" className="form-control form-control-lg" id="avatar" name="avatar" onChange={(e) => handleChange(e)} />
							{avatarError && <div className="alert alert-danger">{avatarError}</div>}
							
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
					{loading && <img src={loader} alt="loader" />}
				</div>
			</div>
		</div>
	)




}

export default SetAvatar