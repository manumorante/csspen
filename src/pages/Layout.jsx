import React from 'react'
import { KeyStyle as S } from '../js/Styles.js'

export default function Layout() {
  const examplePens = new Array(20).fill(0)

  return (
    <>
      <header {...S(['header'])}>Header</header>

      <section {...S(['pen'])}>
        <div {...S(['list', 'base'])}>
          <div {...S(['list', 'items'])}>
            {examplePens.map((pen, index) => {
              return (
                <p className='p-10' key={index}>
                  Example pen num {index}
                </p>
              )
            })}
          </div>
        </div>

        <aside {...S(['editor'])}>
          <code>codigo tal y cual</code>
        </aside>

        <article {...S(['stage', 'base'])}>
          <div {...S(['stage', 'html'])}>
            <div {...S()}>Stage.HTML</div>
          </div>
        </article>
      </section>

      <footer {...S(['footer'])}>Footer</footer>
    </>
  )
}
