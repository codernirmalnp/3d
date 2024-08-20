import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles';
import bg from './../assets/admin.png'
// import {computerCanavas} from './canvas'

const Hero = () => {

    return (
        <section className='relative w-full h-screen mx-auto'>
            <div
                className={`absolute inset-0 top-[220px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
            >
                <div className='flex flex-col justify-center items-center mt-5'>
                    <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
                    <div className='w-1 sm:h-80 h-40 violet-gradient' />
                </div>

                <div>
                    <h1 className={`${styles.heroHeadText} text-white`}>
                        Hi, I'm <span className='text-[#915EFF]'>Nirmal</span>
                    </h1>
                    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                        Full Stack Web Developer , UI/UX Designer,<br className='sm:block hidden' />
                        Blockchain , 3D , Data analyst ,  DSA & ML<br className='sm:block hidden' />

                    </p>
                    <img src={bg} alt="" className='-mt-12  w-full h-96 object-contain scale-150' />
                </div>
            </div>
            {/* <ComputerCanvas /> */}

            <img src="" alt="" />
            <div className='absolute xs:bottom-2 bottom-48 w-full flex justify-center items-center'>
                <a href="#about">
                    <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex jusify-center items-start p-2'>
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop'
                            }}
                            className='w-3 h-3 rounded-full bg-secondary mb-1'
                        />
                    </div>
                </a>

            </div>

        </section>
    )
}

export default Hero