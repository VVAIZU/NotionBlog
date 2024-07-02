import { BlogPost } from "@/@types/schema";
import BlogCard from "@/components/BlogCard";
import NotionService from "@/services/notion-service";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const notionService = new NotionService();

    const posts = await notionService.getPublishedBlogPosts();

    return {
        props: {
            posts
        },
    }
}

const Posts: NextPage = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
    return (
        <>
            <section id="posts" className='posts py-10 px-4 md:px-6 lg:px-8'>
                <div className="fade-up">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="md:w-1/3">
                            <h3 className="text-xl font-bold mb-4">Top post</h3>
                        </div>
                        <div className="md:w-2/3">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="md:w-1/2 border-start border-gray-300">
                                    {
                                        posts.map((post: BlogPost) => (
                                            <BlogCard key={post.id} post={post} />
                                        ))
                                    }
                                </div>
                                <div className="md:w-1/2">
                                    <div className="trending">
                                        <h3 className="text-xl font-bold mb-4">Trending</h3>
                                        <div className="border-start border-gray-300">
                                            {/* Placeholder */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default Posts