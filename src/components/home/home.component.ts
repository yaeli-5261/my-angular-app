import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatCardModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  token: string = ""
  showLoginButton: boolean = true; 

  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit() {

    this.token = sessionStorage.getItem("userToken") || "";

    if (this.token !="") {
      this.router.navigate(['/menu']);
    }
   
  }
  handleLoginClick() {

    this.showLoginButton = false; // הסתרת הכפתור
    this.router.navigate(['/login']); // ניווט לעמוד ההתחברות
    
  }
}


