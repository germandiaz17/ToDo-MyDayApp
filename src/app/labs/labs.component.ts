import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicacion con Angular'
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio'
  ])

  colorCtrl = new FormControl()
  widthCtrl = new FormControl(50,{
    nonNullable: true
  })

  nameCtrl = new FormControl('German',{
    nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
  })

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      // console.log(value)
    })
  }
  
  name = signal('German')
  disabled = true
  img = 'https://w3schools.com/howto/img_avatar.png'
  person = signal({
    name: 'German',
    age: 22,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  })

  clickHandler() {
    alert('hola ' + this.person.name)
  }

  clickDoble() {
    alert('estamos haciendo doble click')
  }

  changeHandler(event: Event) {
    console.log(event)
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    console.log(input.value)
  }

  updateTitle(event: KeyboardEvent) {
    const title = event.target as HTMLInputElement
    const newValue = title.value
    this.name.set(newValue)
  }
}
