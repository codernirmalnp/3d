
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthContext } from './AuthContext';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';


const PrivateRoutes = () => {
    const { user, isLoading } = useContext(UserAuthContext);




    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
        </div>

    }

    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
}
export default PrivateRoutes;