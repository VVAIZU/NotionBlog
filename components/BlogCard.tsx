import { BlogPost } from "@/@types/schema";
import Link from "next/link";
import { FunctionComponent } from "react";
//import dayjs from 'dayjs'

type BlogCardProps = {
    post: BlogPost
}

//const localizedFormat = require('dayjs/plugin/localizedFormat');
//dayjs.extend(localizedFormat)

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/post/${post.slug}`}>
            <div className="transition duration-300 hoverscale-105">
                <div className="flex flex-col rounded-xl shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                        <img className="h-64 w-full object-fit" src={post.cover} alt={"cover"} />
                    </div>
                    <div className="flex-1 bg-gray-50 pt-2 pb-6 glex glex-col justify-between" >
                        <div className="flex-1">
                            <span className="block mt-2">
                                <h4>{post.title}</h4>
                            </span>
                            <span className="block mt-2">
                                <h4>{post.description}</h4>
                            </span>
                            <span className="block mt-2">
                                <h4>{post.date}</h4>
                            </span>
                            <span className="block mt-2 space-x-4">
                                {
                                    post.tags.map(tag => (
                                        <span key={tag.id} className="bg-green-300 text-xs rounded-lg">
                                            #{tag.name}
                                        </span>
                                    ))
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export default BlogCard