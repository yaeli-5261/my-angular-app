import { Component, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
     MatButtonModule, MatCardModule, MatIconModule,MatSelectModule
  ], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  status: string = "login";
  showRegister: boolean = true;

  roles:string[]=['Student','teacher']

  constructor(private usersService:UsersService, private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: [''], 
    });
  }

  get formFields(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin() {

    const name = this.loginForm.value.name;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const role = this.loginForm.value.role;

    if(this.status=='login'){

   

      this.usersService.login(email, password).subscribe({
        next: (res) => {
          sessionStorage.setItem('userToken',res.token)
          sessionStorage.setItem('userId',res.userId.toString())
         

          console.log('User is logged in');
          this.router.navigate(['/menu']);
        } ,

        error:(error)=>
        {
          console.log('Login failed Erorr: ',error);
        }
      });
    
    }
    else{
      this.usersService.register(name,email, password,role).subscribe({
        next: (res) => {
          console.log(res);
          
          sessionStorage.setItem('userToken',res.token)
          sessionStorage.setItem('userId',res.userId.toString())
          
          console.log('User is Resigstered');
          this.router.navigate(['/menu']);
        } ,
        error:(error)=>
        {
          console.log('Login failed Error:',error);
        }
      });
    }
  //  to clean form after submit
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.reset();
        control.markAsPristine();
        control.markAsUntouched();
        control.setErrors(null);
      }
    });
  }


  togglePasswordVisibility() { // פונקציה להחלפת מצב הסיסמא
    this.hidePassword = !this.hidePassword;
  }

  toRegister() {
    this.status = "register";
    this.showRegister = false;
  }
}



