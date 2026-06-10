import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Go</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('is disabled and does not fire onClick when loading', () => {
    const handler = vi.fn()
    render(<Button loading onClick={handler}>Submit</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(handler).not.toHaveBeenCalled()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Save</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant class', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button').className).toContain('btn--ghost')
  })
})
