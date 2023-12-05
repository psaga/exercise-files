import { useEffect, useState, Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Loading from '../shared/loading/loading'
import { axiosInstance } from '../../utils/axios'
import './style.css'

const Files = ({ searchTerm }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const searchQueryParam = searchTerm ? `?fileName=${searchTerm}` : ''
    axiosInstance(`${process.env.REACT_APP_API_URL}/files/data${searchQueryParam}`)
      .then((response) => {
        const sortedFiles = response.data.sort((f1, f2) => f1.file.localeCompare(f2.file))
        setFiles(sortedFiles)
        setIsLoading(false)
      })
  }, [searchTerm])
  if (isLoading) return
  return (
    <Container className='container'>
      {isLoading
        ? (
          <Loading />
          )
        : (
          <Table striped bordered hover size='sm' className='table'>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Text</th>
                <th>Number</th>
                <th>Hex</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => {
                return (
                  <Fragment key={file.file}>
                    {file.lines.map(line => {
                      return (
                        <tr key={`${file.file}_${line.hex}`}>
                          <td>{file.file}</td>
                          <td>{line.text}</td>
                          <td>{line.number}</td>
                          <td>{line.hex}</td>
                        </tr>
                      )
                    })}
                  </Fragment>
                )
              })}
            </tbody>
          </Table>
          )}
    </Container>
  )
}

export default Files
