import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cocktail } from '../shared/cocktail.model';
import { CocktailsService } from '../shared/cocktails.service';
import { urlValidator } from '../validate-url.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cocktailForm!: FormGroup;
  buttonClick = false;

  constructor(private cocktailService: CocktailsService, private router: Router) { }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imageUrl: new FormControl('', [Validators.required, urlValidator]),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      instructions: new FormControl('', Validators.required)
    });
  }

  addIngredient() {
    this.buttonClick = true
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const ingredientsGroup = new FormGroup({
      ingredientName: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      dimension: new FormControl('', Validators.required)
    })
   ingredients.push(ingredientsGroup);
  }

  getIngredientControls() {
    const ingredients =  <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  formHasError(fieldName: string, errorType: string) {
    const field = this.cocktailForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  createCocktail() {
    const id =  Math.random().toString();
    const cocktail = new Cocktail(
      id,
      this.cocktailForm.value.name,
      this.cocktailForm.value.imageUrl,
      this.cocktailForm.value.type,
      this.cocktailForm.value.description,
      this.cocktailForm.value.ingredients,
      this.cocktailForm.value.instructions,
    );

    this.cocktailService.addNewCocktail(cocktail).subscribe(() => {
      this.cocktailService.fetchCocktails();
      void this.router.navigate(['/'])
    });
  }

  resetForm() {
    this.cocktailForm.reset();
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.clear();
  }

  removeIngredient(indexOfIngredient: number) {
    const ingredients =  <FormArray>this.cocktailForm.get('ingredients');
    ingredients.removeAt(indexOfIngredient);
    if (ingredients.length === 0) {
      this.buttonClick = false;
    }
  }
}
