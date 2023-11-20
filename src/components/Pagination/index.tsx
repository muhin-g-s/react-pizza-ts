import React from "react"
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { FC } from 'react';

type PaginationType = {
    currentPage : number
    onChangePage : (page : number) => void
}

const Pagination : FC<PaginationType> = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination