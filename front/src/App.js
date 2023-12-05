import { useState } from 'react'
import NavBar from './components/shared/navbar/navbar'
import Files from './components/files/files'
import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className='app' role='main'>
      <NavBar onSearchChange={handleSearchChange} />
      <Files searchTerm={searchTerm} />
    </div>
  )
}

export default App
