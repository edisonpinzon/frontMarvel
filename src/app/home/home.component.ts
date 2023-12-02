import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from './Character';
import { HttpServiceService } from '../http-service.service';
import { logs } from './logs';
import { PopUpComponent } from './pop-up/pop-up.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit,OnDestroy
{

  public characters:Character[]=[];
  public lgs:logs[]=[];
  modalRef: MdbModalRef<PopUpComponent> | null = null;
  suscription:Subscription = new Subscription();

  constructor(private service: HttpServiceService,
    private modalService: MdbModalService ) { }


  openModal(id:number,name:string) {
      this.modalRef = this.modalService.open(PopUpComponent, {
        data: { id: id,
                name: name },
      });
      this.modalRef.onClose.subscribe((message: any) => {
        console.log(message);
      });
  }

  ngOnInit(): void {
    this.getCharacters();
    this.getLogs();

  }

  getCharacters() {
    this.service.getCharactersMarvel().subscribe((res) => {
     this.characters = res;

      this.suscription = this.service.logs$.subscribe(()=>{
        this.getLogs();
      });
    }, () => {});
  }


  getLogs() {
    this.service.getLogs().subscribe((res) => {
      this.lgs=res;
    }, () => {});
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
