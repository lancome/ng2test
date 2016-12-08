import { Person }   from './person';

export class PersonDataService {

    private data: Person[] = [
    { name: 'Jegor', lastname: 'Salajev' },
    { name: 'Denis', lastname: 'Kulakov'  },
    ];

    getAllPersons(): Person[] {
        return this.data;
    }

    addPerson(model:Person) {
        this.data.push(new Person(model.name, model.lastname));
    }

    editPerson(model:Person, index:number) {
        // let index = this.data.indexOf(model);        
        this.data[index]=model;
        // console.log();
    }

    removePerson(model:Person) {
        let index = this.data.indexOf(model);
        this.data.splice(index, 1);
    }
}
