import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Code } from '../../models/code';
import { Firestore,addDoc, collection, doc, getDoc } from '@angular/fire/firestore';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, QRCodeModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  public editando: boolean = false;
  public nombreControl: FormControl = new FormControl('');
  public urlControl: FormControl = new FormControl('');
  public myCode: any = {};
  public myAngularxQrCode: string = 'prueba';

  private _firestore: Firestore = inject(Firestore);
  private _codeCollection = collection(this._firestore, 'codes');
  private _router = inject(Router);
  private _route = inject(ActivatedRoute)
  
  async ngOnInit(): Promise<void>{
    this._route.queryParams.subscribe(async(param:any) =>{
      const id= param['id'];
      const docRef = doc(this._firestore,'codes',id);
      this.myCode = (await getDoc(docRef)).data()
      this.myCode.id = id;
      if (this.myCode){
        this.editando = true;
        this.myAngularxQrCode = this.myCode.url;
        this.nombreControl.setValue(this.myCode.name);
        this.urlControl.setValue(this.myCode.url);
      }
    })
  }
  public CrearOModificar(){
      const codeItem: Code = {
        name: this.nombreControl.value,
        url: this.urlControl.value
      }

      if (!this.editando){
        addDoc(this._codeCollection, codeItem);
        console.log("codigo QR creado Correctamente");
        this._router.navigateByUrl("codes");
        return;
      }
      const docRef = doc(this._firestore,'codes',this.myCode.id);
      updateDoc(docRef,{...codeItem});
      console.log("codigo QR Actualizado Correctamente");
      this._router.navigateByUrl("codes");
    }
  }
