import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  constructor() { }

  getPeople(term: string = null): Observable<any[]> {
    let items = this.getMockPeople();
    if (term) {
        items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }

  getMockPeople() {
    return [
      {
        id: '5a15b13ca51b0aaf8a99c05a',
        index: 7,
        isActive: true,
        picture: 'http://placehold.it/32x32',
        age: 28,
        name: 'Franklin James',
        gender: 'male',
        company: 'CAXT',
        email: 'franklinjames@caxt.com',
        phone: '+1 (868) 539-2984'
    },
    {
        id: '5a15b13cc3b9381ffcb1d6f7',
        index: 8,
        isActive: false,
        picture: 'http://placehold.it/32x32',
        age: 24,
        name: 'Elsa Bradley',
        gender: 'female',
        company: 'MATRIXITY',
        email: 'elsabradley@matrixity.com',
        phone: '+1 (994) 583-3850'
    },
    {
        id: '5a15b13ce58cb6ff62c65164',
        index: 9,
        isActive: true,
        picture: 'http://placehold.it/32x32',
        age: 40,
        name: 'Pearson Thompson',
        gender: 'male',
        company: 'EZENT',
        email: 'pearsonthompson@ezent.com',
        phone: '+1 (917) 537-2178'
    },
    {
        id: '5a15b13c605403381eec5019',
        index: 12,
        isActive: true,
        picture: 'http://placehold.it/32x32',
        age: 31,
        name: 'Mills Barnett',
        gender: 'male',
        company: 'FARMEX',
        email: 'millsbarnett@farmex.com',
        phone: '+1 (882) 462-3986'
    },
    {
        id: '5a15b13c67e2e6d1a3cd6ca5',
        index: 13,
        isActive: true,
        picture: 'http://placehold.it/32x32',
        age: 36,
        name: 'Margaret Reynolds',
        gender: 'female',
        company: 'ROOFORIA',
        email: 'margaretreynolds@rooforia.com',
        phone: '+1 (935) 435-2345'
    },
    {
        id: '5a15b13c947c836d177aa85c',
        index: 14,
        isActive: false,
        picture: 'http://placehold.it/32x32',
        age: 29,
        name: 'Yvette Navarro',
        gender: 'female',
        company: 'KINETICA',
        email: 'yvettenavarro@kinetica.com',
        phone: '+1 (807) 485-3824'
    },
    {
        id: '5a15b13c5dbbe61245c1fb73',
        index: 15,
        isActive: false,
        picture: 'http://placehold.it/32x32',
        age: 20,
        name: 'Elisa Guzman',
        gender: 'female',
        company: 'KAGE',
        email: 'elisaguzman@kage.com',
        phone: '+1 (868) 594-2919'
    },
    {
        id: '5a15b13c38fd49fefea8db80',
        index: 16,
        isActive: true,
        picture: 'http://placehold.it/32x32',
        age: 33,
        name: 'Jodie Bowman',
        gender: 'female',
        company: 'EMTRAC',
        email: 'jodiebowman@emtrac.com',
        phone: '+1 (891) 565-2560'
    }
    ];
  }
}
