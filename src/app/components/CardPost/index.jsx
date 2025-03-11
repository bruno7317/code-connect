import style from './cardpost.module.css'

import Image from "next/image"
import { Avatar } from "../Avatar"
import Link from 'next/link'

export const CardPost = ({ post }) => {
    return (
        <Link href={`/posts/${post.slug}`} className={style.link}>
            <article className={style.card}>
                <header className={style.header}>
                    <figure>
                        <Image
                            className={style.cover_image}
                            src={post.cover} 
                            width={438} 
                            height={133} 
                            alt={"Post's Cover"} 
                        />
                    </figure>
                </header>
                <section className={style.text}>
                    <h2>{post.title}</h2>
                    <p className={style.paragraph}>{post.body}</p>
                </section>
                <footer>
                    <Avatar
                        imgSrc={post.author.avatar}
                        name={post.author.username}
                    />
                </footer>
            </article>
        </Link>
    )
}