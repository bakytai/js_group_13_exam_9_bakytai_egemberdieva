import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../shared/cocktail.model';

@Component({
  selector: 'app-cocktail-party',
  templateUrl: './cocktail-party.component.html',
  styleUrls: ['./cocktail-party.component.css']
})
export class CocktailPartyComponent implements OnInit {
  cocktails!: Cocktail[];
  constructor() { }

  ngOnInit(): void {
  }

}
