import React, { useEffect, useState } from 'react'
import { getPens } from 'database'
import { supabase } from 'database/supabase'

export default function Og({ user }) {
  const [pens, setPens] = useState([])

  useEffect(() => {
    getPens().then((data) => {
      setPens(data)
    })
  }, [])

  function addScope(css, scope) {
    const selectorRegex = /(\.[\w-\s\.\:\>\[\]\*\=\']+)(?=[\{|\,])/g
    return css.replace(selectorRegex, `${scope} $1`)
  }

  return (
    <div className='Pens flex flex-wrap'>
      {pens.map((pen, i) => {
        const css = pen.steps[pen.steps.length - 1].css
        const cssScoped = addScope(css, '#p' + i)

        return (
          <div
            key={pen.id}
            className='relative'
            style={{ width: '1200px', height: '630px', backgroundColor: pen.colors.c3 }}>
            <div
              id={`p${i}`}
              className='absolute inset-0 m-auto grid place-items-center w-pen h-pen'
              dangerouslySetInnerHTML={{ __html: pen.html }}
            />
            <style type='text/css' dangerouslySetInnerHTML={{ __html: cssScoped }} />
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
