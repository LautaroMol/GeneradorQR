import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public editando: boolean = false;
  public nombreControl: FormControl = new FormControl('');
  public urlControl: FormControl = new FormControl('');
  }
