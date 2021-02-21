import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http/';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params.id) )
  );

  event:Event=new Event()
  link:string="http://localhost:3000/events"
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.eventService.getAll2();
    this.activatedRoute.params.subscribe(e=>this.eventService.get2(e.id).subscribe(e=>this.event=e))
  }

  onUpdate(form: NgForm): void {
    if(this.event.id==0){this.eventService.create2(this.event)} else 
    this.eventService.update2(this.event);
    this.router.navigate([''])}

}
