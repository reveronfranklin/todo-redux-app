import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './todo.actions';

import { Todo } from './models/todo.model'




export const estadoInicial: Todo[] = [
    new Todo('Salvar al Mundo'),
    new Todo('Reunion 4 pm'),
    new Todo('Descansar'),
];

const _todoReducer = createReducer(
    estadoInicial,
    on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(actions.borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
    on(actions.borrarCompletados, (state) => state.filter(todo => !todo.completado)),
    on(actions.toggle, (state, { id }) => {


        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }

        })
    }),

    on(actions.toggleAll, (state, { completado }) => {


        return state.map(todo => {

            return {
                ...todo,
                completado: completado
            }


        })
    }),


    on(actions.editar, (state, { id, texto }) => {


        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }

        })
    }),

);

export function todoReducer(state: any, action: Action) {
    return _todoReducer(state, action);
}