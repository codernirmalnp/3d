import React from 'react'
import SectionWrapper from '../hoc/SectionWrapper'
import { styles } from '../styles'
import { FaGithub, FaKaggle, FaLinkedin, FaTwitter } from "react-icons/fa";
const icons = [{ icon: <FaLinkedin size={30} color="#0A66C2" />, link: "https://www.linkedin.com/in/nirmal-dangi-b9231a18b/" },
{ icon: <FaTwitter size={30} color="#1DA1F2" />, link: "https://x.com/iamnirmaldangi" },
{ icon: <FaKaggle size={30} color="#fff" />, link: "https://www.kaggle.com/nirmaldangi" },
{ icon: <FaGithub size={30} color="#fafbfc" />, link: "https://github.com/codernirmalnp" }]

const Footer = () => {
    return (
        <div className={`w-full flex items-center justify-center bg-black-100 ${styles.padding}`}>
            <div className='flex items-center justify-center gap-6'>
                {icons?.map((el, index) => {

                    return <a href={el.link} className='cursor-pointer' key={index} target="_blank">
                        {el.icon}
                    </a>
                })}

            </div>
        </div>
    )
}

export default SectionWrapper(Footer, "")