import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocktailsService } from './shared/cocktails.service';
import { FormComponent } from './form/form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CocktailPartyComponent } from './cocktail-party/cocktail-party.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ToolbarComponent,
    CocktailPartyComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CocktailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
