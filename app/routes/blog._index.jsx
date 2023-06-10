import { useLoaderData } from "@remix-run/react"
import { getPosts } from "~/models/post.server"
import Posts from "~/components/posts";


export function meta({matches}){
    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);

    return [
        charset,
        {title: "Blog - Guitar Avenue"},
        viewport,
        {description: "Welcome to the best blog of guitars"}
    ]
}

export async function loader(){
    const posts = await getPosts()

    return posts.data
}

function Blog () {

    const posts = useLoaderData()
    return (
            <Posts
            posts={posts}
            />
    )
}

export default Blog