import { useGLTF } from '@react-three/drei';
import React from 'react'

const useGL = () => {
  
    const computer = React.useMemo(()=>useGLTF("./desktop_pc/admin.gltf"));
    return computer;
  
}

export default useGL;