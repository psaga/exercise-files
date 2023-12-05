import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatFile } from '../services/file.js'

describe('Test for file service', () => {
  it('should format csv', async () => {
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
    const formatedFile = formatFile(fileNameMocked, linesMocked)
    expect(formatedFile).to.deep.equal(fileFormatedMocked)
  })

  it('Should consolidate an empty array for lines when lines is null', async () => {
    const fileNameMocked = 'test1.csv'
    const linesMocked = null

    const fileFormatedMocked = {
      file: fileNameMocked,
      lines: []
    }

    const formatedFile = formatFile(fileNameMocked, linesMocked)
    expect(formatedFile).to.be.deep.equal(fileFormatedMocked)
  })

  it('Should consolidate an empty array for lines when lines is an empty array', async () => {
    const fileNameMocked = 'test1.csv'
    const linesMocked = []

    const fileFormatedMocked = {
      file: fileNameMocked,
      lines: []
    }

    const formatedFile = formatFile(fileNameMocked, linesMocked)
    expect(formatedFile).to.be.deep.equal(fileFormatedMocked)
  })
})
