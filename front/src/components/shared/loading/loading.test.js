import { render, screen } from '@testing-library/react'
import { it, expect, describe } from '@jest/globals'
import '@testing-library/jest-dom'
import Loading from './loading'

describe('File Component', () => {
  it('render Loading component', () => {
    render(<Loading />)
    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()

    const visuallyHiddenText = screen.getByText('Loading...')
    expect(visuallyHiddenText).toBeInTheDocument()
    expect(visuallyHiddenText).toHaveClass('visually-hidden')
  })
})
