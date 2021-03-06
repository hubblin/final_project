import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 3rem;
`;

const PageNumber = styled.div``;

const Pagination = ({page, lastPage})=>{
    return (
        <PaginationBlock>
            <Button
                disabled={page===1}
                to={
                    page === 1 ? undefined : `/?page=${page -1}`
                }
            >
                이전
            </Button>
            <PageNumber>{page}/{lastPage}</PageNumber>
            <Button
                disabled={page === lastPage}
                to={
                    page === lastPage ? undefined : `/?page=${page +1}`
                }
            >
                다음
            </Button>
        </PaginationBlock>
    )
}

export default Pagination;