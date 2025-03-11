import style from './page.module.css'

import logger from "@/logger";
import { remark } from "remark";
import html from 'remark-html'

async function getPostBySlug(slug) {
  const response = await fetch(`http://localhost:3042/posts?slug=${slug}`)
  if (!response.ok) {
    logger.error("Oops, something went wrong!");
    return {}
  }
  logger.info("Posts retrieved successfully.");
  const data = await response.json()
  if (data.length == 0) return {}

  const post = data[0];
  const processedContent = await remark().use(html).process(post.markdown);

  const contentHtml = processedContent.toString();

  post.markdown = contentHtml

  return post
}

const PagePost = async ({ params }) => {
    const slug = params.slug
    const post = await getPostBySlug(slug)
    return (
        <section className={style.title}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div dangerouslySetInnerHTML={{ __html: post.markdown}} />
        </section>
    );
};

export default PagePost;
