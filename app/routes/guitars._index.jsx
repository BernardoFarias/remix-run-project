import { useLoaderData } from "@remix-run/react"
import { getGuitars } from "~/models/guitars.server"
import List from "~/components/list";

export function meta({matches}){
    let rootMeta = matches[0].meta;
    
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);

    return [
        charset,
        {title: "Shop - Guitar Avenue"},
        viewport,
        {description: "Buy the latest collection of high-quality guitars online"}
    ]
}

export async function loader(){
    const guitars = await getGuitars()
    return guitars.data
}

function Shop () {

    const guitars = useLoaderData()

    return (
        
            <List 
            guitars={guitars}
            >
            Our complete collection
            </List>
    
    )
}

export default Shop