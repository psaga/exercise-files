import { useMemo, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import { debounce } from 'lodash'
import './style.css'

const NavBar = ({ onSearchChange }) => {
  const debouncedOnChange = useMemo(() => {
    return debounce(onSearchChange, 500)
  }, [onSearchChange])

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel()
    }
  })
  return (
    <Navbar expand='lg' className='navbar'>
      <Navbar.Brand className='title'>React Test App</Navbar.Brand>
      <Form className='d-flex'>
        <Form.Control
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
          onChange={debouncedOnChange}
        />
      </Form>
    </Navbar>
  )
}

export default NavBar
