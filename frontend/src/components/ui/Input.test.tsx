import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders without label', () => {
    render(<Input id="name" placeholder="Enter name" />)
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('renders label and associates it to the input', () => {
    render(<Input id="email" label="Email address" />)
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<Input id="email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('applies error border class when error is set', () => {
    render(<Input id="email" error="Bad" />)
    expect(screen.getByRole('textbox').className).toContain('border-red-500')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input id="name" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
