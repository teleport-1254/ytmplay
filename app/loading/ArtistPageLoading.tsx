import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { usePageStore } from '@/stores/store'

const ArtistPageLoading = () => {
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

    const setId = usePageStore((state) => (state.setId))
    const setPageState = usePageStore((state) => (state.setPage))

    const handleBackBtnClick = () => {
        setId(null)
        setPageState('search')
    }

    return (
        <div className="page">
            <div className="page-info">
                <div className="flex">
                    <button onClick={handleBackBtnClick} className="icon-btn material-symbols-outlined">
                        arrow_back
                    </button>
                    <h1><Skeleton className='loading' width={450} /></h1>
                </div>
                <Skeleton className='loading' width={200} height={200} />
            </div>
            <div className='block-for-horizontal'>
                <h2><Skeleton className='loading' /></h2>
                <div className="horizontal-playlist">
                    {playlistCardLoading}
                </div>
            </div>
            <div className='block-for-horizontal'>
                <br />
                <h2><Skeleton className='loading' /></h2>
                <div className="horizontal-playlist">
                    {playlistCardLoading}
                </div>
            </div>

        </div>
    )
}

export default ArtistPageLoading
