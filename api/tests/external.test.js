import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { getFiles, getFileContent } from '../services/external.js'
import { axiosInstance } from '../utils/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { formatFile } from '../services/file.js'

const mock = new MockAdapter(axiosInstance)

describe('Test for external service', () => {
  beforeEach(() => {
    mock.reset()
  })

  it('should get files succesfully', async () => {
    const filesMocked = [
      'test1.csv',
      'test2.csv',
      'test3.csv'
    ]
    mock.onGet('secret/files').reply(200, { files: filesMocked })
    const { files } = await getFiles()

    expect(files).to.deep.equal(filesMocked)
  })

  it('should throw error when fails fetching files', async () => {
    const statusCode = 500
    try {
      mock.onGet('secret/files').reply(statusCode)
      await getFiles()
    } catch (err) {
      expect(err.response.status).to.be.equal(statusCode)
    }
  })

  it('should get lines from file and format them properly', async () => {
    const fileNameMocked = 'test1.csv'
    const linesMocked = `file,text,number,hex
    test3.csv,TlrGC
    test3.csv,dFhQcLAcWNSOExyIBRknqvhhK,32435,62b332cbf513f6458a6aff5304884710
    test3.csv,NhaJvX,87,eb882bcbc91f3aa3106117454d96455d
    test3.csv,EoOaPBDyIqcetAw,2924678,de647393bd0386ce0fe428f9ef63f1df`

    const fileFormatedMocked = {
      file: fileNameMocked,
      lines: [
        {
          text: 'dFhQcLAcWNSOExyIBRknqvhhK',
          number: 32435,
          hex: '62b332cbf513f6458a6aff5304884710'
        },
        {
          text: 'NhaJvX',
          number: 87,
          hex: 'eb882bcbc91f3aa3106117454d96455d'
        },
        {
          text: 'EoOaPBDyIqcetAw',
          number: 2924678,
          hex: 'de647393bd0386ce0fe428f9ef63f1df'
        }
      ]
    }
    mock.onGet(`secret/file/${fileNameMocked}`).reply(200, linesMocked)

    const fileContent = await getFileContent(fileNameMocked)

    const formatedFile = formatFile(fileNameMocked, fileContent)
    expect(formatedFile).to.be.deep.equal(fileFormatedMocked)
  })

  it('Skip a file in case of an error while retrieving its lines', async () => {
    const fileNameMocked = 'test1.csv'
    const linesMocked = `file,text,number,hex
    test3.csv,TlrGC
    test3.csv,dFhQcLAcWNSOExyIBRknqvhhK,32435,62b332cbf513f6458a6aff5304884710
    test3.csv,NhaJvX,87,eb882bcbc91f3aa3106117454d96455d
    test3.csv,EoOaPBDyIqcetAw,2924678,de647393bd0386ce0fe428f9ef63f1df`

    mock.onGet(`secret/file/${fileNameMocked}`).reply(404, linesMocked)

    const fileContent = await getFileContent(fileNameMocked)
    expect(fileContent).to.be.equal(null)
  })
})
