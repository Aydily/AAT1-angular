import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DogapiService } from '../services/dogapi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NumberSymbol } from '@angular/common';
import { arrayBuffer } from 'stream/consumers';
import { timeout, timer } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  providers:[DogapiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  cards: any[] = [];
  cardDes: any[] = [];
  cartas: any[] = [];
  hover = false;
  pareja = false;
  hoverStates: boolean[] = [];
  indices: number[] = [];
  tarjetaMostrar: any[] = [];
  cantidad: string ="";


  constructor(private dogService: DogapiService) {}

  ngOnInit() {

    if(this.cantidad != ""){
      this.inicio();
    }
    else{
      this.cantidad = "4";
      this.inicio()
    }
  }

  inicio(){
    this.dogService.obtenerCard(this.cantidad).subscribe(datos => {
      this.cards = datos.message;
      this.cardDes = this.desordenar([...this.cards]);
      this.cartas = this.cards.concat(this.cardDes);
      this.hoverStates = Array(this.cardDes.length + this.cards.length).fill(false); 
      this.tarjetaMostrar = Array(this.cardDes.length + this.cards.length).fill(false); 
    });

    console.log(this.cards);

  }
  
  desordenar(tarjetas: string[]): string[] {
    let array = [...tarjetas];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  mostrar(index: number) {
    const mostrar = this.hoverStates.filter(state => state).length;
    if (this.hoverStates[index] || mostrar < 2) {
      this.hoverStates[index] = !this.hoverStates[index];
      this.elementosMostrados();
      if (this.indices.length === 2) {
        this.parejas();
      }
      
    } 
  }

  elementosMostrados() {
    this.indices = this.hoverStates
      .map((state, i) => state ? i : -1)
      .filter(index => index !== -1);
  }


  parejas(){
  
    let carta1 = this.indices[0];
    let carta2 = this.indices[1];
    
    if (this.cartas[carta1] === this.cartas[carta2]) {
      this.tarjetaMostrar[carta1] = true; 
      this.tarjetaMostrar[carta2] = true;
      this.pareja = true; 
      this.ocultar(carta1, carta2);
      setTimeout(()=>{          
        this.validarParejas();
    }, 1000);

    } else {

      setTimeout(()=>{          
        this.ocultar(carta1,carta2);;
    }, 1000);      
    }
    this.indices = [];
} 

ocultar(carta: number, carta1: number){
this.hoverStates[carta] = false;
this.hoverStates[carta1] = false;
}

clases(index: number){
    return {
      'mostrar-clase': this.tarjetaMostrar[index],
      'col': this.cards.length <= 4,
      'col-seis': this.cards.length > 4 
    
}
}

validarParejas()
{
 let x = this.tarjetaMostrar.every(value => value === true);
 if(x){
  alert("¡Felicidades!");
 }
}


}