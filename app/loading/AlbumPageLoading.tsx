import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { usePageStore } from '@/stores/store'

const AlbumPageLoading = () => {
    const loadingComponents = []

    for (let index = 0; index < 3; index++) {
        loadingComponents.push(
            <div key={index} className="result-card">
                <Skeleton className='song-card-thumbnail loading' />
                <div className="card-data">
                    <h4><Skeleton className='loading' /></h4>
                    <h5><Skeleton className='loading' /></h5>
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

            <div className="result-block">
                <h2><Skeleton className='loading' width={450} /></h2>
                {loadingComponents}
            </div>
        </div>
    )
}

export default AlbumPageLoading
