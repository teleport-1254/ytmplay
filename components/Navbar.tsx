'use client'

import Link from "next/link"
import Image from "next/image"

// images
import logo from '../statics/images/favicon.png'

// stores
import { usePageStore } from "@/stores/store"
import { useState } from "react"

const Navbar = () => {
    const setPage = usePageStore((state) => state.setPage)

    const [theme, setTheme] = useState<string | null>('Dark')

    return (
        <header>
            {
                theme === 'Dark' &&
                <link rel="stylesheet" href="/Darktheme.css" />
            }
            {
                theme === 'Blood' &&
                <link rel="stylesheet" href="/Bloodtheme.css" />
            }
            {
                theme === 'Ocean' &&
                <link rel="stylesheet" href="/Oceantheme.css" />
            }
            {
                theme === 'Light' &&
                <link rel="stylesheet" href="/Lighttheme.css" />
            }

            <div className="container">
                <Link href={''} onClick={() => setPage('home')}>
                    <Image src={logo} alt="YtmPlay" loading="eager" width={40} height={40} />
                    <h1>YtmPlay</h1>
                </Link>
                <div className="btn-group">
                    <button className="icon-btn material-symbols-outlined" onClick={() => setPage('search')}>
                        search
                    </button>

                    < label className="dropdown">
                        <div className="dropdown-button">
                            <span className="material-symbols-outlined">
                                palette
                            </span>
                        </div>
                        <input type="checkbox" className="dropdown-input" />
                        <ul className="dropdown-menu">
                            <li onClick={e => setTheme(e.currentTarget.innerText)}>Dark</li>
                            <li onClick={e => setTheme(e.currentTarget.innerText)}>Blood</li>
                            <li onClick={e => setTheme(e.currentTarget.innerText)}>Ocean</li>
                            <li onClick={e => setTheme(e.currentTarget.innerText)}>Light</li>
                        </ul>
                    </label>
                </div>
            </div>
        </header>
    )
}

export default Navbar
