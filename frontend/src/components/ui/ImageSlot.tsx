interface ImageSlotProps {
  placeholder?: string
  dark?: boolean
  className?: string
  src?: string
}

export function ImageSlot({
  placeholder = 'Photo à venir',
  dark,
  className = '',
  src,
}: ImageSlotProps) {
  return (
    <div className={`image-slot${dark ? ' image-slot--dark' : ''} ${className}`}>
      {src ? <img src={src} alt={src} /> : <span>{placeholder}</span>}
    </div>
  )
}
