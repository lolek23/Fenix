import React, {useContext,useState, useEffect} from 'react';
import PrimButton from '../../basecomponents/PrimButton/PrimButton'
import SecButton from '../../basecomponents/SecButton/SecButton'


function Home(){

  useEffect(() => {
    document.title = "Fenix - Úvod";
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  
  return(
    <div>
      <PrimButton>test</PrimButton>
      <SecButton>test</SecButton>
        XXXXXXXXXXXXXXXXXX    
    </div>
  )

    
} 

export default Home;