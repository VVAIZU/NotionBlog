import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import NotionService from "@/services/notion-service";
import Head from "next/head";
import { BlogPost } from "@/@types/schema";
import BlogCard from "@/components/BlogCard";
import Posts from "@/sections/Posts";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();
  const postsWithPets = posts.filter(post => post.tags.some(tag => tag.name === 'pet'));
  const filteredPosts = posts.filter(post => post.tags.some(tag => tag.name === 'pet'));

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const title = 'Test Blog';
  const description = 'Welcome to my Notion blog';

  // Функция для получения самого последнего поста из массива
  const getLastPost = (posts: BlogPost[]) => {
    if (posts.length === 0) {
      return null; // Если массив пустой, вернуть null
    }
    // Сортируем по дате в убывающем порядке и берем первый элемент
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const latestDogPost = getLastPost(posts.filter(post => post.tags.some(tag => tag.name === 'dog')));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={'description'} content={description} />
      </Head>

      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
              Notion blog
            </h1>
          </div>
          <section id="posts" className="posts py-10 px-4 md:px-6 lg:px-8">
            <div className="fade-up">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold mb-4">Posts with Pets</h3>
                  <div className="border-start border-gray-300">
                    <BlogCard key={latestDogPost.id} post={latestDogPost} />
                    {/* {posts.filter(post => post.tags.some(tag => tag.name === 'dog')).map((post: BlogPost) => (
                      <BlogCard key={post.id} post={post} />
                    ))} */}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="md:w-1/2 border-start border-gray-300">
                      {
                        posts.slice(0, 3).map((post: BlogPost) => (
                          <BlogCard key={post.id} post={post} />
                        ))
                      }
                    </div>
                    <div className="md:w-1/2 border-start border-gray-300">
                      {
                        posts.slice(3, 6).map((post: BlogPost) => (
                          <BlogCard key={post.id} post={post} />
                        ))
                      }
                    </div>
                    <div className="md:w-1/2">
                      <div className="trending">
                        <h3 className="text-xl font-bold mb-4">Trending</h3>
                        <div className="border-start border-gray-300">
                          {
                            posts.filter(post => post.tags.some(tag => tag.name === 'trend')).map((post: BlogPost) => (
                              <BlogCard key={post.id} post={post} />
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home