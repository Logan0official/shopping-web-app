import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  public transform(value, key: string, term: string) {
    return value.filter((product) => {
      if (product.hasOwnProperty(key)) {
        if (term) {
          let regExp = new RegExp('\\b' + term, 'gi');
          return regExp.test(product[key]);
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  }

  // public transform(value, keys: string, term: string) {

  //   if (!term) return value;
  //   return (value || []).filter((product) => keys.split(',').some(key => product.hasOwnProperty(key) && new RegExp(term, 'gi').test(product[key])));

  // }

  // transform(value: any, filterString: string, propName: string): any {
  //   if (value.length === 0 || filterString === '') {
  //     return value;
  //   }
  //   const resultArray = [];
  //   for (const item of value) {
  //     if (item[propName] === filterString) {
  //       resultArray.push(item);
  //     }
  //   }
  //   return resultArray;
  // }

}
