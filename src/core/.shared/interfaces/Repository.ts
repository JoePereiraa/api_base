interface Repository<T> {
    create?(item: T): Promise<T>;
    readAll?(): Promise<T[]>;
    readOne?(key: any, value: string): Promise<T | null>;
    update?(id: string, item: T): void;
    delete?(id: string): void;
}

export { Repository }