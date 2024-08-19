import React, { Suspense } from 'react'
import { About, Experience, Navbar, Works } from './com'
import Feedback from './com/Feedback'
import Contact from './com/Contact'

import Footer from './com/Footer'
import { Loader } from '@react-three/drei'
const Tech = React.lazy(() => import('./com/Tech'))
const Hero = React.lazy(() => import('./com/Hero'))
const StarCanvas = React.lazy(() => import('./com/canvas/StarCanvas'))

const MainPage = () => {
    return (
        <Suspense fallback={<Loader />}>

            <div className='relative z-0 bg-primary'>
                <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                    <Navbar />
                    <Hero />

                </div>
                <About />
                <Experience />
                <Tech />
                <Works />
                <Feedback />
                <div className='relative z-0 bg-primary'>
                    <Contact />
                    <StarCanvas />

                </div>
                <Footer />
            </div>
        </Suspense>

    )
}

export default MainPage