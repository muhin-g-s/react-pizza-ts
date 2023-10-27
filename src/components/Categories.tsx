import { FC, memo } from "react"

type CategoryProps = {
    value : number
    onChangeCategory : (idx : number) => void
}

const Categories : FC<CategoryProps> = memo(({value, onChangeCategory}) => {

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