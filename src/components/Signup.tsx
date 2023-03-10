import React, { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'

const LogInForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: SyntheticEvent) => {
e.preventDefault()
await axios.post('http://localhost:3030/api/signup', {username, email, password})
setUsername('')
setEmail('')
setPassword('')
    }
    return (    
    <div>
     <form id='form1' onSubmit={handleSubmit}>
        <label className='text-white'> USERNAME</label>
         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />  
         <br />
         <br />
         <label className='text-white'> EMAIL</label>
         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
         <br />
         <br />
         <label className='text-white'> PASSWORD</label>
         <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
         </form>
         <button  type="submit" form="form1" value="Submit" className='text-white'> Submit </button>
    </div>
    )
}

export default LogInForm