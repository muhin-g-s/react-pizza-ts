//import items from './assets/db.json'
import { FC, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sceleton from '../components/PizzaBlock/Sceleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { selectPizzaData } from '../storoges/pizza/selector';
import getPizza from '../storoges/pizza/fetch';
import { setCategoryId, setCurrentPage } from '../storoges/filter/slice';
import { selectFilter } from '../storoges/filter/selector';
import { useAppDispatcher } from '../storoges/store';

const Main : FC = () => {

    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

    const dispatch = useAppDispatcher()

    const [isLoading, setIsLoading] = useState(false)

    const onChangePage = (e : number) => {
        dispatch(setCurrentPage(e))
    }

    const onChangeCategory = useCallback((idx : number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const get = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue;

        dispatch(
            getPizza({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );

        window.scroll(0, 0)
    }

    useEffect(() => {
        get()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort value={sort} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {/* {isLoading
                        ? [...Array(6)].map((_, index) => (<Sceleton key={index} />))
                        : item.map((e, index) => (
                            <PizzaBlock key={index} img={e.imageUrl} title={e.title} types={e.types} sizes={e.sizes} price={e.price} />
                        ))} */}

                    {items.map((e : any, index : number) => (
                        <PizzaBlock key={index} img={e.imageUrl} title={e.title} types={e.types} sizes={e.sizes} price={e.price} id={e.id}/>
                    ))}
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </div>
    )
}

export default Main