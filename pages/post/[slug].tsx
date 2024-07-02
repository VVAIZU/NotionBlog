import NotionService from "@/services/notion-service";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export async function getStaticPaths() {
    const notionService = new NotionService();

    const posts = await notionService.getPublishedBlogPosts();

    //because we are generating static paths, you will have to redeploy your site when you make a change in Notion
    const paths = posts.map(post => {
        return `/post/${post.slug}`
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const notionService = new NotionService()

    // @ts-ignore
    const p = await notionService.getSingleBlogPost(context.params?.slug)

    if (!p) {
        throw 'Error'
    }

    return {
        props: {
            markdown: p.markdown,
            post: p.post
        },
    }
}

const Post = ({ markdown, post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name={"og:description"} title={"og:description"} content={post.description} />
                <meta name={"og:image"} title={"og:title"} content={post.cover} />
            </Head>

            <div className="min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center">
                        <article className="prose">
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post