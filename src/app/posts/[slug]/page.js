import style from './page.module.css'

import logger from "@/logger";
import { remark } from "remark";
import html from 'remark-html'
import db from '../../../../prisma/db';
import { redirect } from 'next/navigation';
import Image from 'next/image';

async function getPostBySlug(slug) {
  try {
    const post = await db.post.findFirst({
      where: {
        slug
      },
      include: {
        author: true
      }
    })

    if (!post) {
      throw new Error(`Post not found. Slug: ${slug}`)
    }  
  
    const processedContent = await remark().use(html).process(post.markdown);
  
    const contentHtml = processedContent.toString();
  
    post.markdown = contentHtml
  
    return post
  } catch (error) {
    logger.error('Failure getting post with slug: ', {
      slug, error
    })
  }
  redirect('/not-found')
}

const PagePost = async ({ params }) => {
    const slug = params.slug
    const post = await getPostBySlug(slug)
    return (
        <section className={style.title}>
            <Image
                className={style.cover_image}
                src={post.cover} 
                width={438} 
                height={133} 
                alt={"Post's Cover"} 
            />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div dangerouslySetInnerHTML={{ __html: post.markdown}} />
        </section>
    );
};

export default PagePost;
