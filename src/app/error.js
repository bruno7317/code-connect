'use client'

import { ArrowBack } from "./components/icons/ArrowBack"
import { useEffect } from "react"
import style from './error/error.module.css'
import Image from "next/image"
import banner from './error/500.png'
import { Heading } from "./components/Heading"
import Link from "next/link"

export default function Error({ error }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={style.container}>
            <Image src={banner} />
            <Heading>Oops, something went wrong.</Heading>
            <p className={style.text}>We couldn't load the page, go back to keep browsing.</p>
            <Link href={'/'}>
                Go back to the feed <ArrowBack color="#81FE88" />
            </Link>
        </div>
    )
}