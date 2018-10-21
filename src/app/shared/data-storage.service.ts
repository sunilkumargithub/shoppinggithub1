import { Injectable } from "@angular/core";
//import { Http } from '@angular/http';
import { RecipeService } from "src/app/recipes/recipe.service";
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/http';
import { Recipe } from "src/app/recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "src/app/auth/auth.service";
import { HttpHeaders } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
  private authService:AuthService) { }

  storeRecipes() {
    //const token = this.authService.getToken();
  //  const headers = new HttpHeaders().set('Authorization', 'Bearer asbdiwiudb');
 //   return this.httpClient.put('https://ng-recipe-book-6d620.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(),
     // {
     //   observe: 'body',
        //headers: headers
      //}
    
      // {observe:'events'}
   // );


    const req = new HttpRequest('PUT', 'https://ng-recipe-book-6d620.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true,
        //params: new HttpParams().set('auth', token)
      });
    return this.httpClient.request(req);
  }


  getRecipes() {
    //const token = this.authService.getToken();

    //this.httpClient.get<Recipe[]>('https://ng-recipe-book-6d620.firebaseio.com/recipes.json?auth=' + token)

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-6d620.firebaseio.com/recipes.json', {
      //observe: 'response',
      observe: 'body',



      //responseType:'text'
      //responseType: 'arraybuffer'
     // responseType: 'blob'
       responseType: 'json'
    })
    .map(
      (recipes) => {
        console.log(recipes);
       //const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
           // console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
       // return [];
      })
      .subscribe(
      (recipes: Recipe[]) => {
        
        this.recipeService.setRecipes(recipes);
      });

  }
}
