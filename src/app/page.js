import style from './page.module.css'

import logger from "@/logger";
import { CardPost } from "./components/CardPost";
import Link from "next/link";
import db from '../../prisma/db';

async function getAllPosts(page, searchTerm) {
  try {

    const where = {}

    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
    const perPage = 6;
    const skip = (page - 1) * perPage;

    const prev = page > 1 ? page - 1 : null

    const totalPosts = await db.post.count({ where })
    const totalPages = Math.ceil( totalPosts / perPage );
    const next = page < totalPages ? page + 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where,
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
  const searchTerm = searchParams?.q
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm)
  return (
    <main>
      <section className={style.carousel}>
        {posts.map( post => <CardPost key={post.id} post={post} />)}
      </section>
      <div className={style.navigation}>
        {prev && <Link className={style.previous_link} href={{ pathname: '/', query: { page: prev, q: searchTerm } }}>Previous Page</Link>}
        {next && <Link className={style.next_link} href={{ pathname: '/', query: { page: next, q: searchTerm } }}>Next Page</Link>}
      </div>
    </main>
  );
}
