import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const SongResultLoading = () => {
    const loadingComponents = []
    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className='result-card'>
                <div className="song-card-thumbnail">
                    <Skeleton className='song-card-thumbnail loading' />
                </div>
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
                </div>
            </div>
        )
    }
    return (
        <div className="result-content">
            {loadingComponents}
        </div>
    )
}

export const VideoResultLoading = () => {
    const loadingComponents = []
    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className="result-card">
                <div className="video-card-thumbnail">
                    <Skeleton className='video-card-thumbnail loading' />
                </div>
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
                </div>
            </div>
        )
    }

    return (
        <div className="result-content">
            {loadingComponents}
        </div>
    )
}

export const ArtistResultLoading = () => {
    const loadingComponents = []
    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className="result-card">
                <div className="artist-card-thumbnail">
                    <Skeleton className='artist-card-thumbnail loading' />
                </div>
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                </div>
            </div>
        )
    }

    return (
        <div className="result-content">
            {loadingComponents}
        </div>
    )
}

export const AlbumResultLoading = () => {
    const loadingComponents = []
    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className="result-card">
                <div className="album-card-thumbnail">
                    <Skeleton className='album-card-thumbnail loading' />
                </div>
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
                </div>
            </div>
        )
    }

    return (
        <div className="result-content">
            {loadingComponents}
        </div>
    )
}

export const PlaylistResultLoading = () => {
    const loadingComponents = []
    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className="result-card">
                <div className="playlist-card-thumbnail">
                    <Skeleton className='playlist-card-thumbnail loading' />
                </div>
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
                </div>
            </div>
        )
    }

    return (
        <div className="result-content">
            {loadingComponents}
        </div>
    )
}