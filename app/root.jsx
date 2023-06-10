import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link,
} from "@remix-run/react"
import styles from "./styles/index.css"
import Header from "./components/header"
import Footer from "./components/footer"
import { useEffect, useState } from "react"

export function meta(){ 
    return [
        { charset: 'utf-8' },
        { title: 'Home - Guitar Avenue' },
        { viewport: "width=device-width,initial-scale=1"}
        ]
};

export function links(){
    return (
        [
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: "stylesheet",
            href: styles
        }
        ]
    )
}

export default function App(){

    const cartLs = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem("cart")) ?? [] : null

    const [cart, setCart] = useState(cartLs)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = guitar => {

        if(cart.some(guitarState => guitarState.id === guitar.id)) {
            // Find the guitar duplicated
            const cartUpdated = cart.map( guitarState => {
                if(guitarState.id === guitar.id){
                    // Edit the quantity
                    guitarState.quantity = guitar.quantity
                }
                return guitarState
            })
            // Edit the cart
            setCart(cartUpdated)
        } else {
            // New record, Add to Cart
            setCart([...cart, guitar])
        }
    }
    
    const updateQuantity = guitar => {
        const cartUpdated = cart.map(guitarState => {
            if(guitarState.id === guitar.id){
                guitarState.quantity = guitar.quantity
            }
            return guitarState
        })
        setCart(cartUpdated)
    }

    const deleteGuitar = id => {
        const cartUpdated = cart.filter( guitarState => guitarState.id !== id )
        setCart(cartUpdated)
    }

    return (
        <Document>
            <Header
            cart={cart}
            />
            <Outlet
                context={{
                    addToCart,
                    cart,
                    updateQuantity,
                    deleteGuitar
                }}
            />
        </Document>
    )
}

function Document({children}){

    return(
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/* Errors handle */

export function ErrorBoundary(){
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
        return (
          <Document>
            <p className="error">
              {error.status} {error.statusText}
            </p>
            <Link to="/" className="error-link">
            Return to home
            </Link>
          </Document>
        );
      } else if (error instanceof Error) {
        return (
          <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </div>
        );
      } else {
        return <h1>Unknown Error</h1>;
      }
}
