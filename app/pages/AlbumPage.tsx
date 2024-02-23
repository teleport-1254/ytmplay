import { SongCard } from '@/components/Cards'
import { useAlbumPageStore, usePageStore } from '@/stores/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { AlbumFull } from 'ytmusic-api'
import AlbumPageLoading from '../loading/AlbumPageLoading'
// images
import defaultImage from '@/statics/images/favicon.png';

const AlbumPage = () => {

    const albumId = usePageStore((state) => (state.id))
    const setId = usePageStore((state) => (state.setId))
    const prevPage = usePageStore((state) => (state.prevPage))
    const setPageState = usePageStore((state) => (state.setPage))

    const albumData = useAlbumPageStore((state) => (state.albumData))
    const setAlbumData = useAlbumPageStore((state) => (state.setAlbumData))
    const resetAlbumData = useAlbumPageStore((state) => (state.resetAlbumData))

    const { error, isFetching: loadingAlbumData } = useQuery({
        queryKey: ['albumPageData'],
        queryFn: async (): Promise<AlbumFull | null> => {
            if (albumData?.albumId !== albumId) {
                resetAlbumData()
                const { data } = await axios.get('/api/ytm?action=getAlbum&albumId=' + albumId)
                setAlbumData(data)
                return data
            }
            return null
        }
    })

    const handleBackBtnClick = () => {
        setId(null)
        setPageState(prevPage)
    }

    return (
        <>
            {
                loadingAlbumData &&
                <AlbumPageLoading />
            }
            {
                error &&
                <div className="error">{error.message}</div>
            }
            {
                albumData !== undefined && albumData !== null &&
                <div className="page">
                    <div className="page-info">
                        <div className="flex">
                            <button onClick={handleBackBtnClick} className="icon-btn material-symbols-outlined">
                                arrow_back
                            </button>
                            <h1>{albumData?.name}</h1>
                        </div>
                        <h3>{albumData?.artist.name}</h3>
                        <h4>{albumData?.year}</h4>
                        {albumData.thumbnails[2] &&
                            <img
                                src={albumData.thumbnails[2]?.url}
                                alt={albumData.name}
                                width={200}
                                height={200}
                                onError={(e) => e.currentTarget.src = defaultImage.src}
                            />
                        }
                    </div>
                    <div className="result-block">
                        <div className="result-content">
                            <h2>Songs</h2>
                            {albumData?.songs.map((content, i) => {
                                if (content.type === 'SONG') {
                                    return (
                                        <div key={i} className="result-card">
                                            <SongCard song={content} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AlbumPage
