function Button({ children, variant = 'primary', as: Element = 'button', className = '', type, ...props }) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ')
  const elementType = Element === 'button' ? (type ?? 'button') : undefined

  return (
    <Element className={classes} type={elementType} {...props}>
      {children}
    </Element>
  )
}

export default Button
