import React from 'react'
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { projects } from '../constants';
import { Tilt } from 'react-tilt';
import { github } from '../assets';
const ProjectCard = ({ index,icon, name, description, tags, image, source_code_link }) => {
    return <motion.div varients={fadeIn("up", "spring", index * 0.5, 0.75)}>
        <Tilt options={{ max: 45, scale: 1, speed: 450 }} className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full ">
            <div className='relative w-full h-[230px]'>
                <img src={image} alt={name} className='w-full h-full object-cover rounded-2xl ' />
                <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                    <div onClick={() => window.open(source_code_link, '_blank')} className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
                        <img src={icon ? icon:github} className="w-1/2 h-1/2 object-contain " alt="" />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h3 className='font-bold text-[24px]'>{name}</h3>
                <p className='mt-2 text-secondary text-[14px]'>{description}</p>
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>
                {tags.map((tag,index)=><p key={tag.name} className={`tax-[14px] ${tag.color}`}># {tag.name}</p>)}

            </div>
        </Tilt>
    </motion.div>

}
const Works = () => {
    return (
        <>
            <motion.div>
                <p className={styles.sectionSubText}>My Work</p>
                <h2 className={styles.sectionHeadText}> Projects.</h2>

            </motion.div>
            <div className='w-full flex'>
                <motion.p varients={fadeIn("", "", 0.1, 1)} className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
                    My portfolio showcases a diverse range of projects, demonstrating my expertise in both developing robust, user-friendly applications and performing insightful data analytics. Each project highlights my ability to design, develop, and deploy applications, as well as analyze data to derive actionable insights that meet specific user needs and business goals.Here is all project repositores and live demo.
                </motion.p>


            </div>
            <div className="mt-20 flex flex-wrap gap-7">
                {projects.map((project, index) => (
                    <ProjectCard key={`project-${index}`} index={index} {...project} />
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(Works, "work")