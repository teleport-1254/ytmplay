import { create } from "zustand";

// types from ytmusic-api
import { AlbumFull, ArtistFull, HomePageContent, PlaylistFull, SearchResult, VideoDetailed } from "ytmusic-api/dist/@types/types";

// state interfaces
import {
    HomeFeedsState,
    SearchQueryState,
    ArtistPageState,
    SearchResultState,
    PageState,
    AlbumPageState,
    PlaylistPageState,
    QueueState,
    Track,
    LyricsState,
    Lyrics
} from "./storeInterface";

// home page data
export const useHomePageStore = create<HomeFeedsState>((set) => ({
    homeFeeds: [],
    resetHomeFeeds: () => set({ homeFeeds: [] }),
    setHomeFeeds: (data: [HomePageContent]) => set(() => ({ homeFeeds: [...data] }))
}))

// search query state
export const useSearchQueryStore = create<SearchQueryState>((set) => ({
    query: '',
    setSearchQueryState: (query: string) => set(() => ({ query: query }))
}))

// page state
export const usePageStore = create<PageState>((set) => ({
    page: 'search',
    prevPage: '',
    id: null,
    setPage: (page: string) => set(() => ({ page: page })),
    setPrevPage: (page: string) => set(() => ({ prevPage: page })),
    setId: (id: string | null) => set(() => ({ id: id }))
}))

// diifrent stores for all search results
export const useSearchResultSongStore = create<SearchResultState>((set) => ({
    result: [],
    resetResult: () => set({ result: [] }),
    setResult: (data: [SearchResult]) => set(() => ({ result: [...data] }))
}))

export const useSearchResultVideoStore = create<SearchResultState>((set) => ({
    result: [],
    resetResult: () => set({ result: [] }),
    setResult: (data: [SearchResult]) => set(() => ({ result: [...data] }))
}))

export const useSearchResultAlbumStore = create<SearchResultState>((set) => ({
    result: [],
    resetResult: () => set({ result: [] }),
    setResult: (data: [SearchResult]) => set(() => ({ result: [...data] }))
}))

export const useSearchResultArtistStore = create<SearchResultState>((set) => ({
    result: [],
    resetResult: () => set({ result: [] }),
    setResult: (data: [SearchResult]) => set(() => ({ result: [...data] }))
}))

export const useSearchResultPlaylistStore = create<SearchResultState>((set) => ({
    result: [],
    resetResult: () => set({ result: [] }),
    setResult: (data: [SearchResult]) => set(() => ({ result: [...data] }))
}))

// artist page store
export const useArtistPageStore = create<ArtistPageState>((set) => ({
    artistData: null,
    resetArtistData: () => set({ artistData: null }),
    setArtistData: (data: ArtistFull) => set(() => ({ artistData: data }))
}))

// album page store
export const useAlbumPageStore = create<AlbumPageState>((set) => ({
    albumData: null,
    resetAlbumData: () => set({ albumData: null }),
    setAlbumData: (data: AlbumFull) => set(() => ({ albumData: data }))
}))

// Playlist page store
export const usePlaylistPageStore = create<PlaylistPageState>((set) => ({
    playlistData: null,
    resetPlaylistData: () => set({ playlistData: null }),
    setPlaylistData: (data: PlaylistFull) => set(() => ({ playlistData: data })),

    playlistVideoData: [],
    resetPlaylistVideoData: () => set({ playlistVideoData: [] }),
    setPlaylistVideoData: (data: [VideoDetailed]) => set(() => ({ playlistVideoData: data }))
}))

// Queue state
export const useQueueState = create<QueueState>((set) => ({
    currPlayingIndex: 0,
    setCurrPlayingIndex: (index: number) => set({ currPlayingIndex: index }),

    queue: null,
    addAllToQueue: (data: Array<Track>) => set({ queue: [...data] }),
    addToQueueAndPlay: (data: Track, currQueue: Array<Track> | null) => {
        if (!currQueue) {
            set({ queue: [data] })
        } else {
            // don't know why, but when i do this it play's the song at
            // the end of the queue
            set({ queue: [data, ...currQueue] })
        }
    },
    addToQueue: (data: Track, currQueue: Array<Track> | null) => {
        if (!currQueue) {
            set({ queue: [data] })
        } else {
            // and thia just adds the song to the end,
            // but does'nt play's it
            currQueue.push(data)
            set({ queue: currQueue })
        }
    },
    clear: () => set({ queue: null })
}))

// lyrics state
export const useLyricsState = create<LyricsState>((set) => ({
    lyrics: [],
    addLyrics: (currLyrics: Array<Lyrics>, data: Lyrics) => set({lyrics: [...currLyrics, data]})
}))