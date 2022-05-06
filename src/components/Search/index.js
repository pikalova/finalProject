import React from 'react'
import './index.css'
// import { ReactComponent as CloseBtn} from '../../assets/svg/premium-icon-cross-mark-4225670.png'

export const Search = ({handleChange}) => {
  return (
    <div className='container'>
    <input type = 'text' className='searching' onChange={handleChange}  placeholder='Поиск'/>
    <button type='submit' className='srch_btn'> </button>
    </div>
  )
}
