import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface SupportItem {
  title: string;
  text: string;
}

@Component({
  selector: 'app-human-suport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './human-suport.html',
  styleUrls: ['./human-suport.css']
})
export class HumanSuport  {

}
