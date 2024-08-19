import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { logo, logout } from '../../assets'
import { dashNav } from '../../constants'

const Icon = ({ imgUrl, styles, name, isActive, disabled, handleClick }) => {
  return <div key={name} className={`w-[54px] h-[54px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} `} onClick={handleClick}>
    {!isActive ? <img src={imgUrl} alt="fund logo" className='h-full w-full' /> : <img src={imgUrl} alt="fund logo" className='h-1/2 w-1/2 greyscale' />}
  </div>
}

const Sidebar = ({ isActive, setIsActive, handleLogout }) => {
  const navigate=useNavigate()





  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/'>
        <div className={`w-[80px] h-[80px] rounded-[10px]  flex justify-center items-center pointer-events-none`}>
          <img src={logo} alt="fund logo" className='h-full w-full' />
        </div>
      </Link>
      <div className='flex flex-1 flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {dashNav.map((item, index) => <Icon key={index} {...item} isActive={isActive} handleClick={() => {
            setIsActive(item.name)
            navigate(item.link)

          }} />)}
        </div>
        <div className='flex flex-col justify-center items-center gap-3'>
          <div className={`w-[32px] h-[32px] rounded-[10px]  flex justify-center items-center  `} onClick={handleLogout}>
            <img src={logout} alt="fund logo" className='h-full w-full' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Sidebar