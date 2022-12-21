import React from 'react'

export default function Background(props) {
  let url = window.location.href
  let backgroundLink = ""
  if (props.backgroundLink===undefined) {
    backgroundLink = "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
  else{
    backgroundLink = "https://image.tmdb.org/t/p/original"+props.backgroundLink
  }
  
  return (
    <div className='background' style={{backgroundImage:`url(${backgroundLink})`}}>
        
    </div>
  )
}
