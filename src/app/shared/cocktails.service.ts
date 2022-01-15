import { Cocktail } from './cocktail.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()

export class CocktailsService {
  createNewCocktail = new Subject<boolean>()
  cocktailsChange = new Subject<Cocktail[]>();
  cocktailsFetching = new Subject<boolean>()

  private cocktails: Cocktail[] = [];
  constructor(private http: HttpClient) {}

  fetchCocktails() {
    this.cocktailsFetching.next(true);
    this.http.get<{[id: string]: Cocktail}>('https://plovo-13-default-rtdb.firebaseio.com/cocktails.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const cocktail = result[id];

          return new Cocktail(id, cocktail.name, cocktail.imageUrl,
            cocktail.type, cocktail.description, cocktail.ingredients, cocktail.instructions);
        });
      }))
      .subscribe(cocktails => {
        this.cocktails= cocktails;
        this.cocktailsChange.next(this.cocktails.slice());
        this.cocktailsFetching.next(false);
      }, error => {
        this.cocktailsFetching.next(false)
      })
  }

  addNewCocktail(cocktail: Cocktail) {
    const body = {
      name: cocktail.name,
      imageUrl: cocktail.imageUrl,
      type: cocktail.type,
      description: cocktail.description,
      ingredients: cocktail.ingredients,
      instructions: cocktail.instructions,
    };

    this.createNewCocktail.next(true)

    return  this.http.post('https://plovo-13-default-rtdb.firebaseio.com/cocktails.json', body).pipe(
      tap(() => {
        this.createNewCocktail.next(false);
      }, () => {
        this.createNewCocktail.next(false);
      })
    );
  }
}
