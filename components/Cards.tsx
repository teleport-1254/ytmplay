import React from 'react'
import axios from 'axios'

// types
import { AlbumDetailed } from 'ytmusic-api'
import { ArtistDetailed } from 'ytmusic-api'
import { PlaylistDetailed } from 'ytmusic-api'
import { SongDetailed } from 'ytmusic-api'
import { VideoDetailed } from 'ytmusic-api'

// time formate
import { secondsToHoursMinutesSeconds } from '@/lib/timeFormatting';

// store
import { usePageStore, useQueueState } from '@/stores/store'
import { Track } from '@/stores/storeInterface'

// images
import defaultImage from '@/statics/images/favicon.png';

// interfaces
interface albums {
    album: AlbumDetailed
}

interface artists {
    artist: ArtistDetailed
}

interface playlists {
    playlist: PlaylistDetailed
}

interface songs {
    song: SongDetailed
}

interface videos {
    video: VideoDetailed
}

export const AlbumCard = ({ album }: albums) => {
    const setId = usePageStore((state) => (state.setId))
    const setPage = usePageStore((state) => (state.setPage))

    const handleAlbumClick = () => {
        setId(album.albumId)
        setPage('album')
    }
    return (
        <>
            <div className="album-card-thumbnail">
                <img
                    src={album.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                    onClick={handleAlbumClick}
                />
            </div>
            <div className="card-data"
                onClick={handleAlbumClick}
            >
                <h4>{album.name}</h4>
                <h5>{album.artist.name}</h5>
                <h6>{album.year}</h6>
            </div>
        </>
    )
}

export const AlbumBoxCard = ({ album }: albums) => {
    const setId = usePageStore((state) => (state.setId))
    const setPage = usePageStore((state) => (state.setPage))

    const handleAlbumClick = () => {
        setId(album.albumId)
        setPage('album')
    }
    return (
        <>
            <div className="box-card-thumbnail">
                <img
                    src={album.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                    onClick={handleAlbumClick}
                />
            </div>
            <div className="box-card-data"
                onClick={handleAlbumClick}
            >
                <h4>{album.name}</h4>
                <h5>{album.artist.name}</h5>
                <h6>{album.year}</h6>
            </div>
        </>
    )
}

export const ArtistCard = ({ artist }: artists) => {
    const setId = usePageStore((state) => (state.setId))
    const setPage = usePageStore((state) => (state.setPage))

    const handleArtistClick = () => {
        setId(artist.artistId)
        setPage('artist')
    }
    return (
        <>
            <div className="artist-card-thumbnail">
                <img
                    src={artist.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                    onClick={handleArtistClick}
                />
            </div>
            <div className="card-data" onClick={handleArtistClick}>
                <h4>{artist.name}</h4>
            </div>
        </>
    )
}

export const PlaylistCard = ({ playlist }: playlists) => {
    const setId = usePageStore((state) => (state.setId))
    const setPage = usePageStore((state) => (state.setPage))

    const handlePlaylistClick = () => {
        setId(playlist.playlistId)
        setPage('playlist')
    }
    return (
        <>
            <div className="playlist-card-thumbnail">
                <img
                    src={playlist.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                    onClick={handlePlaylistClick}
                />
            </div>
            <div
                className="card-data"
                onClick={handlePlaylistClick}
            >
                <h4>{playlist.name}</h4>
                <h5>{playlist.artist.name}</h5>
            </div>
        </>
    )
}

export const PlaylistBoxCard = ({ playlist }: playlists) => {
    const setId = usePageStore((state) => (state.setId))
    const setPage = usePageStore((state) => (state.setPage))

    const handlePlaylistClick = () => {
        setId(playlist.playlistId)
        setPage('playlist')
    }
    return (
        <>
            <div className="box-card-thumbnail">
                <img
                    src={playlist.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                    onClick={handlePlaylistClick}
                />
            </div>
            <div
                className="box-card-data"
                onClick={handlePlaylistClick}
            >
                <h4>{playlist.name}</h4>
                <h5>{playlist.artist.name}</h5>
            </div>
        </>
    )
}

export const SongCard = ({ song }: songs) => {
    const setCurrPlayingIndex = useQueueState(state => state.setCurrPlayingIndex)
    const currQueue = useQueueState(state => state.queue)
    const addToQueueAndPlay = useQueueState(state => state.addToQueueAndPlay)
    const addToQueue = useQueueState(state => state.addToQueue)

    const handleClick = async () => {
        let inQueueAt: number = -1;

        for (let i = 0; i < ((currQueue) ? currQueue.length : 0); i++) {
            if (currQueue && currQueue[i].metadata.videoId === song.videoId) {
                inQueueAt = i
                break
            }
        }
        if (inQueueAt === -1) {
            let data: Track = {
                metadata: song,
                audioSrc: ''
            }

            addToQueueAndPlay(data, currQueue)
        } else {
            setCurrPlayingIndex(inQueueAt)
        }
    }

    const handleAddToQueueBtn = async () => {
        let inQueueAt: number = -1;

        for (let i = 0; i < ((currQueue) ? currQueue.length : 0); i++) {
            if (currQueue && currQueue[i].metadata.videoId === song.videoId) {
                inQueueAt = i
                break
            }
        }
        if (inQueueAt === -1) {
            const response = await axios.get('/api/ytm?action=getStream&videoId=' + song.videoId);
            let data: Track = {
                metadata: song,
                audioSrc: await response.data[1].url
            }

            addToQueue(data, currQueue)
        }
    }

    return (
        <>
            <div className="song-card-thumbnail"
                onClick={handleClick}>
                <img
                    src={song.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                />
            </div>
            <div className="card-data"
                onClick={handleClick}>
                <h4>{song.name}</h4>
                <h5>{song.artist.name}</h5>
                <h6>{song.duration && secondsToHoursMinutesSeconds(song.duration)}</h6>
            </div>
            {/* <div className="add-to-Queue">
                <button
                    onClick={handleAddToQueueBtn}
                    className="material-symbols-outlined icon-btn">
                    add_circle
                </button>
            </div> */}
        </>
    )
}

export const VideoCard = ({ video }: videos) => {
    const setCurrPlayingIndex = useQueueState(state => state.setCurrPlayingIndex)
    const currQueue = useQueueState(state => state.queue)
    const addToQueueAndPlay = useQueueState(state => state.addToQueueAndPlay)
    const addToQueue = useQueueState(state => state.addToQueue)

    const handleClick = async () => {
        let inQueueAt: number = -1;

        for (let i = 0; i < ((currQueue) ? currQueue.length : 0); i++) {
            if (currQueue && currQueue[i].metadata.videoId === video.videoId) {
                inQueueAt = i
                break
            }
        }
        if (inQueueAt === -1) {
            let data: Track = {
                metadata: video,
                audioSrc: ''
            }
            console.log('shit');

            addToQueueAndPlay(data, currQueue)
        } else {
            setCurrPlayingIndex(inQueueAt)
        }
    }

    const handleAddToQueueBtn = async () => {
        let inQueueAt: number = -1;

        for (let i = 0; i < ((currQueue) ? currQueue.length : 0); i++) {
            if (currQueue && currQueue[i].metadata.videoId === video.videoId) {
                inQueueAt = i
                break
            }
        }
        if (inQueueAt === -1) {
            const response = await axios.get('/api/ytm?action=getStream&videoId=' + video.videoId);
            let data: Track = {
                metadata: video,
                audioSrc: await response.data[1].url
            }

            addToQueue(data, currQueue)
        }
    }
    return (
        <>
            <div className="video-card-thumbnail"
                onClick={handleClick}>
                <img
                    src={video.thumbnails[0].url}
                    alt=""
                    onError={(e) => e.currentTarget.src = defaultImage.src}
                />
            </div>
            <div className="card-data"
                onClick={handleClick}>
                <h4>{video.name}</h4>
                <h5>{video.artist.name}</h5>
                <h6>{video.duration && secondsToHoursMinutesSeconds(video.duration)}</h6>
            </div>
            {/* <div className="add-to-Queue">
                <button
                    onClick={handleAddToQueueBtn}
                    className="material-symbols-outlined icon-btn">
                    add_circle
                </button>
            </div> */}
        </>
    )
}