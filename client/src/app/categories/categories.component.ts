import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesService } from './categories.service';

declare const window: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories;
  public category;
  public categoryLink;
  public siteUrl;
  public site;
  public siteImgUrl;
  public categoryId;
  public categoryName;
  public deleteCategoryName = undefined;
  public deleteCategoryId = undefined;
  public deleteCategoryObj = {};
  public bookmarkTitle;
  public bookmarkLink;
  public processingCategory;
  private isRefreshViewBookmarksModal = false;
  public viewBookmarksModal: any;

  constructor(
    private store:Store<{categoriesState}>,
    private categoriesService:CategoriesService
  ) { }

  ngOnInit() {
    this.subscribeToReduxStores();
    this.getCategories()
  }

  private getCategories = () => {
    this.categoriesService.getCategories();
  }

  private subscribeToReduxStores = () => {   
    const categories$ = this.store.select((state) => {
      console.log('state.categoriesState.categories', state.categoriesState.categories)
      return state.categoriesState.categories
    })

    categories$.subscribe(categories => {
      console.log('categoriesComponent.categories 1', categories)
      this.categories = categories;  
      this.setActiveCategory(this.processingCategory || categories[0]);        
      console.log('categoriesComponent.categories 2', this.categories)

      if(this.isRefreshViewBookmarksModal) {
        this.refreshViewBookmarksModal();
        this.isRefreshViewBookmarksModal = false;
      }
    })
  }

  private refreshViewBookmarksModal = () => {
    this.viewBookmarksModal = new window.bootstrap.Modal(
      document.getElementById('viewBookmarksModal')
    );
    // this.viewBookmarksModal.dispose();
    // this.viewBookmarksModal.show();

    // window.location.reload()
  }

  public setActiveCategory = (category) => {
    this.categoryLink = category?.link;
    this.categoryId = category?._id
    this.category = category;
    this.processingCategory = null;
  }

  public addCategory = () => {
    console.log('categoryName', this.categoryName)
    this.categoriesService.addCategory(this.categoryName)
    this.setDeleteCategoryName();
  }

  onChange = (deleteCategoryObj) => {
    console.log('deleteCategoryObj', deleteCategoryObj)
    this.deleteCategoryName = deleteCategoryObj.name
    this.deleteCategoryId = deleteCategoryObj?._id
    console.log('deleteCategoryId', this.deleteCategoryId);
    console.log('deleteCategoryName', this.deleteCategoryName);
   }

  deleteCategory = () => {
     this.categoriesService.deleteCategory(this.deleteCategoryId)
  }


  public addSite = () => {
    console.log('siteUrl', this.siteUrl);
  
    const newSite = {categoryId: this.categoryId, siteUrl: this.siteUrl}

    this.categoriesService.addSite(newSite)

    this.processingCategory = this.category
    
    // this.viewBookmarksModal.hide();
    
  }

  public setActiveSite = (site) => {
    console.log('active site', site)
    this.site = site?.site;
  }

  public addBookmark = () => {
    console.log('categoryId', this.site?.categoryId)
    console.log('siteId', this.site?._id)
    console.log('this.bookmarkLink', this.bookmarkLink)
    console.log('bookmarkTitle', this.bookmarkTitle)
 
    const bookmark = {categoryId: this.site?.categoryId, siteId: this.site?._id, 
        bookmarkLink: this.bookmarkLink, bookmarkTitle: this.bookmarkTitle, }

    this.categoriesService.addBookmark(bookmark)
  }

  public deleteBookmark = (siteId, bookmarkId) => {
    console.log('delete bookmarkId', this.category?._id, siteId, bookmarkId)
    this.isRefreshViewBookmarksModal = true;
    this.categoriesService.deleteBookmark(this.category?._id, siteId, bookmarkId )

  }

  setDeleteCategoryName = () => {
    this.deleteCategoryName = null;
  }

  

}
