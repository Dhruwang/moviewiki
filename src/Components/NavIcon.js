import React from 'react'

export default function NavIcon() {
    const showHideNav=()=>{
        let responsive = document.getElementById('responsive')
        responsive.style.transform=(responsive.style.transform==="translateX(-100vw)"?"translateX(0vw)":"translateX(-100vw)");
    }
  return (
    <div className='navbtnmain'>
        <button className='navbtn' onClick={showHideNav} ><i class="bi bi-list text-light fs-1"></i></button>
    </div>
  )
}
