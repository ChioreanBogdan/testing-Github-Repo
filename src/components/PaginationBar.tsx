import Link from "next/link";

interface PaginationBarProps{
    currentPage:number;
    totalPages:number;
                            };

export default function PaginationBar({currentPage,totalPages}:PaginationBarProps) {
    //maxPage nr maxim de pagina ce va fi afisat
    const maxPage =Math.min(totalPages,Math.max(currentPage+4,10))
    //minPage nr minim de pagina ce va fi afisat
    const minPage =Math.max(1,Math.min(currentPage-5,maxPage-9))

    const numberedPageItems: JSX.Element[] = []

    {/* {currentPage=== page ? "btn-active pointers-events-none"-butonul de pe pagina curenta va fi disabled altfel ->: nu se va intampla nimic ""} */}
    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(

            <Link href={"?page="+page} key={page} className={`join-item btn ${currentPage=== page ? "btn-active pointers-events-none" : ""}`}>          
                {page}
            </Link>
                              )      
                                                    }
    return (
        <>
            <div className="join hidden sm:block">
                {numberedPageItems}
            </div>
            <div className="join block sm:hidden">
                {currentPage>1 &&
                    <Link href={"?page=" +(currentPage-1)} className="btn join-item">
                        «
                    </Link>
                }
                <button className="join-item btn pointer-events-none">
                    Page{currentPage}
                </button>
                {currentPage < totalPages &&
                    <Link href={"?page=" +(currentPage+1)} className="btn join-item">
                        »
                    </Link>
                }
            </div>
        </>
           )
                                                                                   }