import React, { useEffect, useState } from 'react'
import './index.css'
// import { ReactComponent as CloseBtn} from '../../assets/svg/premium-icon-cross-mark-4225670.png'

export const Search = ({ handleChange }) => {
  const [textInSearch, setTextInSearch] = useState('')

  useEffect(() => {
    handleChange(textInSearch)
  }, [textInSearch]);

  const clearInputClick = () => {
    setTextInSearch('')
  }

  return (
    <div className='containerS'>
      <input type='text'
        className='searching'
        onChange={(e) => setTextInSearch(e.target.value)}
        value={textInSearch}
        placeholder='Поиск' />

      {textInSearch && <button type='submit' className='srch_btn' onClick={clearInputClick}> </button>}

    </div>
  )
}
