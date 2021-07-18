import React from 'react'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
function PaginateSites({ page, region }) {
    let P = []
    if (page !== 1) {
        for (var i = 0; i < page; i++)
            P.push(i + 1)
    }
    return (
        <Pagination aria-label="Page navigation example">
            {
                P.map(p =>
                    <Link to={'/site? region = ' + region + '&p=' + page}>
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

export default PaginateSites
