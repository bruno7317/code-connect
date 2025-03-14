import style from './page.module.css'

import logger from "@/logger";
import { CardPost } from "./components/CardPost";
import Link from "next/link";
import db from '../../prisma/db';

async function getAllPosts(page) {
  try {

    const perPage = 6;
    const skip = (page - 1) * perPage;

    const prev = page > 1 ? page - 1 : null

    const totalPosts = await db.post.count()
    const totalPages = Math.ceil( totalPosts / perPage );
    const next = page < totalPages ? page + 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true
      }
    })
    return { data: posts, prev, next }
  } catch (error) {
    logger.error('Failure obtaining posts', { error })
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || 1)
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
