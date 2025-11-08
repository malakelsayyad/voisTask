import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
  pure: true
})
export class SearchPipe implements PipeTransform {

  transform<T>(items: T[] | null | undefined, term: string = ''): T[] {
    if (!items || !term?.trim()) return items || [];

    const lower = term.toLowerCase();

    return items.filter(item =>
      Object.values(item || {}).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(lower)
      )
    );
  }
}