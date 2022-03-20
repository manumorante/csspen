import React from 'react'
import { KeyStyle as S } from '../js/Styles.js'

export default function Layout() {
  const examplePens = new Array(20).fill(0)
  document.documentElement.classList.add('debug')

  return (
    <>
      <section {...S(['pen'])}>
        <div {...S(['list'])}>
          <div {...S(['items'])}>
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
          {examplePens.map((pen, index) => {
            return (
              <p className='p-10' key={index}>
                code {index}
              </p>
            )
          })}
        </aside>

        <article {...S(['stage'])}>
          <div {...S(['html'])}>
            <div {...S()}>Stage.HTML</div>
          </div>
        </article>
      </section>
    </>
  )
}
