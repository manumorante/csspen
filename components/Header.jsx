import cx from 'classnames'
export default function Header({ children, state }) {
  return (
    <div
      className={cx(
        'Header',
        'fixed z-20 top-0 left-0 right-0 h-24 p-4 bg-gradient-to-b from-black/20 transition-transform duration-500 ease-in-out',
        {
          '-translate-y-full': !state.codeHide,
        }
      )}>
      {children}
    </div>
  )
}
