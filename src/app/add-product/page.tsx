import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export const metadata = {
    title: "Add Product - Umag",
                        };


        //functie pt a testa daca name,description,imageURL si price sunt definite
        async function testData(formData:FormData)  {
    
            "use server";




            //ia name din componenta name="name" de pe form
            //?=nam is string or undefined
            const name =formData.get("name")?.toString();
            const description =formData.get("description")?.toString();
            const imageURL =formData.get("imageURL")?.toString();
            //|| 0 azul in care nu am nimic in campul price
            const price =Number(formData.get("price") || 0);
    
            console.log("name="+name+" description="+description+" imageURL="+imageURL+" price="+price);
    
                                                        }
                    
    //async -pt operatiuni pe server
    //prisma poate efectua operatiuni doar pe server
    async function AddProduct(formData:FormData)  {
        //tells nextJs that this is a server action
        "use server";

                      
        {/* Doca se apasa add product cat timp user-ul nu e logat se va face o redirectionare */}
        const session = await getServerSession(authOptions);

        if(!session)  {
            redirect("/api/auth/signin?callbackUrl=/add-product")
            
                      }

        //ia name din componenta name="name" de pe form
        //?=nam is string or undefined
        const name =formData.get("name")?.toString();
        const description =formData.get("description")?.toString();
        const imageURL =formData.get("imageURL")?.toString();
        //|| 0 azul in care nu am nimic in campul price
        const price =Number(formData.get("price") || 0);

        
        console.log("name="+name+" description="+description+" imageURL="+imageURL+" price="+price);


        //!-lipseste
        if(!name || !description || !imageURL || !price){
            throw Error("Missing required fields");
                                                        }

        //in baza de date a ramas imageUrl dar in form e imageURL
        const imageUrl=imageURL;

        // for (let i=0; i<12; i++) {
        //     await prisma.product.create({
        //         data: {name, description, imageUrl, price},
        //                                 });
        //                          }

        await prisma.product.create({
            data: {name, description,imageUrl,price},
                                    });

                                    //redirectionare la pagina principala dupa ce am adaugat un produs
                                    redirect("/");
                                                  }

export default async function AddProductPage()  {
    {/* Ma asigur ca doar daca sunt logat pot sa adaug produse */}
    const session= await getServerSession(authOptions);

    if(!session)  {
        redirect("/api/auth/signin?callbackUrl=/add-product")
        
                  }

    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            {/*ce e intre {} va rula cand apasam butonul cu type="submit"*/}
            <form action={AddProduct}>
               <input
                    required
                    name="name"
                    placeholder="Name"
                    className="mb-3 w-full input input-bordered"
               />
               <textarea
               required
               name="description"
               placeholder="Description"
               className="textarea textarea-bordered mb-3 w-full"
               />
               <input
                    required
                    name="imageURL"
                    placeholder="image URL"
                    //tipul input-ului
                    type="url"
                    className="mb-3 w-full input input-bordered"
               />
               <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="mb-3 w-full input input-bordered"
               />
               {/*btn-block-pt a ocupa toata latimea ecranului*/}
               <FormSubmitButton className=" btn-block">Add Product</FormSubmitButton>
            </form>
        </div>
            );
                                          }