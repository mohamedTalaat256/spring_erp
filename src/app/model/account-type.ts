
export interface AccountType{

    id: number,
    name: string,
    relatediternalaccounts: boolean,
    active: boolean
}


export const emptyAccountType ={

  id: 0,
    name: '',
    relatediternalaccounts: false,
    active: false
}
