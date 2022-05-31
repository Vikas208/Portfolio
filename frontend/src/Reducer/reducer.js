import { actions } from "./actions";

export const reducer = (state, action) => {
       // console.log(action);

       switch (action.type) {
              case actions.CHANGETHEME:
                     return {
                            ...state,
                            changeTheme: action.changeTheme,
                     };
              default:
                     return {
                            ...state,
                     };
       }
}