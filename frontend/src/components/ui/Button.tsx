import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'gradient' | 'ghost' | 'ghost-dark' | 'on-dark'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md'
  loading?: boolean
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: 'sm' | 'md'
}

function cls(variant: Variant, size?: string) {
  return `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`
}

export function Button({ variant = 'primary', size, loading, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={disabled || loading} className={`${cls(variant, size)} ${className}`}>
      {loading && <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />}
      {children}
    </button>
  )
}

export function LinkButton({ variant = 'primary', size, children, className = '', ...props }: LinkButtonProps) {
  return (
    <a {...props} className={`${cls(variant, size)} ${className}`}>
      {children}
    </a>
  )
}
