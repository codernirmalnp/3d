import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import { storage } from './api'
const CertificateCard = ({ index, title, image }) => {
    const imageURL = storage.getFileView('66b6b129002629cece9f', image)


    return <motion.div variants={fadeIn("", "spring", index * 0.5, 0.75)} className='bg-black-200 p-10 rounded-3xl  max-w-md w-full' key={index}>

        <div className='mt-1'>
            <p className='text-white tracking-wider text-[20px] text-bold'>{title}</p>
            <a className='mt-7 flex justify-center items-center gap-1' href={imageURL} target="_blank">
                <img src={imageURL} className='w-full h-full rounded-md  object-cover' />
            </a>
        </div>

    </motion.div>

}


const Certificate = ({ data }) => {


    return (
        <div className='mt-12 bg-black-100 rounded-[20px]'>
            <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>

                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>I am certified </p>
                    <h2 className={styles.sectionHeadText}>Certificate.</h2>

                </motion.div>
            </div>
            <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-5`}>
                {data.map((say, index) => {

                    return <CertificateCard key={index} index={index} {...say} />
                })}

            </div>

        </div>
    )
}

export default SectionWrapper(Certificate, "",)
