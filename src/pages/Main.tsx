import { FC, useCallback} from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Sceleton from '../components/PizzaBlock/Sceleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { selectPizzaData } from '../storages/pizza/selector';
import getPizza from '../storages/pizza/fetch';
import { setCategoryId, setCurrentPage } from '../storages/filter/slice';
import { selectFilter } from '../storages/filter/selector';
import { useAppDispatcher } from '../storages/store';

const Main: FC = () => {

    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

    const dispatch = useAppDispatcher()

    const onChangePage = (e: number) => {
        dispatch(setCurrentPage(e))
    }

    const onChangeCategory = useCallback((idx: number) => {
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
                    {status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Произошла ошибка 😕</h2>
                            <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                        </div>) : (
                        status === 'loading' ?
                            [...Array(6)].map((_, index) => (<Sceleton key={index} />)) : (
                            items.map((e: any) => (<PizzaBlock key={e.id} {...e} />))
                    ))}
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </div>
    )
}

export default Main