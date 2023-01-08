import { ActionReducerMap } from "@ngrx/store";
import { CategoriesReducers } from "../categories/categories.reducers";
// import { HomeReducers } from "../home/home.reducers";
// import { MessageReducers } from "../shared/components/message/message.reducers";
// import { UserReducers } from "../user/user.reducers";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    // homeState:HomeReducers,
    // messageState:MessageReducers,
    categoriesState:CategoriesReducers,
    // userState:UserReducers
    
}