import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

function PaginateSearch({ page, index }) {
    let P = []
    if (page !== 1) {
        for (var i = 0; i < page; i++)
            P.push(i + 1)
    }
    return (
        <Pagination aria-label="Page navigation example">
            {
                P.map(p =>
                    <Link to={'/search/' + index + '?p=' + p} key={p}>
                        <PaginationItem>
                            <PaginationLink>
                                <h5>{p}</h5>
                            </PaginationLink>
                        </PaginationItem>
                    </Link>
                )
            }

        </Pagination>
    )
}

export default PaginateSearch
