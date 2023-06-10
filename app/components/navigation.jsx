import { Link, useLocation } from "@remix-run/react";
import cartImage from "../../public/img/cartImage.png"

export default function Navigation({cart}){

    const location = useLocation()

    return(
        <nav className="navegacion">
        <Link 
            to="/"
            className={location.pathname === "/" ? "active" : ""}
        > Home </Link>
        <Link 
            to="/guitars"
            className={location.pathname === "/guitars" ? "active" : ""}
        > Shop </Link>
        <Link 
            to="/blog"
            className={location.pathname === "/blog" ? "active" : ""}
        > Blog </Link>
        <Link 
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
        > About </Link>
        <Link 
            to="/cart"
        >
        <img src={cartImage} alt="cart"/>
        {cart?.length > 0 ? <span className="inCart">{cart.length}</span> : null}   
        </Link>
    </nav>
    )
}