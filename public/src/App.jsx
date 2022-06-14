import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'

const App = () => {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="/register" element={<Register />} /> {/*Creates a route to register*/}
			<Route path="/login" element={<Login />} /> {/*Creates a route to login*/}
			<Route path="/" element={<Chat />} /> {/*Creates a route to chat*/}
			<Route path="/setAvatar" element={<SetAvatar />} /> {/*Creates a route to set avatar*/}
		</Routes>
	</BrowserRouter>
  )
}

export default App