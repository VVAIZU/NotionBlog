import { BlogPost } from "@/@types/schema";
import Link from "next/link";
import { FunctionComponent } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

//import dayjs from 'dayjs'

type BlogCardProps = {
    post: BlogPost,
    large?: boolean
}


//const localizedFormat = require('dayjs/plugin/localizedFormat');
//dayjs.extend(localizedFormat)

const BlogCard: FunctionComponent<BlogCardProps> = ({ post, large = false }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`post-entry-1 ${large ? 'lg' : ''} mb-8`}>
            <Link href={`/post/${post.slug}`}>
                <img className="w-full mb-5 rounded-lg cursor-pointer" src={post.cover} alt={"cover"} />
            </Link>
            <div className='flex items-center justify-between mb-3'>
                <span className='flex items-center text-sm text-gray-500'>
                    <i className='bi bi-dot'></i>
                    <span className="ml-1">{formatDate(post.date)}</span>
                    <i className='bi bi-dot'></i>
                    <span className="ml-1">{post.author}</span>
                </span>
            </div>
            <div>
                <h2 className={`text-xl font-semibold mb-4 ${large ? 'md:mb-4' : ''}`}>
                    <Link href={`/post/${post.slug}`} className="text-black hover:text-gray-700">
                        {post.title}
                    </Link>
                </h2>
                {large && (
                    <>
                        <p className='md:mb-4'>{post.description}</p>
                        <div className='flex items-center author'>
                            {/* <div className='photo'>
                                <img src={post.cover} alt="" className='w-10 h-10 rounded-full' />
                            </div> */}
                            <div className='name'>
                                <span className="block mt-2 space-x-2">
                                    {
                                        post.tags.map(tag => (
                                            <span key={tag.id} className="bg-gray-800 text-xs text-white font-semibold rounded-full px-2 py-1">
                                                #{tag.name}
                                            </span>
                                        ))
                                    }
                                </span>
                            </div>

                        </div>
                    </>
                )}
            </div>

        </div>
        // <Link href={`/post/${post.slug}`}>
        //     <div className="transition duration-300 hoverscale-105">
        //         <div className="flex flex-col rounded-xl shadow-lg overflow-hidden">
        //             <div className="flex-shrink-0">
        //                 <img className="h-64 w-full object-fit" src={post.cover} alt={"cover"} />
        //             </div>
        //             <div className="flex-1 bg-gray-50 pt-2 pb-6 glex glex-col justify-between" >
        //                 <div className="flex-1">
        //                     <span className="block mt-2">
        //                         <h4>{post.title}</h4>
        //                     </span>
        //                     <span className="block mt-2">
        //                         <h4>{post.description}</h4>
        //                     </span>
        //                     <span className="block mt-2">
        //                         <h4>{post.date}</h4>
        //                     </span>
        //                     <span className="block mt-2 space-x-4">
        //                         {
        //                             post.tags.map(tag => (
        //                                 <span key={tag.id} className="bg-green-300 text-xs rounded-lg">
        //                                     #{tag.name}
        //                                 </span>
        //                             ))
        //                         }
        //                     </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Link>
    )
}


export default BlogCard