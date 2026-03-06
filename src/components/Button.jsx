export default function Button({ children, onClick, disabled = false, variant = 'primary', style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      style={style}
      data-testid="button"
    >
      {children}
    </button>
  )
}
