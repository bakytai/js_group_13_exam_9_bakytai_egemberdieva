import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cocktail } from '../shared/cocktail.model';
import { CocktailsService } from '../shared/cocktails.service';

@Component({
  selector: 'app-cocktail-party',
  templateUrl: './cocktail-party.component.html',
  styleUrls: ['./cocktail-party.component.css']
})
export class CocktailPartyComponent implements OnInit, OnDestroy {
  cocktails!: Cocktail[];
  cocktailDetails!: Cocktail;
  modalOpen = false;
  cocktailsChangeSubscription!: Subscription;
  cocktailsFetchingSubscription!: Subscription;
  isFetching!: boolean;

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.cocktailsChangeSubscription = this.cocktailsService.cocktailsChange.subscribe((cocktails: Cocktail[]) => {
      this.cocktails = cocktails;
      console.log(this.cocktails);
    });

    this.cocktailsFetchingSubscription = this.cocktailsService.cocktailsFetching.subscribe((isFetching:boolean) => {
      this.isFetching = isFetching;
    })

    this.cocktailsService.fetchCocktails();
  }

  ngOnDestroy() {
    this.cocktailsChangeSubscription.unsubscribe();
  }

  onClick(cocktail: Cocktail) {
    this.cocktailDetails = cocktail;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
