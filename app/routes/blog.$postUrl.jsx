import { getPost } from "~/models/post.server"
import { useLoaderData } from "@remix-run/react"
import { dateFormat } from "~/utils/helpers"

export function meta({data, matches}){

    if(!data){
        return[
            {title: "Post not found - Guitar Avenue"},
            {description: `Post not found - Blog about the latest collection of high-quality guitars`}
        ]
    }

    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
    return [
        charset,
        {title : `${data.data[0].attributes.title} - Guitar Avenue`},
        viewport,
        {description: `Blog about the latest collection of high-quality guitars - 
        ${data.data[0].attributes.title}`}
        ]
 }

export async function loader({params}){

    const {postUrl} = params

    const post = await getPost(postUrl)

    if(post.data.length === 0){
        throw new Response("",{
            status: 404,
            statusText: "Post not found"
        })
    }

    return post
}

export default function Post(){

    const post = useLoaderData()

    const {title, content, image, publishedAt} = post.data[0].attributes

    return(
        <article className="post mt-3">
            <img className="image" src={image.data.attributes.url} alt={`image blog ${title}`} />
            <div className="content">
                <h3 className="title">{title}</h3>
                <p className="date">{dateFormat(publishedAt)}</p>
                <p className="text">{content}</p>
            </div>
        </article>
    )
}