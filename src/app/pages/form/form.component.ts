import { Component, Inject, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Code } from '../../models/code';
import { Firestore,addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public editando: boolean = false;
  public nombreControl: FormControl = new FormControl('');
  public urlControl: FormControl = new FormControl('');

  private _firestore: Firestore = inject(Firestore);
  private _codeCollection = collection(this._firestore, 'codes');
  private _router = inject(Router);
  public CrearOModificar(){
      const codeItem: Code = {
        name: this.nombreControl.value,
        url: this.urlControl.value
      }

      if (!this.editando){
        addDoc(this._codeCollection, codeItem);
        console.log("codigo QR creado Correctamente");
        this._router.navigateByUrl("codes");
      }
    }
  }
