import { atoms } from "misc"
import { useEffect } from "react"
import { DoubleSide, Event } from 'three'
import { useRecoilState } from 'recoil'
import { OrbitControls, TransformControls as TransformControlsImpl, mergeVertices } from "three-stdlib"
import { TransformControls } from "./TransformControls"
import { useContext } from "react"
import { ModelContext } from "context"
import { useFrame, useThree } from "@react-three/fiber"

export const Model = () => {
  const [ model, setModel ] = useRecoilState(atoms.model)
  const [ mode, setMode ] = useRecoilState(atoms.transformMode)
  const [ needsUpdate, setNeedsUpdate ] = useRecoilState(atoms.needsUpdate)

  const { transform, geometryRef, orbit, modelRef } = useContext(ModelContext)
  const { gl, scene, camera, size } = useThree()

  useFrame(()=>{
    if(needsUpdate){
      gl.render(scene, camera)
      setNeedsUpdate(false)
    }
  },1)

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current
      controls.setMode(mode)
      const callback = (event:Event) => {console.log('dragged');((orbit.current as OrbitControls).enabled = !event.value)}
      controls.addEventListener("dragging-changed", callback)
      return () => controls.removeEventListener("dragging-changed", callback)
    }
  })

  if ((!model) || (!geometryRef.current)) {
    return null
  }
    
  return <>
  {/*//@ts-ignore  */}
    <TransformControls ref={transform} size={0.6} >
      <mesh  ref={modelRef} geometry={geometryRef.current} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <meshLambertMaterial attach="material" color="#999" side={DoubleSide} />
      </mesh>
    </TransformControls>
  </>
}

