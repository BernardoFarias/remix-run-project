import { useLoaderData, useOutletContext } from "@remix-run/react"
import {getGuitar} from "../models/guitars.server"
import { useState } from "react"


export async function loader({params}){

    const {guitarUrl} = params

    const guitar = await getGuitar(guitarUrl)

    if(guitar.data.length === 0){
        throw new Response("",{
            status: 404,
            statusText: "Guitar not found"
        })
    }

    return guitar
}

export function meta({data, matches}){

    if(!data){
        return[
            {title: "Guitar not found - Guitar Avenue"},
            {description: `Guitar not found - Shop the latest collection of high-quality guitars online`}
        ]
    }

    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
    return [
        charset,
        {title : `Buy High-Quality ${data.data[0].attributes.name} Guitars Online - Guitar Avenue`},
        viewport,
        {description: `Shop the latest collection of high-quality 
        ${data.data[0].attributes.name} guitars online`}
        ]
 }

 const Guitar = () => {

    const {addToCart} = useOutletContext()

    const [quantity, setQuantity] = useState(0)

    const guitar = useLoaderData()

    const {name, description, image, price} = guitar.data[0].attributes

    const handleSubmit = e => {
        e.preventDefault();

        if(quantity < 1){
            alert("Please select a quantity") ;
            return ;
        }

        const guitarSelected = {
            id: guitar.data[0].id,
            image: image.data.attributes.url,
            name,
            price,
            quantity
        }

        addToCart(guitarSelected)
    }

    return (
    <div className="guitar">
       <img className="image" src= {image.data.attributes.url} alt={`Guitar image brand ${name}`} />
       <div className="content">
        <h3>{name}</h3>
        <p className="text">{description}</p>
        <p className="price">${price}</p>

        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="quantity">Quantity</label>
            <select 
                id="quantity"
                onChange={e => setQuantity(parseInt(e.target.value))}
            >
                <option value="0">-- Select --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input 
            type="submit"
            value="Add to cart"
            />
        </form>
       </div>
    </div>
   )
 }
 
 export default Guitar