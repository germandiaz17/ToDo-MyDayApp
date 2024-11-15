import { Component, computed, effect, inject, Injector, signal } from '@angular/core';

import { Task } from '../models/task.models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all')
  tasksByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.tasks()
    if(filter === 'pending') {
      return tasks.filter(tasks => !tasks.complete)
    }else if(filter === 'completed') {
      return tasks.filter(tasks => tasks.complete)
    }else{
      return tasks
    }
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^(?!\\s*$).+')
    ]
  });

  injector = inject(Injector)

  ngOnInit() {
    const storage = localStorage.getItem('tasks')
    if(storage){
      const tasks = JSON.parse(storage)
      this.tasks.set(tasks)
    }
    this.trackTasks()
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks()
      console.log(tasks )
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {injector: this.injector})
  }


  changeHandler() {
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value
      this.addTask(value)
      this.newTaskCtrl.setValue('')
    }
  }

  changeStateTask(index: number) {
    this.tasks.update((value) =>
      value.map((task, position) => {
        if (position === index){
            task.complete = !task.complete
          };
        return task;
      })
    );
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title: title,
      complete: false
    }
    this.tasks.update((tasks) => [...tasks,newTask])
  }

  deletTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
  }

  updateTask(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task, complete: !task.complete
          }
        }
        return task
      })
    })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task, editing: true
          }
        }
        return {...task, editing:false}
      })
    })
  }

  updateTaskText(index: number, event:Event) {
    const input = event.target as HTMLInputElement
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }
}
