'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// components
import Navbar from '../components/Navbar';
import BottomBar from '@/components/BottomBar';

// stores
import { usePageStore } from '@/stores/store';

// pages
import Search from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import PlaylistPage from './pages/PlaylistPage';

const queryClient = new QueryClient();

const Page = () => {

    const page = usePageStore((state) => state.page)

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <div className="pages">
                {
                    page === 'home' &&
                    <HomePage />
                }
                {
                    page === 'search' &&
                    <Search />
                }
                {
                    page === 'artist' &&
                    <ArtistPage />
                }
                {
                    page === 'album' &&
                    <AlbumPage />
                }
                {
                    page === 'playlist' &&
                    <PlaylistPage />
                }
            </div >
            <BottomBar />
        </QueryClientProvider>
    )
}

export default Page
