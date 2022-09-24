import React, { useEffect, useState } from 'react'
import { getPens } from 'database'
import { supabase } from 'database/supabase'
import { toJpeg } from 'html-to-image'
import { addScope } from 'lib/css'

function generate({ fromElem, toContainer }) {
  toJpeg(fromElem)
    .then(function (dataUrl) {
      var img = new Image()
      img.src = dataUrl
      toContainer.innerHTML = img.outerHTML
      fromElem.style.display = 'none'
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}

export default function Og({ user }) {
  const [pens, setPens] = useState([])

  useEffect(() => {
    getPens().then(setPens)
  }, [])

  const handleGenerate = (id) => {
    const fromElem = document.getElementById(id)
    const toContainer = document.getElementById('container-' + id)

    if (fromElem && toContainer) {
      setTimeout(() => {
        generate({ fromElem, toContainer })
      }, 500)
    }
  }

  return (
    <div className='Pens flex flex-wrap'>
      {pens.map((pen, i) => {
        const css = pen.steps[pen.steps.length - 1].css
        const cssScoped = addScope(css, '.pen-' + i)

        return (
          <div key={pen.id}>
            <div
              id={pen.id}
              className='relative'
              style={{ width: '1200px', height: '630px', backgroundColor: pen.colors.c3 }}>
              <div
                className={`pen-${i} absolute inset-0 m-auto grid place-items-center w-pen h-pen`}
                dangerouslySetInnerHTML={{ __html: pen.html }}
              />
              <style type='text/css' dangerouslySetInnerHTML={{ __html: cssScoped }} />
            </div>

            <div id={`container-${pen.id}`}></div>

            {handleGenerate(pen.id)}
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
