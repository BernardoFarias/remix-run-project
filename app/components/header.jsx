import { Link } from "@remix-run/react";
import logo from "../../public/img/logo.png"
import Navigation from "./navigation";

export default function Header({ cart }){

    return (
        <header className="header">
            <div className="contenedor barra">
                <Link 
                to="/">
                    <img className="logo" src={logo} alt="logo"/>
                </Link>
                <Navigation
                cart={cart}
                />
            </div>
        </header>
    )
}