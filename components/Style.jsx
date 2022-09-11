import React from 'react'

export default function Style({ css }) {
  return <style type='text/css' dangerouslySetInnerHTML={{ __html: css }}></style>
}
