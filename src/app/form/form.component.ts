import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cocktailForm!: FormGroup;

  constructor() { }

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

  getStepControls() {
    const ingredients =  <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }
}
