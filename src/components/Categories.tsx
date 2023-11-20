import React from "react"
import { FC, memo } from "react"

type CategoryProps = {
    value : number
    onChangeCategory : (idx : number) => void
}

// eslint-disable-next-line react/display-name
const Categories : FC<CategoryProps> = memo(({value, onChangeCategory} : CategoryProps) => {

    const categories = ["Все", 
                        "Мясные", 
                        "Вегетарианская",
                        "Гриль",
                        "Острые",
                        "Закрытые"]
                        
    return (
        <div className="categories">
            <ul>
                {categories.map((e, index) => (
                    <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? "active" : ""}>{e}</li>
                ))}
            </ul>
        </div>
    )
})

export default Categories