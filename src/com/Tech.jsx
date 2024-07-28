import React from 'react'

import SectionWrapper from '../hoc/SectionWrapper'
import { technologies } from '../constants'
const BallCanvas=React.lazy(()=>import('./canvas/BallCanvas'))

const Tech = () => {
    return (
        <div className='flex flex-row flex-wrap justify-center gap-10'>
            {technologies && technologies.map((tech, index) => (
                <div className='w-28 h-28' key={index}>
                    <BallCanvas icon={tech?.icon} />
                </div>
            ))}
        </div>
    )
}

export default SectionWrapper(Tech, "")