import style from './page.module.css'

import logger from "@/logger";
import { CardPost } from "./components/CardPost";
import Link from "next/link";

const post = {
  "id": 1,
  "cover": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png",
  "title": "Introdução ao React",
  "slug": "introducao-ao-react",
  "body": "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
  "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
  "author": {
      "id": 101,
      "name": "Ana Beatriz",
      "username": "anabeatriz_dev",
      "avatar": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png"
  }
}

async function getAllPosts(page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)
  if (!response.ok) {
    logger.error('Oops, something went wrong!')
  } else {
    logger.info('Posts retrieved successfully.')
  }
  return response.json()
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
