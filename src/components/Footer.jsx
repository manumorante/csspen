import React from 'react'
import { layout } from '../styles'

export default function Footer() {
  return (
    <footer
      className={`Footer ${layout.footer} p-2 text-center text-sm text-neutral-600`}>
      <div>&copy;2022 Manu Morante</div>
    </footer>
  )
}
