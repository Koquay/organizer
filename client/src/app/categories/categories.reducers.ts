import { createReducer, on } from '@ngrx/store';
import * as categoriesActions from "./categories.actions";

const initialState = {
    categories: []
}

export const CategoriesReducers = createReducer(initialState,
    on(categoriesActions.getCategoriesState, (state, action) => {
        return state;
    }),
    on(categoriesActions.StoreCategories, (state, action) => { 
      console.log('StoreCategories.categories', action.categories)   
      return {
        ...state,
        categories: action.categories,
      };
    }),
    on(categoriesActions.StoreUpdatedCategory, (state, action) => { 
      console.log('StoreCategories.categories', action.category)   
      return {
        ...state,
        categories: addUpdatedCategory(state, action.category)
      };
    }),
    on(categoriesActions.StoreUpdatedSite, (state, action) => { 
      console.log('StoreCategories.site', action.site)   
      // const returnCategories = addUpdatedSite(state, action.site)
      // console.log('returnCategories', returnCategories);
      return {
        ...state,
        categories: addUpdatedSite(state, action.site)
      }
    }),
)

const addUpdatedCategory = (state, category) => {
  console.log('2 inside addUpdatedCategory')
  let categories = state.categories?.filter(cat => cat._id !== category._id) || [];
   categories = [...categories, category]
   console.log('3 after addUpdatedCategory', categories)

   const sortedCategories = categories.sort((a, b) => (a.name > b.name) ? 1 : -1);
   console.log('after addUpdatedSortedCategory', categories)
   return sortedCategories;
}

const addUpdatedSite = (state, site) => {
  console.log('\nsite', site)
  const category = state.categories?.find(cat => cat._id === site.categoryId)
  // let sites = category?.sites?.filter(oldSite => oldSite?.site?._id !== site?._id) || [];
  let sites = category?.sites || [];
  console.log('1. sites.length', sites.length)
  sites = sites?.filter(oldSite => {
    console.log('\noldSite', oldSite)
    console.log('\noldSite.site', oldSite.site)
    
    return oldSite?.site?._id !== site?._id
  }) || [];
  console.log('2. sites.length', sites.length)
   sites = [...sites, site]
   console.log('3. sites.length', sites.length)
   console.log('1 after addUpdatedsite', sites)
   category.sites = sites;
  return addUpdatedCategory(state, category);
  //  return sites;
}
