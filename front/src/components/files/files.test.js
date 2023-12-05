import { render, screen, act, within } from '@testing-library/react'
import { it, expect, beforeEach, describe } from '@jest/globals'
import { axiosInstance } from '../../utils/axios'
import '@testing-library/jest-dom'
import MockAdapter from 'axios-mock-adapter'
import Files from './files'

const mock = new MockAdapter(axiosInstance, { onNoMatch: 'throwException' })

describe('File Component', () => {
  beforeEach(() => {
    mock.reset()
  })

  it('render Files component', async () => {
    const searchQueryParam = ''
    const fakeData = [
      {
        file: 'example.txt',
        lines: [
          { text: 'Line 1', number: 1, hex: '0x01' },
          { text: 'Line 2', number: 2, hex: '0x02' }
        ]
      }
    ]
    mock.onGet(`${process.env.REACT_APP_API_URL}/files/data${searchQueryParam}`).reply(200, fakeData)

    await act(async () => render(<Files searchTerm={searchQueryParam} />))
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()

    const fileNameCells = within(table).getAllByText('example.txt')
    expect(fileNameCells.length).toBe(2)

    expect(fileNameCells[0].tagName).toBe('TD')
    expect(fileNameCells[1].tagName).toBe('TD')

    const lineNameCell = within(table).getByText('Line 1')
    expect(lineNameCell).toBeInTheDocument()

    expect(lineNameCell.tagName).toBe('TD')

    const lineNumberCell = within(table).getByText('1')
    expect(lineNumberCell).toBeInTheDocument()

    expect(lineNumberCell.tagName).toBe('TD')

    const lineHexCell = within(table).getByText('0x01')
    expect(lineHexCell).toBeInTheDocument()

    expect(lineHexCell.tagName).toBe('TD')
  })
})
