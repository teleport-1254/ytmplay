import { useLyricsState, usePageStore, useQueueState } from '@/stores/store';
import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from '@/statics/images/favicon.png';
import axios from 'axios';
import { SongCard, VideoCard } from './Cards';
import CircularLoading from './CircularLoading';
import { useAudioHooks } from '@/hooks/useAudioHooks';
import { Lyrics } from '@/stores/storeInterface';
import Skeleton from 'react-loading-skeleton';


const BottomBar = () => {
    const queue = useQueueState(state => state.queue)
    const currPlayingIndex = useQueueState(state => state.currPlayingIndex)
    const setCurrPlayingIndex = useQueueState(state => state.setCurrPlayingIndex)


    // handling audio src
    const [audioSrc, setAudioSrc] = useState('')
    const audioHook = useAudioHooks()

    const fetchSongSrc = async () => {
        if (queue && queue[currPlayingIndex].audioSrc?.length === 0) {
            audioHook?.pause()
            const response = await axios.get('/api/ytm?action=getStream&videoId=' + queue[currPlayingIndex].metadata?.videoId);
            const audioUrl = await response.data[1].url

            queue[currPlayingIndex].audioSrc = audioUrl
            setAudioSrc(audioUrl)
        } else if (queue) {
            setAudioSrc(queue[currPlayingIndex].audioSrc)
        }
    }

    useEffect(() => {
        fetchSongSrc()
    }, [currPlayingIndex])

    useEffect(() => {
        setCurrPlayingIndex(0)
        fetchSongSrc()
    }, [queue])

    const [loadingSong, setLoadingSong] = useState(false)
    useEffect(() => {
        let paused: boolean | undefined = audioHook.isPaused()
        if (typeof paused === 'boolean') {
            setLoadingSong(paused)
        }

        return () => {
            paused = undefined
        }
    })

    // handling media additional btns
    const handlePreviousBtnClick = () => {
        if (queue && currPlayingIndex > 0) {
            setCurrPlayingIndex(currPlayingIndex - 1)
        }
    }

    const handleNextBtnClick = () => {
        if (queue && currPlayingIndex < queue?.length - 1) {
            setCurrPlayingIndex(currPlayingIndex + 1)
        }
    }

    const [showQueue, setShowQueue] = useState(false)
    const handleQueueBtn = () => {
        const queueDiv = document.getElementsByClassName('queue')[0]
        if (queueDiv && !showQueue) {
            queueDiv.classList.add('open')
            setShowQueue(prev => !prev)
        } else if (queueDiv) {
            queueDiv.classList.remove('open')
            setTimeout(() => {
                setShowQueue(prev => !prev)
            }, 400)
        }
        // setShowQueue(prev => !prev)
    }


    // handling lyrics
    const lyrics = useLyricsState(state => state.lyrics)
    const addLyrics = useLyricsState(state => state.addLyrics)

    const [currSongLyrics, setCurrSongLyrics] = useState<Array<string>>([])
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const fetchLyrics = async () => {
        if (queue) {
            setLoadingLyrics(true)
            const videoId = queue[currPlayingIndex].metadata.videoId
            let index = -1

            for (let i = 0; i < lyrics.length; i++) {
                if (videoId === lyrics[i].videoId) {
                    index = i
                    break
                }
            }

            if (index > -1) {
                setCurrSongLyrics(lyrics[index].lyrics)
            } else {
                const response = await axios.get('/api/ytm?action=getLyrics&videoId=' + videoId);
                const data = await response.data
                const lyricsObj: Lyrics = {
                    videoId,
                    lyrics: (data) ? data : []
                }
                console.log(lyricsObj);

                addLyrics(lyrics, lyricsObj)
                setCurrSongLyrics(lyricsObj.lyrics)
            }
            setLoadingLyrics(false)
        }
    }

    const [showLyrics, setShowLyrics] = useState(false)

    useEffect(() => {
        if (showLyrics) {
            fetchLyrics()
        }
    }, [showLyrics, currPlayingIndex])

    const handleLyricsBtn = async () => {
        const lyricsDiv = document.getElementsByClassName('lyrics')[0]
        if (lyricsDiv && !showLyrics) {
            lyricsDiv.classList.add('open')
            setShowLyrics(prev => !prev)
        } else if (lyricsDiv) {
            lyricsDiv.classList.remove('open')
            setTimeout(() => {
                setShowLyrics(prev => !prev)
            }, 400)
        }
    }

    // goto artist page
    const setPage = usePageStore(state => state.setPage)
    const setId = usePageStore(state => state.setId)
    const handleArtistClick = (artistId: string | null) => {
        if (artistId) {
            setId(artistId)
            console.log(artistId);

            setPage('artist')
        }
    }

    return (
        <footer>
            {
                queue && queue.length > 0 &&
                <>
                    {/* 
                    <div className="backgroundImage">
                        <img
                            src={queue[currPlayingIndex].metadata.thumbnails[queue[currPlayingIndex].metadata.thumbnails.length - 1].url}
                            alt=""
                            onError={(e) => e.currentTarget.src = defaultImage.src}
                        />
                    </div> */}
                    <div className='bottom-bar'>
                        <div className="song-info">
                            <img
                                src={queue[currPlayingIndex].metadata.thumbnails[0].url}
                                alt=""
                                width={60}
                                height={60}
                                onError={(e) => e.currentTarget.src = defaultImage.src}
                            />
                            {
                                loadingSong &&
                                <div className="circular-loading">
                                    <CircularLoading />
                                </div>
                            }

                            <div className="grp">
                                <h3>{queue[currPlayingIndex].metadata.name}</h3>
                                <h4 onClick={() => handleArtistClick(queue[currPlayingIndex].metadata.artist.artistId)}>{queue[currPlayingIndex].metadata.artist.name}</h4>
                            </div>
                        </div>


                        <AudioPlayer
                            src={audioSrc}
                            showSkipControls={true}
                            showJumpControls={false}
                            autoPlay={true}
                            onClickPrevious={handlePreviousBtnClick}
                            onClickNext={handleNextBtnClick}
                            onEnded={handleNextBtnClick}
                        />

                        <div className="player-btn-grp">
                            <button
                                onClick={handleQueueBtn}
                                className='icon-btn material-symbols-outlined'>
                                queue_music
                            </button>
                            <button
                                onClick={handleLyricsBtn}
                                className='icon-btn material-symbols-outlined'>
                                lyrics
                            </button>
                        </div>

                        <div className='queue'>
                            {
                                showQueue && queue.length > 0 &&
                                <>
                                    <h3>Queue</h3>
                                    <div className="queue-list">
                                        {queue.map((song, i) => {
                                            return (
                                                <div key={i} className='result-card'>
                                                    {
                                                        song.metadata.type === 'SONG' ?
                                                            <SongCard song={song.metadata} /> :
                                                            <VideoCard video={song.metadata} />
                                                    }
                                                    {
                                                        i === currPlayingIndex &&
                                                        <img
                                                            className='nowPlaying'
                                                            src={defaultImage.src}
                                                            alt=""
                                                            width={40}
                                                            height={40}
                                                        />
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                        </div>

                        <div className="lyrics">
                            {
                                showLyrics &&
                                <>
                                    {
                                        loadingLyrics &&
                                        <>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                            <h4><Skeleton className='loading' width={'300px'} /></h4>
                                        </>
                                    }
                                    {
                                        !loadingLyrics && currSongLyrics.length === 0 &&
                                        <h4>No lyrics found!</h4>
                                    }
                                    {
                                        !loadingLyrics && currSongLyrics.length !== 0 &&
                                        <>
                                            {currSongLyrics.map((line, i) => {
                                                return (
                                                    <h4 key={i}>{line}</h4>
                                                )
                                            })}
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </footer>
    )
}

export default BottomBar
