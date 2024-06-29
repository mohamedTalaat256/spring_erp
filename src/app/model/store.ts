
export interface Store{

    id: number,
    name: string,
    address: number,
    phones: number,
    active: boolean
}

export const emptyStore:Store ={
  id: 0,
  name: '',
  address: 0,
  phones: 0,
  active: false
}
