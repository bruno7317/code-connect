import Image from 'next/image'
import style from './error/error.module.css'
import banner from './error/404.png'
import { Heading } from './components/Heading'
import Link from 'next/link'
import { ArrowBack } from './components/icons/ArrowBack'

export default function NotFound() {
    return (
        <div className={style.container}>
            <Image src={banner} />
            <Heading>Oops, page not found.</Heading>
            <p className={style.text}>You can go back to keep browsing.</p>
            <Link href={'/'}>
                Go back to the feed <ArrowBack color="#81FE88" />
            </Link>
        </div>
    )
}