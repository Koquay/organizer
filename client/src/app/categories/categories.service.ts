import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as categoriesActions from './categories.actions';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url = '/api/categories';

  constructor(
    private httpClient:HttpClient,
    private store:Store
  ) { }

  public  getCategories = () => {
    this.httpClient.get<{categories:{}}>(this.url).pipe(
      tap(categories => {
        console.log('CategoriesService.categories', categories)
        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => { 
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()
  }

  

  public addCategory = (categoryName) => {
    console.log('categoriesService.addCategory.categoryName', categoryName);
    this.httpClient.post<{categories}>(`${this.url}`, {categoryName}).pipe(
      tap(categories => {
        console.log('categoriesService.addCategory.categories', categories)
        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => {         
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()    
  }

  public deleteCategory = (categoryId) => {
    this.httpClient.delete<{categories}>(`${this.url}/${categoryId}`).pipe(
      tap(categories => {
        console.log('categoriesService.deleteCategory.categories', categories)
        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => {         
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()    
  }

  public addSite = (newSite) => {
    console.log('newSite', newSite);
    this.httpClient.post<{categories}>(`${this.url}/site`, newSite).pipe(
      tap(categories => {
        console.log('categoryService.categories', categories)
        // this.store.dispatch(categoriesActions.StoreUpdatedCategory({category}))

        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => { 
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()    
  }

  public addBookmark = (bookmark) => {
    console.log('bookmark', bookmark);
    this.httpClient.post<{categories}>(`${this.url}/site/bookmark`, bookmark).pipe(
      tap(categories => {
        console.log('categoriesService.categories', categories)
        // this.store.dispatch(categoriesActions.StoreUpdatedSite({site}))

        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => { 
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()    
  }

  public deleteBookmark = (categoryId, siteId, bookmarkId) => {
    this.httpClient.delete<{categories}>(`${this.url}/${categoryId}/${siteId}/${bookmarkId}`).pipe(
      tap(categories => {
        // this.store.dispatch(categoriesActions.StoreUpdatedSite({site}))
        this.store.dispatch(categoriesActions.StoreCategories({categories}))
      }),
      catchError((errorObj) => { 
        // this.store.dispatch(messageActions.SetError({error:errorObj.error}));
        throw errorObj;
      })
    ).subscribe()  
  }

}
