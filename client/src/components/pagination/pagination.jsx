import React from "react";
import s from "./pagination.module.css" ;

export default function Pagination({
    paginated,
    currentPage,  
    firstPage ,
    lastPage,
    totalPages,
    }) {

    let start = 1
    let end = 5
    let pagesCutOff = 5
    let difference = 2

    if (totalPages < pagesCutOff) {
        start = 1;
        end = totalPages;
    } else if ( currentPage === 1 || currentPage === 2) {
        start = 1;
        end = pagesCutOff
    } else if ((currentPage + 2) >= totalPages) {
        start = totalPages - 4 ;
        end = totalPages
    } else {
        start = (currentPage - difference)
        end = (currentPage + difference)
    }

    const pages = []

    for (var i = start; i <= end; i++) {
       pages.push(i)
    }


    return (
        <nav className={s.display}>
            <button onClick={() => paginated(firstPage)} className={s.pagination}>
                {`<<`}
            </button>
            {pages?.map( (e) => {
                return (
                   
                        <button onClick={() => paginated(e)} className={s.pagination} key={e}>
                            {e} 
                        </button>
                    
                )
            }
            )}
            <button onClick={() => paginated(lastPage)} className={s.pagination}>
                {`>>`}
            </button>
        </nav>
    )
}