import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// for color theme
import "./globals.css";
import "./page.css";

// styles
import '../styles/navbar.css'
import '../styles/home.css'
import '../styles/search.css'
import '../styles/cards.css'
import '../styles/player.css'

const poppins = Poppins({ weight: ['100', '300', '500', '700', '900'], subsets: [] })
const queryClient = new QueryClient();

export const metadata: Metadata = {
    title: "YtmPlay",
    description: "YtmPlay is an online web music player built with Next.js and React, styled with vanilla CSS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const[page, setPage] = useState(1)

    return (
        <html lang="en">
            <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    );
}