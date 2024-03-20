import React from 'react'
import { downarrow } from '../../assets'
import './downarrow.css'

function DownArrow() {
  return (
    <img className='downarrow' src={downarrow.toString()} alt="Arrow pointing down icon." />
  )
}

export default DownArrow