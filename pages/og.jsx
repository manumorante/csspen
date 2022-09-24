import React, { useEffect, useState } from 'react'
import { getPens } from 'database'
import { supabase } from 'database/supabase'
import { toPng } from 'html-to-image'
import { addScope } from 'lib/css'
import download from 'downloadjs'

function generate({ id, fromElem, toContainer }) {
  toPng(fromElem)
    .then(function (dataUrl) {
      var img = new Image()
      img.src = dataUrl
      toContainer.innerHTML = img.outerHTML

      // Hide html after image is generated
      // fromElem.style.display = 'none'

      // Download image
      download(dataUrl, id, 'image/png')
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
    // download('hello world', 'dlText.txt', 'text/plain')
    const fromElem = document.getElementById(id)
    const toContainer = document.getElementById('container-' + id)

    if (fromElem && toContainer) {
      generate({ id, fromElem, toContainer })
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

            <div id={`container-${pen.id}`} className='hidden'></div>

            <button className='bg-white text-black p-3' onClick={() => handleGenerate(pen.id)}>
              Generate <span className='font-mono'>{pen.id}</span>
            </button>

            {/* {handleGenerate(pen.id)} */}
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
