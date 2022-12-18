import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
    return (
        <div className='home'>
                        <h1 className='text-light mt-2'>Welcome to MovieWiki</h1>
            <div className='searchBarDiv m-2'>
                <input type="value" className='searchBar' placeholder='Search' />
            </div>

            <Carousel>
                <Carousel.Item interval={4000}>
                    <img
                        className="d-block w-100"
                        src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg"
                        alt="Image One"
                    />
                    <Carousel.Caption>
                        <h3>lightyear</h3>
                        <p>Adventure</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                    <img
                        className="d-block w-100"
                        src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg"
                        alt="Image Two"
                    />
                    <Carousel.Caption>
                    <h3>lightyear</h3>
                        <p>Adventure</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
