import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailPartyComponent } from './cocktail-party/cocktail-party.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: '', component: CocktailPartyComponent},
  {path: 'create', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
