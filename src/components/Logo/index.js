import React from 'react'
import { Link } from 'wouter'
import './styles.css'

export default function Logo () {
  return <Link className='Logo' to='/'>
    <span className='css'>CSS</span>
    <span className='learn'>Learn</span>
  </Link>
}
