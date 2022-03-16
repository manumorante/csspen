import React from 'react'
import { layout } from '../styles.js'

export default function Layout() {
  return (
    <>
      <header className={layout.header}>
        <p>Header</p>
      </header>

      <section className={layout.pen}>
        <nav className={layout.penList}>
          <p>PenList</p>
        </nav>

        <aside className={layout.editor}>
          <p>Editor</p>
        </aside>

        <article className={layout.stage}>
          <p>Stage</p>
        </article>
      </section>

      <footer className={layout.footer}>
        <p>Footer</p>
      </footer>
    </>
  )
}
