export interface INode<T> {
    node: T
}

export interface IConnection<T> {
    [info: string]: {
        edges: INode<T>[]
    }
}