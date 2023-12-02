import { Component, Inject, OnDestroy } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { logs } from '../logs';
import { Character } from '../Character';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnDestroy{

  name: string | null = null;
  id: string | null = null;
  public lgs: logs[] = [];
  public characters: Character[] = [];
  suscription:Subscription = new Subscription();

  constructor(private service: HttpServiceService,
    public modalRef: MdbModalRef<PopUpComponent>) {
  }
 
  ngOnInit(): void {
    if (this.id != null) {
      this.service.getCharactersById(Number(this.id)).subscribe((res) => {
        this.characters = res;
         this.suscription = this.service.logs$.subscribe(()=>{
          this.getLogs();
        });
      }, () => { });
    }

  }

  getLogs() {
    this.service.getLogs().subscribe((res) => {
      this.lgs=res;
    }, () => {});
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
