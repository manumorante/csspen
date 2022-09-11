import cx from 'classnames'
export default function Header({ children, codeView }) {
  return (
    <div
      className={cx(
        'Header',
        'fixed z-20 top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 transition-transform duration-500 ease-in-out',
        {
          '-translate-y-full': codeView > 0,
        }
      )}>
      {children}
    </div>
  )
}
