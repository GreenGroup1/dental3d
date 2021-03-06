import { useEffect, useState } from 'react';

export * from './nhost'
export * from './recoil'
export * from './style'
export * from './types'

export function useKeyPress(targetKey:string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  function downHandler({ key='' }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key='' }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export const devBlender = 'https://edit.dentalmodelmaker.com' //'http://127.0.0.1:5005'
export const prodBlender = 'https://edit.dentalmodelmaker.com'
// export const devAPI = 'https://api.dentalmodelmaker.com/dev6'
// export const prodAPI = 'https://api.dentalmodelmaker.com/v1'
