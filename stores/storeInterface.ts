import {
    AlbumFull,
    ArtistFull,
    HomePageContent,
    PlaylistFull,
    SearchResult,
    SongDetailed,
    SongFull,
    VideoDetailed,
    VideoFull
} from "ytmusic-api/dist/@types/types"

export interface HomeFeedsState {
    homeFeeds: [HomePageContent] | []
    resetHomeFeeds: () => void
    setHomeFeeds: (data: [HomePageContent]) => void
}

export interface SearchQueryState {
    query: string,
    setSearchQueryState: (query: string) => void
}

export interface PageState {
    page: string,
    setPage: (page: string) => void
    prevPage: string,
    setPrevPage: (page: string) => void
    id: string | null,
    setId: (id: string | null) => void
}

export interface SearchResultState {
    result: [SearchResult] | []
    resetResult: () => void
    setResult: (data: [SearchResult]) => void
}

export interface ArtistPageState {
    artistData: ArtistFull | null
    resetArtistData: () => void
    setArtistData: (data: ArtistFull) => void
}

export interface AlbumPageState {
    albumData: AlbumFull | null
    resetAlbumData: () => void
    setAlbumData: (data: AlbumFull) => void
}

export interface PlaylistPageState {
    playlistData: PlaylistFull | null
    resetPlaylistData: () => void
    setPlaylistData: (data: PlaylistFull) => void

    playlistVideoData: [VideoDetailed] | []
    resetPlaylistVideoData: () => void
    setPlaylistVideoData: (data: [VideoDetailed]) => void
}

export type Track = {
    audioSrc: string
    metadata: VideoDetailed | SongDetailed
}

export interface QueueState {
    currPlayingIndex: number
    setCurrPlayingIndex: (index: number) => void

    queue: Array<Track> | null
    addToQueueAndPlay: (data: Track, currQueue: Array<Track> | null) => void
    addToQueue: (data: Track, currQueue: Array<Track> | null) => void
    addAllToQueue: (data: Array<Track>) => void
    clear: () => void
}

export type Lyrics = {
    videoId: string
    lyrics: Array<string>
}

export interface LyricsState {
    lyrics: Array<Lyrics>
    addLyrics: (currLyrics: Array<Lyrics>, data: Lyrics) => void
}