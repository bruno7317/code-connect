import style from './page.module.css'

import logger from "@/logger";
import { CardPost } from "./components/CardPost";
import Link from "next/link";
import db from '../../prisma/db';

async function getAllPosts(page) {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true
      }
    })
    return { data: posts, prev: null, next: null }
  } catch (error) {
    logger.error('Failure obtaining posts', { error })
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(currentPage)
  return (
    <main>
      <section className={style.carousel}>
        {posts.map( post => <CardPost key={post.id} post={post} />)}
      </section>
      <div className={style.navigation}>
        {prev && <Link className={style.previous_link} href={`/?page=${prev}`}>Previous Page</Link>}
        {next && <Link className={style.next_link} href={`/?page=${next}`}>Next Page</Link>}
      </div>
    </main>
  );
}
