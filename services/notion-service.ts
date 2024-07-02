import {Client} from "@notionhq/client";
import {BlogPost, PostPage} from "../@types/schema";
import {NotionToMarkdown} from "notion-to-md";

export default class NotionService {
    client: Client
    n2m: NotionToMarkdown;

    constructor() {
        this.client = new Client({ auth: process.env.NOTION_TOKEN });
        this.n2m = new NotionToMarkdown({ notionClient: this.client });
    }

    async getPublishedBlogPosts(): Promise<BlogPost[]> {
        const database = process.env.NOTION_DATABASE_ID ?? '';
        // list blog posts
        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true
                }
            },
            sorts: [
                {
                    property: 'Created',
                    direction: 'descending'
                }
            ]
        });

        return response.results.map(res => {
            return NotionService.pageToPostTransformer(res);
        })
    }


    async getSingleBlogPost(slug: string): Promise<PostPage> {
        const database = process.env.NOTION_DATABASE_ID ?? '';
        
        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Slug',
                formula: {
                    string: {
                        equals: slug
                    }
                },
            },
            sorts: [
                {
                    property: 'Created',
                    direction: 'descending'
                }
            ]
        });

        if (response.results.length === 0) {
            throw 'No results available';
        }

        const page = response.results[0];
        const mdBlocks = await this.n2m.pageToMarkdown(page.id);
        const markdown = this.n2m.toMarkdownString(mdBlocks).parent;

        const post = NotionService.pageToPostTransformer(page);

        return {
            post,
            markdown
        };
    }
    // async getSingleBlogPost(slug: string): Promise<PostPage> {
    //     let post, markdown

    //     const database = process.env.NOTION_DATABASE_ID ?? '';
    //     // list of blog posts
    //     const response = await this.client.databases.query({
    //         database_id: database,
    //         filter: {
    //             property: 'Slug',
    //             formula: {
    //                 text: {
    //                     equals: slug // slug
    //                 }
    //             },
    //             // add option for tags in the future
    //         },
    //         sorts: [
    //             {
    //                 property: 'Updated',
    //                 direction: 'descending'
    //             }
    //         ]
    //     });

    //     if (!response.results[0]) {
    //         throw 'No results available'
    //     }

    //     // grab page from notion
    //     const page = response.results[0];
    //     console.log(response.results[0]);

    //     const mdBlocks = await this.n2m.pageToMarkdown(page.id)
    //     markdown = this.n2m.toMarkdownString(mdBlocks);
    //     post = NotionService.pageToPostTransformer(page);

    //     return {
    //         post,
    //         markdown
    //     }
    // }

    private static pageToPostTransformer(page: any): BlogPost {
        let cover = page.cover ? page.cover : { type: 'none' }; // Default if no cover is provided
    
        switch (cover.type) {
            case 'file':
                cover = cover.file.url; // Assuming you want to use the URL directly
                break;
            case 'external':
                cover = cover.external.url; // Handle external URLs if needed
                break;
            default:
                cover = ''; // Set a default or handle other cases
        }

        return {
            id: page.id,
            cover: cover,
            title: page.properties.Name.title[0].plain_text,
            author: page.properties.Author.rich_text[0].plain_text,
            tags: page.properties.Tags.multi_select,
            description: page.properties.Description.rich_text[0].plain_text,
            date: page.properties.Updated.last_edited_time,
            slug: page.properties.Slug.formula.string
        }
    }
}