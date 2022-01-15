import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cocktail } from '../shared/cocktail.model';
import { CocktailsService } from '../shared/cocktails.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cocktailForm!: FormGroup;

  constructor(private cocktailService: CocktailsService, private router: Router) { }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imageUrl: new FormControl('', [Validators.required]),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      instructions: new FormControl('', Validators.required)
    });
  }

  addIngredient() {
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
  }
}
