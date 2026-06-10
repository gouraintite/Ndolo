import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  dark?: boolean
}

export function Input({ label, error, id, dark, className = '', ...props }: InputProps) {
  if (dark) {
    return (
      <div className="input-dark">
        {label && <label htmlFor={id}>{label}</label>}
        <input id={id} {...props} className={className} />
        {error && <p className="input-error">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
