import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Firestore,addDoc, collection } from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Code } from '../../models/code';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  private _router = inject(Router)
  private _firestore: Firestore = inject(Firestore);
  private _codeCollection = collection(this._firestore, 'codes');
  public codeList: any[] = [];

  async ngOnInit(): Promise<void> {
    const documents = await getDocs(this._codeCollection)
    for await (const document of documents.docs) {
      this.codeList.push({...document.data(), id: document.id})
    }
  }

  public openEditForm(item:Code){
    this._router.navigateByUrl(`/form?id=${item.id}`);
  }
  public openViewForm(item:Code){
    this._router.navigateByUrl(`/view?id=${item.id}`);
  }
  async Delete(item:Code){
   await deleteDoc(doc(this._codeCollection,'codes',`${item.id}`));
  }
}
