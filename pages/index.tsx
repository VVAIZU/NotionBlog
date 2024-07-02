import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import NotionService from "@/services/notion-service";
import Head from "next/head";
import { BlogPost } from "@/@types/schema";
import BlogCard from "@/components/BlogCard";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts
    },
  }
}

const Home: NextPage = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const title = 'Test Blog';
  const description = 'Welcome to my Notion blog';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={"description"} title={"description"} content={description} />
      </Head>

      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
              Notion blog
            </h1>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
            {
              posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home