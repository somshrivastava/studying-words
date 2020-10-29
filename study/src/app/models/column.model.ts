export interface Column {
    name: string,
    key: string,
    type: string,
    edit: boolean,
    options? : any,
    optionKey?: string,
    autoCompleteDisplay?: boolean,
    navigateOnClick?: boolean,
    navigationPath?: string[],
    navigationPathKey?: string[]
}