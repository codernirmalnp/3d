import React, { useState } from 'react'
import { logout, menu } from '../../assets'
import { dashNav } from '../../constants'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isActive, setIsActive, handleLogout }) => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)


  return (
    <div className='flex justify-end '>
      <div className='sm:hidden '>
        <img src={menu} alt="" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle((prev) => !prev)} />

      </div>
      <div className={`sm:hidden absolute top-[60px] left-0 right-0  bg-[#1c1c24] z-10 shadow-primary py-4 ${!toggle ? '-translate-y-[100vh]' : '-translate-y-0 transition-all duration-700'}`}>
        <ul className=' flex  flex-col justify-center '>
          {dashNav.map((item, index) => {
            return <li key={index} className={`flex items-center p-4  ${isActive === item.name && 'bg-[#3a3a43]'}`} onClick={() => {
              setIsActive(item.name)
              setToggle(false)
              navigate(item.link)

            }}>
              <img src={item.imgUrl} alt={item.name} className='h-[28px] w-[28px]' />
              <p className={`ml-[20px]  font-semibold capitalize text-[16px] ${isActive === item.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>{item.name}</p>

            </li>
          })}
          <li className={`flex items-center p-4 `} onClick={handleLogout}>
            <img src={logout} className='h-[28px] w-[28px]' />
            <p className={`ml-[20px]  font-semibold capitalize text-[16px] 'text-[#808191]'}`}>Logout</p>

          </li>

        </ul>
      </div>
    </div>
  )
}

export default Navbar