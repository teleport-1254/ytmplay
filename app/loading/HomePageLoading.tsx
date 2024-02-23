import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomePageLoading = () => {
    const songCardLoading = []

    for (let index = 0; index < 3; index++) {
        songCardLoading.push(
            <div key={index} className="result-card">
                <Skeleton className='song-card-thumbnail loading' />
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
                </div>
            </div>
        )
    }

    const playlistCardLoading = []

    for (let index = 0; index < 3; index++) {
        playlistCardLoading.push(
            <div key={index} className="box-card">
                <Skeleton className='box-card-thumbnail loading' />
                <div className="box-card-data">
                    <h4><Skeleton className='loading' /></h4>
                </div>
            </div>
        )
    }


    return (
        <div className='block-for-horizontal'>
            <h2><Skeleton className='loading' /></h2>
            <div className="home-feed-song">
                {songCardLoading}
            </div>
            <br />
            <h2><Skeleton className='loading' /></h2>
            <div className="horizontal-playlist">
                {playlistCardLoading}
            </div>
        </div>
    )
}

export default HomePageLoading
