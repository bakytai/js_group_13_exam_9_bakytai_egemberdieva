export class Cocktail {
  constructor(
    public name: string,
    public imageUrl: string,
    public type: string,
    public description: string,
    public ingredients: [{[key: string]: any}],
    public instructions: string,
  ) {
  }
}
