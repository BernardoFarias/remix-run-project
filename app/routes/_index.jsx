import { useLoaderData } from "@remix-run/react"
import List from "~/components/list"
import { getGuitars } from "~/models/guitars.server"
import { getPosts } from "~/models/post.server"
import Posts from "~/components/posts"
import { getCourse } from "~/models/course.server"
import Course from "~/components/course"
import stylesGuitars from "../styles/guitars.css"
import stylesPosts from "../styles/blog.css"
import stylesCourse from "../styles/course.css"

export function links(){
    return [
        {
            rel: "stylesheet",
            href: stylesGuitars
        },
        {
            rel: "stylesheet",
            href: stylesPosts
        },
        {
            rel: "stylesheet",
            href: stylesCourse
        }
    ]
}

export async function loader(){

    const [guitars, posts, course] = await Promise.all([
        getGuitars(),
        getPosts(),
        getCourse()
    ])
    return {
        guitars: guitars.data,
        posts: posts.data,
        course: course.data
    }
}

function Index () {

    const {guitars, posts, course} = useLoaderData()

    const firstSix = guitars.slice(0, 6);

    const firstThree = posts.slice(0, 3)

    return (
        <>
        <main className="contenedor">
            <List 
            guitars={firstSix}
            >
            Discover the best deals
            </List>
        </main>
        <Course 
        course={course.attributes}
        />
        <section className="contenedor">
            <Posts 
            posts={firstThree}
            />
        </section>
        </>
    )
}

export default Index