
export interface Account{
     
    id: number,
    name: string,
    account_type: number,
    is_parent: boolean,
    parent_account_number: number,
    parent_account_name?: number,
    account_number: number,
    start_balance_status: number,
    start_balance: number,
    current_balance: number,
    other_table_FK: number,
    notes: string,
    active: boolean

}