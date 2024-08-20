import React, { Suspense, useEffect, useState } from 'react'
import { About, Experience, Navbar, Works } from './com'
import Feedback from './com/Feedback'
import Contact from './com/Contact'

import Footer from './com/Footer'
import { Loader } from '@react-three/drei'
import Certificate from './com/Certificate'
import { db } from './com/api'
const Tech = React.lazy(() => import('./com/Tech'))
const Hero = React.lazy(() => import('./com/Hero'))
const StarCanvas = React.lazy(() => import('./com/canvas/StarCanvas'))

const MainPage = () => {
    const databaseID=import.meta.env.VITE_APP_DATABASE_ID
    const projectID=import.meta.env.VITE_APP_PROJECT_COLLECTION
    const certificateID=import.meta.env.VITE_APP_CERTIFICATE_COLLECTION

    const [certificate, setCertificate] = useState([])
    const [project, setProject] = useState([])
    const loadData = async () => {
        const promise = [db.listDocuments(databaseID, projectID), db.listDocuments(databaseID, certificateID )];
        Promise.all(promise).then((res) => {

            setCertificate(res[1]?.documents)
            setProject(res[0]?.documents)


        })
        // setCertificate(response.documents)
    }
    useEffect(() => {
        loadData()

    }, [])



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
                <Works data={project} />
                <Feedback />
                <Certificate data={certificate} />

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