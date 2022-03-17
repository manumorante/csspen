import React from 'react'
import { layout } from '../styles.js'

export default function Layout() {
  const examplePens = new Array(20).fill(0)
  // Background to see and try the layout
  const g = ' bg-gradient-to-r from-slate-800 to-slate-900'

  return (
    <>
      <header className={layout.header + g}>
        <p>Header</p>
      </header>

      <section className={layout.pen + g}>
        <div className={`Menu ${layout.list.base + g} `}>
          <div className={`List ${layout.list.items + g}`}>
            {examplePens.map((pen, index) => {
              return (
                <p className='p-10' key={index}>
                  Example pen num {index}
                </p>
              )
            })}
          </div>
        </div>

        <aside className={layout.editor + g}>
          <p>Editor</p>
        </aside>

        <article className={layout.stage.base + g}>
          <div className={layout.stage.html + g}>
            <div className={`p-10 hover:p-32 ${g}`}>Stage.HTML</div>
          </div>
        </article>
      </section>

      <footer className={layout.footer + g}>
        <p>Footer</p>
      </footer>
    </>
  )
}
