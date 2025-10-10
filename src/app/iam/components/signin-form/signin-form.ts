import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signin-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe, RouterLink],
  standalone: true,
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css'
})
export class SigninForm {
  signinForm: FormGroup;
  User = User;
  constructor(private fb: FormBuilder, private ust: UsersStore) {
    this.signinForm = this.fb.group({
      name: [''],
      username: [''],
      password: [''],

    })
  }
}
