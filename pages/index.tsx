import Image from "next/image";
import { Inter } from "next/font/google";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import NotionService from "@/services/notion-service";
import Head from "next/head";
import { BlogPost } from "@/@types/schema";
import BlogCard from "@/components/BlogCard";
import TrendCard from "@/components/TrendCard";
//import "../styles/hero.module.css"


export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const title = 'Test Blog';
  const description = 'Welcome to my Notion blog';

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  // Функция для получения самого последнего поста из массива
  const getLastPost = (posts: BlogPost[]) => {
    if (posts.length === 0) {
      return null;
    }
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const latestDogPost = getLastPost(
    posts.filter((post: BlogPost) => post.tags.some((tag: { name: string }) => tag.name === 'top'))
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={'description'} content={description} />
      </Head>
      {/* <Hero /> */}
      <section id="hero-slider" className="hero-slider ">
        <div className="container-md mx-auto max-w-7xl" data-aos="fade-in">
          <div className="relative">
            <Swiper
              slidesPerView={"auto"}
              speed={500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              loop={true}
              className="slider-featured-posts"
            >
              {posts &&
                posts
                  .filter((post) => post.tags.some((tag) => tag.name === "trend"))
                  .map((post: BlogPost) => (
                    <SwiperSlide key={post.id}>
                      <div
                        className="h-96 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${post.cover})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                            {post.title}
                          </h2>
                          <p className="text-white">{post.description}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>

            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-20 custom-swiper-button-prev">
              <span className="bi-chevron-left text-2xl text-white"></span>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-20 custom-swiper-button-next">
              <span className="bi-chevron-right text-2xl text-white"></span>
            </div>

            <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
      </section>


      {/* POSTS */}
      <section>
        <div className="container-md mx-auto max-w-7xl">
          <section id="posts" className="posts py-10">
            <div className="fade-up">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-1/3 border-r border-gray-300 pr-4">
                  {/* <h3 className="text-xl font-bold mb-4">Posts with Pets</h3> */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Top post</h3>
                    {latestDogPost ? (
                      <BlogCard key={latestDogPost.id} post={latestDogPost} large={true} />
                    ) : (
                      <p>No top post available</p>
                    )}
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/2 border-r border-gray-300 pr-4">
                    {
                      posts.slice(0, 3).map((post: BlogPost) => (
                        <BlogCard key={post.id} post={post} large={false} />
                      ))
                    }
                  </div>
                  <div className="md:w-1/2 border-r border-gray-300 pr-4">
                    {
                      posts.slice(3, 6).map((post: BlogPost) => (
                        <BlogCard key={post.id} post={post} large={false} />
                      ))
                    }
                  </div>
                  <div className="md:w-1/2">
                    <div className="trending">
                      <h3 className="text-xl font-bold mb-4">Trending</h3>
                      <div>
                        {
                          posts
                            .filter((post: BlogPost) => post.tags.some((tag: { name: string }) => tag.name === 'trend'))
                            .map((post: BlogPost) => (
                              <TrendCard key={post.id} post={post} />
                            ))
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>


    </>
  );
};

export default Home