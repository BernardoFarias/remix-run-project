import Guitar from "./guitar";
import styles from "../styles/guitars.css"

export function links(){
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}

export default function List({guitars, children}){
    
    
    return(
       <>
            <h2 className="heading">
            {children}
            </h2>
                {guitars.length && (
                    <div className="guitars-grid">
                        {guitars.map(guitar => (
                            <Guitar 
                            guitar={guitar?.attributes}
                            key={guitar?.id}
                            />
                        ))}
                    </div>
                ) }
       </> 
    )
}