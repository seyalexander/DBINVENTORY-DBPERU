import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderListCargaInventarios',
  standalone: true
})
export class OrderListCargaInventariosPipe implements PipeTransform {

  transform<T>(value: T[], field: keyof T | null = null, sort: 'asc' | 'desc' = 'asc'): T[] {
    try {
      if (!field) {
        return value;
      }
      const sortedList = value.slice().sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });

      return sort === 'asc' ? sortedList : sortedList.reverse();
    } catch (e) {
      console.error('Error en el pipe orderListCargaInventarios:', e);
      //borrar este console
      return value;
    }
  }

}
