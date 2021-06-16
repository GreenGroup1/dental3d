import { Canvas } from '@react-three/fiber'
import { Model } from "./Model"
import { OrbitControls } from "@react-three/drei"
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil"
import { useState } from 'react'
import Viewcube from './Viewcube'
import Navigate from './Navigate'
import { ModelContext } from 'context'
import { useContext } from 'react'

export const ModelView = () => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const [ isOrthogonal, setOrthogonal ] = useState(false)
  const { orbit } = useContext(ModelContext)
  
  return <div style={{position:'absolute', height:'100%', width:'100%'}}>
    <ModelContext.Consumer>
      {value=>(
        <Canvas 
          shadows
          dpr={window.devicePixelRatio*1}
          camera={{
            position:[600,800,600]
          }}
        >
          <ModelContext.Provider value={value}>
            <RecoilBridge>
              <ambientLight />
              <pointLight position={[100, 100, 100]} intensity={0.8}/>
              <pointLight position={[-100, 100, 100]} intensity={0.8}/>
              <Model/>
              {isOrthogonal&&<>
                <gridHelper args={[10,20,'#bbb','#ccc']} scale={[10,10,10]}/>
                <gridHelper args={[10,20,'#bbb','#ccc']} scale={[10,10,10]} rotation={[0,0,Math.PI/2]}/>
                <gridHelper args={[10,20,'#bbb','#ccc']} scale={[10,10,10]} rotation={[0,Math.PI/2,Math.PI/2]}/>
              </>}
              {/*//@ts-ignore */}
              <OrbitControls ref={orbit} />
              <Navigate />
              <Viewcube {...{isOrthogonal, setOrthogonal}}/>
            </RecoilBridge>
          </ModelContext.Provider>
        </Canvas>
      )}
    </ModelContext.Consumer>
  </div>
}
