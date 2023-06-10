import { useOutletContext } from "@remix-run/react";
import styles from "../styles/cart.css"
import { useEffect, useState } from "react";
import deleteIcon from "../../public/img/deleteIcon.svg"
import { ClientOnly } from "remix-utils"

export function links(){
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}

export function meta({matches}){
    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
    return [
        charset,
        {title : `Shopping cart - Guitar Avenue`},
        viewport,
        {description: `Shop the latest collection of high-quality guitars online`}
        ]
 }

export default function Cart(){

    const [total, setTotal] = useState(0)

    const { cart, updateQuantity, deleteGuitar } = useOutletContext()

    useEffect(() => {
        const sumTotal = cart.reduce((total, current) => total + (current.quantity * current.price), 0)
        setTotal(sumTotal)
    }, [cart])

    return(
        <ClientOnly fallback={"loading..."}>
            { () => (
        <main className="contenedor">
            <h1 className="heading">My cart</h1>
            <div className="content">
                <div className="cart">
                    <h2>Products</h2>
                    {cart?.length === 0 
                    ? "Cart empty" 
                    : cart?.map(product => (
                        <div key={product.id} className="product">
                            <div>
                                <img src={product.image} alt={`Image of guitar brand ${product.name}`}/>
                            </div>
                            <div>
                                <p className="name">{product.name}</p>

                                <p className="">Quantity:</p>
                                <select
                                    value={product.quantity}
                                    className="select"
                                    onChange={e => updateQuantity({
                                        quantity: parseInt(e.target.value),
                                        id: product.id
                                    })}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                <p className="price">{`${product.quantity} x $`}<span>{product.price}</span></p>
                                <p className="subtotal">Subtotal: $<span>{product.quantity * product.price}</span></p>
                            </div>
                            <button 
                                type="button"
                                className="btnDelete"
                                onClick={() => deleteGuitar(product.id)}
                            ><img src={deleteIcon} alt="delete icon" /></button>
                        </div>
                    ))
                    }
                </div>
                <aside className="resume">
                    <h3>Order summary</h3>
                    <p>
                        Total: $ {total}
                    </p>
                </aside>
            </div>
        </main>
            )}
        </ClientOnly>
    )
}