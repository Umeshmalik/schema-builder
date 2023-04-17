export interface Schema {
        key: string;
        type: string;
        value?: Schema;
        edit?: boolean;
        required: boolean;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface SchemaBuilderRef {
    addField: () => string;
    getSchema: () => Array<Schema>;
    store: object;
}