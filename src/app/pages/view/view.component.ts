import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink,QRCodeModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  public _route = inject(ActivatedRoute)
  private firestore: Firestore = inject(Firestore);
  public myCode: any = {};
  public myAngularxQrCode: string = 'test';

  async ngOnInit(): Promise<void> {
    this._route.queryParams.subscribe(async (param: any) => {
      const id = param['id'];
      if(id){
        const docRef = doc(this.firestore,'codes',id);
        this.myCode=(await getDoc(docRef)).data();
        this.myCode.id = id;{
          this.myAngularxQrCode = this.myCode.url;
        }
      }
    })
  }

}
