import { AlbumBoxCard, PlaylistBoxCard, SongCard, VideoCard } from '@/components/Cards'
import { useArtistPageStore, usePageStore } from '@/stores/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { ArtistFull } from 'ytmusic-api'
import ArtistPageLoading from '../loading/ArtistPageLoading'

// images
import defaultImage from '@/statics/images/favicon.png';

const ArtistPage = () => {

    const artistId = usePageStore((state) => (state.id))
    const setId = usePageStore((state) => (state.setId))
    const prevPage = usePageStore((state) => (state.prevPage))
    const setPageState = usePageStore((state) => (state.setPage))

    const artistData = useArtistPageStore((state) => (state.artistData))
    const setArtistData = useArtistPageStore((state) => (state.setArtistData))
    const resetArtistData = useArtistPageStore((state) => (state.resetArtistData))

    const { error, isFetching: loadingArtistData } = useQuery({
        queryKey: ['artistPageData'],
        queryFn: async (): Promise<ArtistFull | null> => {
            if (artistData?.artistId !== artistId) {
                resetArtistData()
                const { data } = await axios.get('/api/ytm?action=getArtist&artistId=' + artistId)
                setArtistData(data)
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
                loadingArtistData &&
                <ArtistPageLoading />
            }
            {
                error &&
                <div className="error">{error.message}</div>
            }
            {
                artistData !== undefined && artistData !== null &&
                <div className="page">
                    <div className="page-info">
                        <div className="flex">
                            <button onClick={handleBackBtnClick} className="icon-btn material-symbols-outlined">
                                arrow_back
                            </button>
                            <h1>{artistData.name}</h1>
                        </div>
                        {artistData.thumbnails[0] &&
                            <img
                                src={artistData.thumbnails[0]?.url}
                                alt={artistData.name}
                                width={200}
                                height={200}
                                onError={(e) => e.currentTarget.src = defaultImage.src}
                            />
                        }
                    </div>

                    {
                        artistData.featuredOn.length > 0 &&
                        <div className="block-for-horizontal">
                            <h2>Featured On</h2>
                            <div className="horizontal-playlist">
                                {artistData.featuredOn.map((content, i) => {
                                    if (content.type === 'PLAYLIST') {
                                        // PlaylistDetailed type is used in PlayListCard, 
                                        // data from content has some missing properties,
                                        // this was a temp fix!
                                        let artistId: string | null = '';
                                        let name: string | null = '';
                                        const newContent = {
                                            ...content,
                                            artist: {
                                                artistId,
                                                name
                                            }
                                        }
                                        return (
                                            <div key={i} className="box-card">
                                                <PlaylistBoxCard playlist={newContent} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    }

                    {
                        artistData.topAlbums.length > 0 &&
                        <div className="block-for-horizontal">
                            <h2>Top Albums</h2>
                            <div className="horizontal-playlist">
                                {artistData.topAlbums.map((content, i) => {
                                    if (content.type === 'ALBUM') {
                                        return (
                                            <div key={i} className="box-card">
                                                <AlbumBoxCard album={content} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    }

                    {
                        artistData.topSingles.length > 0 &&
                        <div className="block-for-horizontal">
                            <h2>Top Singles</h2>
                            <div className="horizontal-playlist">
                                {artistData.topSingles.map((content, i) => {
                                    if (content.type === 'ALBUM') {
                                        return (
                                            <div key={i} className="box-card">
                                                <AlbumBoxCard album={content} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    }

                    {
                        artistData.topSongs.length > 0 &&
                        <div className="block-for-horizontal">
                            <h2>Top Songs</h2>
                            <div className="home-feed-song">
                                {artistData.topSongs.map((content, i) => {
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
                    }

                    {
                        artistData.topVideos.length > 0 &&
                        <div className="block-for-horizontal">
                            <h2>Top Videos</h2>
                            <div className="home-feed-song">
                                {artistData.topVideos.map((content, i) => {
                                    if (content.type === 'VIDEO') {
                                        return (
                                            <div key={i} className="result-card">
                                                <VideoCard video={content} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default ArtistPage
