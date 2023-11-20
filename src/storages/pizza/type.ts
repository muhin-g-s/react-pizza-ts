
export enum Status  {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export type Pizza = {
    id : string
    title : string
    price : number
    imageUrl : string
    sizes : number[]
    types : number[]
    rating : number
}

export type SearchPizzaParams = {
    sortBy : string
    order : string
    category : string
    search : string
    currentPage : string 
}

export type PizzaSliceType = {
    items : Pizza[]
    status : Status
}