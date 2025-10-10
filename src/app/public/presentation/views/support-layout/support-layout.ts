import { Component } from '@angular/core';
import {SupportNavbar} from '../../../../shared/components/suport-navbar/support-navbar';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-support-layout',
  imports: [SupportNavbar, RouterOutlet],
  standalone: true,
  templateUrl: './support-layout.html',
  styleUrl: './support-layout.css'
})
export class SupportLayout {

}
