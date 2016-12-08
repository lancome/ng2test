import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PersonDataService }  from './person-data.service';
import { Person }  from './person';

@Component({
    selector: 'person-form',
    templateUrl: '/app/person/person-form.template.html',
    providers: [PersonDataService]
})

export class PersonComponent implements OnInit {
    persons: Person[] = [];
    model: Person = new Person("", "");
    formPerson: FormGroup;
    selectedPerson: Person;
    isEdit: boolean = false;
    index: number;
    constructor(private dataService: PersonDataService) { }

    ngOnInit() { 
        this.formPerson = new FormGroup({
            name: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]),
            lastname: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]),
        });
        this.persons = this.dataService.getAllPersons();
    }

    submit({value}: { value: Person }) {
        console.log(value);
        console.log(this.formPerson);
        if(this.isEdit)
        {
            this.dataService.editPerson(value, this.index);
            this.isEdit = false;
            console.log(value);
        }
        else
        {
            this.dataService.addPerson(value);
        }
        this.formPerson.reset();
    }
    
    delete(person: Person) {
        this.dataService.removePerson(person);
    }

    edit(person: Person) {
        this.formPerson = new FormGroup({
            name: new FormControl(person.name, [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]),
            lastname: new FormControl(person.lastname, [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]),
        });
        this.isEdit = true;
        this.index = this.persons.indexOf(person);
    }
}