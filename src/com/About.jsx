import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
const ServiceCard = ({ index, title, icon }) => {
    return <Tilt className="xs:w-[250px] w-full">
        <motion.div className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card' variants={fadeIn("right", "spring", 0.5 * index, 0.75)}>
            <div options={{ max: 45, scale: 1, speed: 450 }} className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex flex-col justify-evenly items-center '>
                <img src={icon} alt={title} className='w-16 h-16 object-contain' />
                <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
            </div>
        </motion.div>
    </Tilt>
}

const About = () => {
    return (
        <>
            <motion.div>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}> Overview.</h2>

            </motion.div>
            <motion.p variants={fadeIn("", "", 0.1, 1)} className={` mt-4 text-secondary  text-[17px] max-w-3xl leading-[30px]`}>
                A full stack web developer is skilled in both front-end and back-end development, creating seamless web applications by handling user interfaces and server logic. Meanwhile, a data analyst interprets and analyzes data to provide actionable insights. Combining these roles, a professional can build robust web applications and utilize data to drive informed decisions, optimizing both user experience and business strategy.








            </motion.p>
            <div className='mt-20 flex flex-wrap gap-10'>
                {services.map((service, index) => {
                    return <ServiceCard title={service.title} key={index} {...service} />

                })}

            </div>


        </>
    )
}

export default SectionWrapper(About,"about")