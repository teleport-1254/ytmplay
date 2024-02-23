'use client'
import React, { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// stores
import { SearchResult } from 'ytmusic-api'
import {
    useSearchQueryStore,
    useSearchResultSongStore,
    useSearchResultVideoStore,
    useSearchResultAlbumStore,
    useSearchResultArtistStore,
    useSearchResultPlaylistStore,
    usePageStore
} from '@/stores/store'

// components
import {
    SongCard,
    VideoCard,
    ArtistCard,
    AlbumCard,
    PlaylistCard
} from '@/components/Cards'
import {
    AlbumResultLoading,
    ArtistResultLoading,
    PlaylistResultLoading,
    SongResultLoading,
    VideoResultLoading
} from '../loading/SearchResultLoading'

const Search = () => {

    const searchQueryState = useSearchQueryStore((state) => (state.query))
    const setSearchQueryState = useSearchQueryStore((state) => (state.setSearchQueryState))
    const [searchQuery, setSearchQuery] = useState(searchQueryState)

    const [searchSuggestions, setSearchSuggestions] = useState<[string] | []>([])
    // search suggestions
    const { refetch: fetchSearchSuggestions } = useQuery({
        queryKey: ['searchSuggestions'],
        queryFn: async (): Promise<[string]> => {
            const { data } = await axios.get('/api/ytm?action=searchSuggestions&q=' + searchQuery);
            setSearchSuggestions(data)
            return data;
        },
        enabled: false
    })

    const handleSuggestionsCloseBtn = () => {
        setSearchSuggestions([])
    }

    const page = usePageStore((state) => (state.page))
    const setPrevPage = usePageStore((state) => (state.setPrevPage))

    useEffect(() => {
        setPrevPage(page)
    })

    // store for songs
    const searchResultSong = useSearchResultSongStore((state) => state.result)
    const setSearchResultSong = useSearchResultSongStore((state) => state.setResult)
    const resetSearchResultSong = useSearchResultSongStore((state) => state.resetResult)

    // search songs
    const { error: songError, isFetching: loadingSong, refetch: fetchSong } = useQuery({
        queryKey: ['searchResultSongData'],
        queryFn: async (): Promise<[SearchResult]> => {
            const { data } = await axios.get('/api/ytm?action=search&searchType=song&q=' + searchQuery);
            setSearchResultSong(data)
            return data;
        },
        enabled: false
    })

    // store for videos
    const searchResultVideo = useSearchResultVideoStore((state) => state.result)
    const setSearchResultVideo = useSearchResultVideoStore((state) => state.setResult)
    const resetSearchResultVideo = useSearchResultVideoStore((state) => state.resetResult)

    // search videos
    const { error: videoError, isFetching: loadingVideo, refetch: fetchVideo } = useQuery({
        queryKey: ['searchResultVideoData'],
        queryFn: async (): Promise<[SearchResult]> => {
            const { data } = await axios.get('/api/ytm?action=search&searchType=video&q=' + searchQuery);
            setSearchResultVideo(data)
            return data;
        },
        enabled: false
    })

    // store for artist
    const searchResultArtist = useSearchResultArtistStore((state) => state.result)
    const setSearchResultArtist = useSearchResultArtistStore((state) => state.setResult)
    const resetSearchResultArtist = useSearchResultArtistStore((state) => state.resetResult)

    // search artist
    const { error: artistError, isFetching: loadingArtist, refetch: fetchArtist } = useQuery({
        queryKey: ['searchResultArtistData'],
        queryFn: async (): Promise<[SearchResult]> => {
            const { data } = await axios.get('/api/ytm?action=search&searchType=artist&q=' + searchQuery);
            setSearchResultArtist(data);
            return data;
        },
        enabled: false
    })

    // store for album
    const searchResultAlbum = useSearchResultAlbumStore((state) => state.result)
    const setSearchResultAlbum = useSearchResultAlbumStore((state) => state.setResult)
    const resetSearchResultAlbum = useSearchResultAlbumStore((state) => state.resetResult)

    // search album
    const { error: albumError, isFetching: loadingAlbum, refetch: fetchAlbum } = useQuery({
        queryKey: ['searchResultAlbumData'],
        queryFn: async (): Promise<[SearchResult]> => {
            const { data } = await axios.get('/api/ytm?action=search&searchType=album&q=' + searchQuery);
            setSearchResultAlbum(data);
            return data;
        },
        enabled: false
    })

    // store for playlist
    const searchResultPlaylist = useSearchResultPlaylistStore((state) => state.result)
    const setSearchResultPlaylist = useSearchResultPlaylistStore((state) => state.setResult)
    const resetSearchResultPlaylist = useSearchResultPlaylistStore((state) => state.resetResult)

    // search playlist
    const { error: playlistError, isFetching: loadingPlaylist, refetch: fetchPlaylist } = useQuery({
        queryKey: ['searchResultPlaylistData'],
        queryFn: async (): Promise<[SearchResult]> => {
            const { data } = await axios.get('/api/ytm?action=search&searchType=playlist&q=' + searchQuery);
            setSearchResultPlaylist(data);
            return data;
        },
        enabled: false
    })


    const [resultPage, setResultPage] = useState('songs')
    const [searchBtnClicked, setSearchBtnClicked] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | null) => {
        e?.preventDefault()
        if (searchQuery.length > 1) {
            setSearchSuggestions([])
            setSearchQueryState(searchQuery)
            setSearchBtnClicked(true)
            // removing old data
            resetSearchResultSong()
            resetSearchResultVideo()
            resetSearchResultArtist()
            resetSearchResultAlbum()
            resetSearchResultPlaylist()

            // getting new data
            switch (resultPage) {
                case 'songs':
                    await fetchSong()
                    break
                case 'videos':
                    await fetchVideo()
                    break
                case 'artists':
                    await fetchArtist()
                    break
                case 'albums':
                    await fetchAlbum()
                    break
                case 'playlists':
                    await fetchPlaylist()
                    break
                default:
                    console.log('no result page selected');
            }
        }
    }

    const handleTabBtn: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        const value = e.currentTarget.value
        setResultPage(value)
        switch (value) {
            case 'songs':
                if (searchResultSong.length === 0) await fetchSong()
                break
            case 'videos':
                if (searchResultVideo.length === 0) await fetchVideo()
                break
            case 'artists':
                if (searchResultArtist.length === 0) await fetchArtist()
                break
            case 'albums':
                if (searchResultAlbum.length === 0) await fetchAlbum()
                break
            case 'playlists':
                if (searchResultPlaylist.length === 0) await fetchPlaylist()
                break
            default:
                console.log('no result page selected');
        }
    }

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <button type='submit' className='material-symbols-outlined icon-btn'>search</button>
                <input
                    type="text"
                    placeholder='Search'
                    onChange={e => {
                        setSearchQuery(e.target.value)
                        if (e.target.value.length > 0)
                            fetchSearchSuggestions()
                    }}
                    value={searchQuery}
                    autoFocus
                    spellCheck="false"
                // onBlur={() => {
                //     setTimeout(() => {
                //         setSearchSuggestions([])
                //     }, 100)
                // }}
                />
            </form>

            <div className="suggestions">
                {
                    (!loadingAlbum &&
                        !loadingArtist &&
                        !loadingSong &&
                        !loadingPlaylist &&
                        !loadingVideo) &&
                    (searchSuggestions.length > 0) &&
                    !searchBtnClicked &&
                    <ul>
                        <button className="icon-btn close-btn material-symbols-outlined"
                            onClick={handleSuggestionsCloseBtn}>
                            close
                        </button>
                        {searchSuggestions.map((suggestion, i) => {
                            return (
                                <li key={i} onClick={() => {
                                    setSearchQuery(suggestion)
                                    setSearchQueryState(searchQuery)
                                    setSearchSuggestions([])
                                }}>
                                    {suggestion}
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>

            {
                (searchBtnClicked ||
                    searchResultSong.length > 0 ||
                    searchResultVideo.length > 0 ||
                    searchResultArtist.length > 0 ||
                    searchResultAlbum.length > 0 ||
                    searchResultPlaylist.length > 0) &&
                <div className="tabs">
                    <button value={'songs'} className={resultPage === 'songs' ? 'on' : 'off'} onClick={handleTabBtn}>Songs</button>
                    <button value={'videos'} className={resultPage === 'videos' ? 'on' : 'off'} onClick={handleTabBtn}>Videos</button>
                    <button value={'artists'} className={resultPage === 'artists' ? 'on' : 'off'} onClick={handleTabBtn}>Artists</button>
                    <button value={'albums'} className={resultPage === 'albums' ? 'on' : 'off'} onClick={handleTabBtn}>Albums</button>
                    <button value={'playlists'} className={resultPage === 'playlists' ? 'on' : 'off'} onClick={handleTabBtn}>Playlists</button>
                </div>
            }

            <div className="search-result">
                <div className="result-block" id='result'>
                    {
                        resultPage === 'songs' &&
                        <>
                            {
                                songError &&
                                <div className="error">SomeThing went wrong</div>
                            }
                            {
                                loadingSong &&
                                <SongResultLoading />
                            }
                            {
                                searchResultSong.length > 0 &&
                                <div className="result-content">
                                    {searchResultSong.map(((result, i) => {
                                        if (result.type === 'SONG') {
                                            return (
                                                <div key={i} className='result-card'>
                                                    <SongCard song={result} />
                                                </div>
                                            )
                                        }
                                    }))}
                                </div>
                            }
                        </>
                    }

                    {
                        resultPage === 'videos' &&
                        <>
                            {
                                videoError &&
                                <div className='error'>SomeThing went wrong</div>
                            }
                            {
                                loadingVideo &&
                                <VideoResultLoading />
                            }
                            {
                                searchResultVideo.length > 0 &&
                                <div className="result-content">
                                    {searchResultVideo.map(((result, i) => {
                                        if (result.type === 'VIDEO') {
                                            return (
                                                <div key={i} className='result-card'>
                                                    <VideoCard video={result} />
                                                </div>
                                            )
                                        }
                                    }))}
                                </div>
                            }
                        </>
                    }

                    {
                        resultPage === 'artists' &&
                        <>

                            {
                                artistError &&
                                <div className="error">SomeThing went wrong</div>
                            }
                            {
                                loadingArtist &&
                                <ArtistResultLoading />
                            }
                            {
                                searchResultArtist.length > 0 &&
                                <div className="result-content">
                                    {searchResultArtist.map(((result, i) => {
                                        if (result.type === 'ARTIST') {
                                            return (
                                                <div key={i} className='result-card'>
                                                    <ArtistCard artist={result} />
                                                </div>
                                            )
                                        }
                                    }))}
                                </div>
                            }
                        </>
                    }

                    {
                        resultPage === 'albums' &&
                        <>
                            {
                                albumError &&
                                <div className="error">SomeThing went wrong</div>
                            }
                            {
                                loadingAlbum &&
                                <AlbumResultLoading />
                            }
                            {
                                searchResultAlbum.length > 0 &&
                                <div className="result-content">
                                    {searchResultAlbum.map(((result, i) => {
                                        if (result.type === 'ALBUM') {
                                            return (
                                                <div key={i} className='result-card'>
                                                    <AlbumCard album={result} />
                                                </div>
                                            )
                                        }
                                    }))}
                                </div>
                            }
                        </>
                    }

                    {
                        resultPage === 'playlists' &&
                        <>
                            {
                                playlistError &&
                                <div className="error">SomeThing went wrong</div>
                            }
                            {
                                loadingPlaylist &&
                                <PlaylistResultLoading />
                            }
                            {
                                searchResultPlaylist.length > 0 &&
                                <div className="result-content">
                                    {searchResultPlaylist.map(((result, i) => {
                                        if (result.type === 'PLAYLIST') {
                                            return (
                                                <div key={i} className='result-card'>
                                                    <PlaylistCard playlist={result} />
                                                </div>
                                            )
                                        }
                                    }))}
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
