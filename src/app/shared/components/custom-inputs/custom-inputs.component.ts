import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-inputs',
  templateUrl: './custom-inputs.component.html',
  styleUrls: ['./custom-inputs.component.scss'],
})
export class CustomInputsComponent  implements OnInit {

  @Input() control!:  FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!:  boolean;
  hide: boolean = true;
  
  constructor() { }

  optionsTeam = [
    { value: 'local', name: 'Local' },
    { value: 'visitor', name: 'Visitante' }
  ]


  ngOnInit() {
    if (this.type === 'password') this.isPassword = true;
  }

  showOrHidePassword() {
    this.hide = !this.hide;

    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }
}
