
import React, { useContext,  useEffect } from 'react'
import NoteContext from '../src/context/note/NoteContext';

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, [])
  return (
    <>
     <h3 className='mt-4 text-danger'>This is About {a.nameAge.name} and his age is {a.nameAge.age}</h3>
    </>
  )
}

export default About