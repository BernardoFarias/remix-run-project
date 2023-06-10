import { Link } from "@remix-run/react"
import { dateFormat } from "~/utils/helpers"

function Post ({post}) {
    const {content, publishedAt, image, title, url} = post
    return (
        <article className="post">
            <img className="image" src={image.data.attributes.formats.small.url} alt={`image blog ${title}`} />
            <div className="content">
                <h3 className="title">{title}</h3>
                <p className="date">{dateFormat(publishedAt)}</p>
                <p className="resume">{content}</p>
                <Link className="link" to={`/blog/${url}`}>
                    Read Post
                </Link>
            </div>
        </article>
    )
}

export default Post