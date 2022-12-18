import React from 'react'

export default function Home() {
    return (
        <div className='home'>
            <div className='searchBarDiv'>
                <input type="value" className='searchBar' placeholder='Search' />
            </div>
            <div id="carouselExampleIndicators" className="carousel slide" data-interval= "2000" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>LightYear</h5>
                            <p>Adventure</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h5>LightYear</h5>
                            <p>Adventure</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h5>LightYear</h5>
                            <p>Adventure</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
