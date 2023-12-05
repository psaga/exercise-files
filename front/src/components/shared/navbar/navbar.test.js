import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { jest, it, expect, describe } from '@jest/globals'
import '@testing-library/jest-dom'
import Navbar from './navbar'

describe('Navbar Component', () => {
  it('render Navbar component', async () => {
    const handleSearchChange = jest.fn()
    const textToMockSearchInput = 'test'

    render(<Navbar onSearchChange={handleSearchChange} />)
    const navbar = screen.getByRole('navigation')
    expect(navbar).toBeInTheDocument()

    const title = screen.getByText('React Test App')
    expect(title).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Search')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.tagName).toBe('INPUT')

    fireEvent.change(searchInput, { target: { value: textToMockSearchInput } })

    await waitFor(() => {
      expect(handleSearchChange).toHaveBeenCalledTimes(1)
    })
    expect(handleSearchChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: textToMockSearchInput
      })
    }))
  })
})
