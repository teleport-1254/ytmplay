'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// types
import { HomePageContent } from 'ytmusic-api/dist/@types/types'

// zustand store
import { useHomePageStore, usePageStore } from '@/stores/store'

// components
import { SongCard, PlaylistBoxCard } from '@/components/Cards'

// loading pages
import HomePageLoading from '../loading/HomePageLoading'

const HomePage = () => {

    const page = usePageStore((state) => (state.page))
    const setPrevPage = usePageStore((state) => (state.setPrevPage))

    useEffect(() => {
        setPrevPage(page)
    })

    const homeFeeds = useHomePageStore((state) => state.homeFeeds)
    const setHomeFeeds = useHomePageStore((state) => state.setHomeFeeds)

    const { error, isLoading } = useQuery({
        queryKey: ['homePageData'],
        queryFn: async (): Promise<[HomePageContent]> => {
            const { data } = await axios.get('/api/ytm?action=getHome');
            setHomeFeeds(data)
            console.log('done!!!');
            return data;
        }
    })

    return (
        <>

            {
                isLoading &&
                <HomePageLoading />
            }

            {
                error &&
                <div className="error">
                    {error.message}
                </div>
            }

            {homeFeeds?.map((feed, i) => {
                return (
                    <div key={i} className='block-for-horizontal'>
                        <h2>{feed.title}</h2>

                        {
                            feed.contents[0].type === 'SONG' &&
                            <div className="home-feed-song">
                                {feed.contents.map((content, i) => {
                                    if (content.type === 'SONG') {
                                        return (
                                            <div key={i} className="result-card">
                                                <SongCard song={content} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        }
                        {
                            feed.contents[0].type === 'PLAYLIST' &&
                            <div className="horizontal-playlist">
                                {feed.contents.map((content, i) => {
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
                        }
                    </div>
                )
            })}
        </>
    )
}

export default HomePage