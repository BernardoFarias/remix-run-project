import image from "../../public/img/about.jpg"
import styles from "../styles/about.css"

export function meta({matches}){
    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
    return [
        charset,
        {title: "About us - Guitar Avenue"},
        viewport,
        {description: "Welcome to our guitar e-commerce website, where you'll find the guitar of your dreams! We offer a wide variety of guitars, accessories, and related products, all available for purchase through our user-friendly platform. Our website was created using React Remix and Strapi, ensuring a smooth and dynamic user experience."}
    ]
}

export function links(){
    return [
        {
            rel: "stylesheet",
            href: styles
        },
        {
            rel: "preload",
            href: image,
            as: "image"
        }
    ]
}

function About () {
    return (
        <main className="contenedor nosotros">
            <h2 className="heading">About us</h2>
            <div className="contenido">
                <img src={image} alt="image about us"/>
                <div>
                    <h3>Welcome to my guitar e-commerce website! </h3>
                    <p>
                    My name is <b>Bernardo Farias</b>, and I'm a front-end developer with a passion for 
                    react and web development. 
                    I created this website as a solo project to showcase my skills in using React, Remix, and Strapi
                    to build a dynamic and engaging e-commerce platform for guitar enthusiasts.
                    </p>
                    <p>
                    If you have any questions or suggestions, please don't 
                    hesitate to reach out to me using the contact form on my website.
                    </p>
                    <p>
                    Thank you for visiting my website, and I hope you find the guitar of your dreams!
                   </p>
                </div>
            </div>
        </main>
    )
}

export default About