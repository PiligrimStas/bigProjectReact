import { StateSchema } from 'entities/Counter';

export const getCounter = (state: StateSchema) => state.counter;
