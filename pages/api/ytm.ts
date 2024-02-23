// "use server"

import type { NextApiRequest, NextApiResponse } from 'next';
// import { resolve } from 'path';
import YTMusic from "ytmusic-api";
import ytdl from 'ytdl-core';

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { action } = req.query;
    const { searchType } = req.query;
    const q = (typeof req.query.q === 'string') ? req.query.q : ''

    try {
        const ytmusic = new YTMusic();
        // await ytmusic.initialize({ cookies: "domain=music.youtube.com" });
        await ytmusic.initialize();
        
        if (action === 'searchSuggestions') {
            const { q } = req.query

            if (typeof q === "string") {
                const result = await ytmusic.getSearchSuggestions(q)
                res.status(200).json(result)
            } else {
                res.status(400).json({ eror: 'no query' })
            }
        }

        else if (action === 'getAlbum') {
            const { albumId } = req.query
            if (typeof albumId === "string") {
                const result = await ytmusic.getAlbum(albumId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getArtist') {
            const { artistId } = req.query
            if (typeof artistId === "string") {
                const result = await ytmusic.getArtist(artistId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getArtistSongs') {
            const { artistId } = req.query
            if (typeof artistId === "string") {
                const result = await ytmusic.getArtistSongs(artistId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getHome') {
            const result = await ytmusic.getHome()
            res.status(200).json(result)
        }

        else if (action === 'getLyrics') {
            const { videoId } = req.query
            if (typeof videoId === "string") {
                const result = await ytmusic.getLyrics(videoId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getPlaylist') {
            const { playlistId } = req.query
            if (typeof playlistId === "string") {
                const result = await ytmusic.getPlaylist(playlistId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getPlaylistVideos') {
            const { playlistId } = req.query
            if (typeof playlistId === "string") {
                const result = await ytmusic.getPlaylistVideos(playlistId)
                res.status(200).json(result)
            }
        }

        else if (action === 'getStream') {
            const { videoId } = req.query
            if (typeof videoId === "string") {
                try {
                    const videourl = `https://www.youtube.com/watch?v=${videoId}`;
                    const videoInfo = await ytdl.getInfo(videourl);
                    const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
                    // resolve();
                    res.status(200).json(audioFormats);
                } catch (error) {
                    res.status(400).json(error);
                }
            }
        }

        else if (action === 'search' && q && searchType) {
            try {
                switch (searchType) {
                    case 'all': {
                        const result = await ytmusic.search(q)
                        res.status(200).json(result)
                        break;
                    }

                    case 'song': {
                        const result = await ytmusic.searchSongs(q)
                        res.status(200).json(result)
                        break;
                    }

                    case 'video': {
                        const result = await ytmusic.searchVideos(q)
                        res.status(200).json(result)
                        break;
                    }

                    case 'artist': {
                        const result = await ytmusic.searchArtists(q)
                        res.status(200).json(result)
                        break;
                    }

                    case 'album': {
                        const result = await ytmusic.searchAlbums(q)
                        res.status(200).json(result)
                        break;
                    }

                    case 'playlist': {
                        const result = await ytmusic.searchPlaylists(q)
                        res.status(200).json(result)
                        break;
                    }

                    default: {
                        res.status(400).json({ error: 'searchType should be song, video, artist, album, playlist' })
                    }
                }
            } catch (error) {
                res.status(400).json({ error: 'SomeThing went wrong' })
            }

        } else {
            res.status(400).json({ eror: 'no query' })
        }
    } catch (error: any) {
        console.log(error);
        
        res.status(400).json({ error: 'some scrapper error' })
    }
}