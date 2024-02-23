import { VideoCard } from '@/components/Cards'
import { usePageStore, usePlaylistPageStore, useQueueState } from '@/stores/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { PlaylistFull, VideoDetailed } from 'ytmusic-api'
import PlaylistPageLoading from '../loading/PlaylistPageLoading'
import { Track } from '@/stores/storeInterface'

const PlaylistPage = () => {
    const playlistId = usePageStore((state) => (state.id))
    const setId = usePageStore((state) => (state.setId))
    const prevPage = usePageStore((state) => (state.prevPage))
    const setPageState = usePageStore((state) => (state.setPage))

    const playlistData = usePlaylistPageStore((state) => (state.playlistData))
    const setPlaylistData = usePlaylistPageStore((state) => (state.setPlaylistData))
    const resetPlaylistData = usePlaylistPageStore((state) => (state.resetPlaylistData))

    const { error: playlistError, isFetching: loadingPlaylist } = useQuery({
        queryKey: ['playlistPageData'],
        queryFn: async (): Promise<PlaylistFull | null> => {
            if (playlistData?.playlistId !== playlistId) {
                resetPlaylistData()
                const { data } = await axios.get('/api/ytm?action=getPlaylist&playlistId=' + playlistId)
                setPlaylistData(data)
                return data
            }
            return null
        }
    })

    const playlistVideoData = usePlaylistPageStore((state) => (state.playlistVideoData))
    const setPlaylistVideoData = usePlaylistPageStore((state) => (state.setPlaylistVideoData))
    const resetPlaylistVideoData = usePlaylistPageStore((state) => (state.resetPlaylistVideoData))

    const { error: playlistVideoError } = useQuery({
        queryKey: ['playlistVideoPageData'],
        queryFn: async (): Promise<[VideoDetailed] | null> => {
            if (playlistData?.playlistId !== playlistId) {
                resetPlaylistVideoData()
                const { data } = await axios.get('/api/ytm?action=getPlaylistVideos&playlistId=' + playlistId)
                setPlaylistVideoData(data)
                return data
            }
            return null
        }
    })

    const handleBackBtnClick = () => {
        setId(null)
        setPageState(prevPage)
    }


    const addAllToQueue = useQueueState(state => state.addAllToQueue)

    const handlePlayAllBtn = () => {
        let tracks: Array<Track> = [];
        for (let i = 0; i < playlistVideoData.length; i++) {
            let track: Track = {
                audioSrc: '',
                metadata: playlistVideoData[i]
            }
            tracks.push(track)
        }
        addAllToQueue(tracks)
    }

    return (
        <>
            {
                playlistError &&
                <div className="error">{playlistError.message}</div>
            }
            {
                loadingPlaylist &&
                <PlaylistPageLoading />
            }
            <div className="page">
                {
                    playlistData &&
                    <>
                        <div className="page-info">
                            <div className="flex">
                                <button onClick={handleBackBtnClick} className="icon-btn material-symbols-outlined">
                                    arrow_back
                                </button>
                                <h1>{playlistData.name}</h1>
                            </div>
                            <h3>{playlistData?.artist.name}</h3>
                            <h4>{playlistData?.videoCount > 0 && playlistData?.videoCount + ' videos'}</h4>
                            <img
                                src={playlistData.thumbnails[0].url}
                                alt={playlistData.name}
                                width={200}
                                height={200}
                            />
                        </div>

                        <div className="result-block">
                            <button onClick={handlePlayAllBtn} title='Play all'>
                                Play all <span className="material-symbols-outlined">play_circle</span>
                            </button>
                            <h2>Videos</h2>
                            {
                                playlistVideoError &&
                                <div className="error">{playlistVideoError.message}</div>
                            }
                            {playlistVideoData?.map((content, i) => {
                                if (content.type === 'VIDEO') {
                                    return (
                                        <div key={i} className="result-card">
                                            <VideoCard video={content} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default PlaylistPage
