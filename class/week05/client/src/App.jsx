import { useState, useEffect, use } from "react";

const App = () => {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  
  //make a fetch function
  const fetchDate = async() => {
    try {
      const response = await fetch(`http://localhost:8000/data`)
      const data = await response.json();
      setMessage(JSON.stringify(data))
      console.log(data)
    } catch (error) {
        console.log(data)
    }
  }

  const loginForm = async(e) => {
    e.preventDefault()
    const submission = {email, password}
    try{
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submission)
      })
      const data = await response.json()
      setMessage(JSON.stringify(data))
    }catch (error){
      console.log(error)
    }
  }

  //webform for file upload
  const fileUpload = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file)
    try{
      const response = await fetch(`http://localhost:8000/fileForm`, {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      setMessage(JSON.stringify(data))
    }catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      {message}
      <button onClick={fetchDate}>Click me for data</button>
      <form
        onSubmit={loginForm}
      >
        <input 
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          required
        />
        <input 
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          required
        />
        <button type="submit" >Login</button>
      </form>
      <form onSubmit={fileUpload}>
        <input 
          type="file"
          multiple //allows upload multiple files
          onChange={(e) => {setFile(e.target.value)}}
        />
        <button type="submit">Upload file</button>
      </form>

    </div>
  )
}

export default App;