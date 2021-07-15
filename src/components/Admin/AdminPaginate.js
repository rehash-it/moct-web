import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
function AdminPaginate({ page, setPage }) {
    let P = []
    if (page !== 1) {
        for (var i = 0; i < page; i++)
            P.push(i + 1)
    }

    return (
        <Pagination aria-label="Page navigation example">
            {
                P.map(p =>
                    <div onClick={() => setPage(p)}>
                        <PaginationItem>
                            <PaginationLink>
                                <h5>{p}</h5>
                            </PaginationLink>
                        </PaginationItem>
                    </div>
                )
            }

        </Pagination>
    )
}

export default AdminPaginate
