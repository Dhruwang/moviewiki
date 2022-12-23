import React from 'react'

export default function Background(props) {
  let url = window.location.href
  let backgroundLink = ""
  if (props.backgroundLink===undefined) {
    backgroundLink = "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGFyayUyMGJsdWV8ZW58MHx8MHx8&w=1000&q=80"
  }
  else{
    backgroundLink = "https://image.tmdb.org/t/p/w300"+props.backgroundLink
  }
  
  return (
    <div className='background' style={{backgroundImage:`url(${backgroundLink})`}}>
        
    </div>
  )
}
