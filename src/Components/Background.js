import React from 'react'

export default function Background(props) {
  let url = window.location.href
  let backgroundLink = ""
  console.log(props.backgroundLink)
  if (props.backgroundLink===undefined) {
    backgroundLink = "https://i0.wp.com/jasonsmovieblog.com/wp-content/uploads/2022/06/lightyear-e1655587262582.png?fit=1200%2C504&ssl=1"
  }
  else{
    backgroundLink = "https://image.tmdb.org/t/p/original"+props.backgroundLink
  }
  
  return (
    <div className='background' style={{backgroundImage:`url(${backgroundLink})`}}>
        
    </div>
  )
}
