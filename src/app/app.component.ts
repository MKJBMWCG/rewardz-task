import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDrawer, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatChipsModule,MatSidenavModule,MatIconModule,MatBadgeModule,HeaderComponent,FooterComponent,MatExpansionModule,MatCardModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  @ViewChild('drawer', {static: true}) drawer!: MatSidenav;
   rightMnenu = false;
   direction:string = "";
  title = 'rewardzapp';
  productsDetails:any=[]
  atozActive=false;
  ztoaActive= false;
  categoriesArray = [
    {
      id:1,
      icon_arrow:"keyboard_arrow_down",
      title:"e-Voucher",
      icon_check:"check_circle"
    },{
    id:2,
    icon_arrow:"keyboard_arrow_down",
    title:"Products",
    icon_check:"check_circle_outline"
  },
  {
    id:3,
    icon_arrow:"keyboard_arrow_up",
    title:"Evergreen",
    icon_check:"check_circle_outline"
  },
  {
    id:4,
    icon_arrow:"keyboard_arrow_up",
    title:"Fashion & Retail",
    icon_check:"check_circle_outline"
  },
 ]
  
  constructor(private http:HttpClient){}

  ngOnInit(): void {
       this.http.get('/assets/data/db.json').subscribe({
        next:(res) =>{
          this.productsDetails = res
        },
        error:(err) =>{
          console.log(err)
        },
        complete(){
          console.log("Completed");
          
        }
       })
  }
  rightMenu(){
   this.rightMnenu = !this.rightMnenu;
  }
  accendingOrder(direction:string){
   this.direction = direction;
   this.atozActive = !this.atozActive
   this.ztoaActive = false
  }
  desccending(direction:string){
    this.direction = direction
    this.ztoaActive = !this.ztoaActive
    this.atozActive = false
  }
  applyFilter(){
    if(this.direction == 'desc'){
   this.productsDetails.sort((a:any,b:any) =>{
    return b.name.localeCompare(a.name);
   })
    
    }else{
      this.productsDetails.sort((a:any,b:any) =>{
        return a.name.localeCompare(b.name); 
       })
       this.atozActive = true
    }
    this.drawer.close();
  }
}
