import { createAction, props } from "@ngrx/store";

export const getCategoriesState = createAction (
    '[Categories] Get Categories State]',
    props<{ categoriesState: {} }>()
  );

  export const StoreCategories = createAction(
    '[Store Categories] Store Categories',
    props<{categories}>()
  )

  export const StoreUpdatedCategory = createAction(
    '[Store Updated Category] Store Updated Category',
    props<{category}>()
  )

  export const StoreUpdatedSite = createAction(
    '[Store Updated site] Store Updated site',
    props<{site}>()
  )

  