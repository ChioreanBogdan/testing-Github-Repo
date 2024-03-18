import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Image from "next/image";

import PriceTag from "@/components/PriceTag";
import AddToCartButton from "./AddToCartButton";
import { cache } from "react";
import { Metadata } from "next";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
    params: {
        id: string,
            }
                          }

//cache=pt a lua date de pe server doar o singura data
const getProduct=cache(async (id:string) => {
    //gasim un singur produs la care id-ul din where: {id} e egal cu id-ul din params:{id}
    const product = await prisma.product.findUnique({where: {id}})

    //Redirectionare catre pagina not found
    if(!product) notFound();
    return product;
                                            })

//functie,speciala,returneaza Metadata
export async function generateMetadata({params:{id}}: ProductPageProps):Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name +" - Umag",
        description: product.description,
        openGraph: {
            images:[{url: product.imageUrl}]
                  },
           };
                                                                                          }

export default async function ProductPage (
    {params:{id}}: ProductPageProps
                                          ) {

    const product = await getProduct(id);

    {console.log("product.name="+product.name)}
    {console.log("product.imageUrl="+product.imageUrl)}

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
                src={ product.imageUrl }
                alt={ product.name }
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />
        

            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
                <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
                
            </div>
        </div>
           );

  }
