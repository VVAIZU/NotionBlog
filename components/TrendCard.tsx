import { BlogPost } from "@/types/schema";
import Link from "next/link";
import { FunctionComponent } from "react";

type BlogCardProps = {
    post: BlogPost;
}

const TrendCard: FunctionComponent<BlogCardProps> = ({ post }) => {
    // Function to format date in a readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`post-entry-1 mb-8 border-t border-b border-gray-200 pt-4 pb-4`}>
            <h2 className={`text-xl font-semibold mb-4`}>
                <Link href={`/post/${post.slug}`} className="text-black hover:text-gray-700">
                    {post.title}
                </Link>
            </h2>
            <div className='flex items-center justify-between mb-3'>
                <span className='flex items-center text-sm text-gray-500'>
                    <i className='bi bi-dot'></i>
                    <span className="ml-1">{formatDate(post.date)}</span>
                    <i className='bi bi-dot'></i>
                    <span className="ml-1">{post.author}</span>
                </span>
            </div>
            <div className='flex space-x-2'>
                {post.tags.map((tag: { id: string; name: string }) => (
                    <span key={tag.id} className='bg-gray-200 text-xs px-2 py-1 rounded-lg'>
                        #{tag.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TrendCard;
