import { Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model'
import { RecipeService } from 'src/app/recipes/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
 recipe: Recipe;

 constructor(private recipeService: RecipeService,
   private route: ActivatedRoute,
   private router: Router,
   private store: Store<fromApp.AppState>) { }

 ngOnInit() {
   //const id = this.route.snapshot.params['id'];     or but not suitable
   this.route.params
     .subscribe(
     (params: Params) => {
       this.id = +params['id'];
       this.recipe = this.recipeService.getRecipe(this.id);
     });
 }
  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  // or  this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
