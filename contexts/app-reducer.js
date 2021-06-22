
export const appReducer = (state, action) => {
       switch (action.type) {
              case 'loadCategorias':
                     return {
                            ...state,
                            categorias: action.payload[0].categorias
                     }
              case 'loadEventos':
                     return {
                            ...state,
                            eventos: action.payload.data,
                            loading: action.payload.loading
                     }
              default:
                     return state;
       }
}