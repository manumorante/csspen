import cx from 'classnames'
export default function Nav({ children, codeView }) {
  return (
    <div
      className={cx('Nav', 'fixed bottom-0 left-0 right-0 z-10', 'transition-transform duration-500 ease-in-out', {
        'translate-y-full': codeView > 0,
      })}>
      {children}
    </div>
  )
}
