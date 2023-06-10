import Navigation from "./navigation"

function Footer () {
    return (
        <footer className="footer">
            <div className="contenedor contenido">
            <Navigation/>

            <p className="copyright">
           {new Date().getFullYear()} Guitar Avenue <br/>
           Copyright © All rights reserved.
            </p>
            </div>
        </footer>
    )
}

export default Footer