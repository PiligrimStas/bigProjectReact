export type ScrollSchema = Record<string, number>; // где string адрес станицы a number позиция скрола

export interface UISchema {
    scroll: ScrollSchema;
}
