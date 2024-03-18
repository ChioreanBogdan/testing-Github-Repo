import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps{
  searchParams: {page: string}
                   }

var nr_of_products:number =0;

//Homepage
export default async function Home({searchParams: { page ="1" } }) {
const currentPage=parseInt(page)

  //Cate elemente sa afisam pe o pagina
  const pageSize=10
  //hero item=ultimul produs introdus care apare sus
  const heroItemCount=1

  const totalItemCount=await prisma.product.count();

  //Math.ceil-rotunjeste un nr in sus
  const totalPages= Math.ceil((totalItemCount-heroItemCount)/pageSize)

  const products = await prisma.product.findMany({
      orderBy:{id:"desc"},
      //Assert if current page is 0,if so assign 0,if not,assign heroitemcount
      skip:(currentPage-1)*pageSize + (currentPage===1 ?  0 : heroItemCount),
      //take: pageSize+(currentPage === 1 ? heroItemCount : 0),daca vrem pageSize+heroItemCount pe prima pagina
      take: pageSize+(currentPage === 1 ? 0 : 0),
                                                  });

  return (
    <div className="flex flex-col items-center">
      {/*Randeaza hero item doar daca ne aflam pe prima pagina*/}
      {currentPage===1 &&
      <div className="hero rounded-xl bg-base-200">
        {/*flex-col elemente in coloana pe ecrane mici, lg:flex-row elemetele apar in randuri pe ecrane mai mari*/}
        <div className="hero-content flex-col lg:flex-row"> 
          <Image
          src={products[0].imageUrl}
          alt={products[0].name}
          width={400}
          height={800}
          className="w-full max-w-sm rounded-lg shadow-2xl"
          //priority=imaginea se incarca prima
          priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
            href={"/products/" + products[0].id}
            className="btn btn-primary">
              Check it out
            </Link>
          </div>
         </div>
      </div>
      }
    {/* cols: in functie de marimea ecranului: 1 coloana,2 sau 3 */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      
      {/* Slice() Slice(start) sau Slice(start,finish) */}
      {/* Daca ne aflam pe prima pagina scoatem primul element cu slice pt ca va aprea in hero section,alfel,le afisam pe toate */}
      {/*
      (currentPage===1 ? products.slice(1) : products).map(product=> (
      <ProductCard product={product} key={product.id} />
                                                          ))
                                       */}
      {   
      (currentPage===1 ? products.slice(1) : products.slice(0)).map(product=> (
      <ProductCard product={product} key={product.id} />
                                                          ))
                                       }
      </div>
      {/* Cream pagination bar doar daca e mai mare ca 1*/}
      {totalPages > 1 && 
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      }
    </div>
          )

                                }
                                
