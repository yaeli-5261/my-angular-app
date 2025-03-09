import { Component } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";
import { Courses } from "../components/courses/courses.component";
import { MenuComponent } from "../components/menu/menu.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ColorCourseDirective } from '../Directive/button-hover.directive';

@Component({

  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Navigation Example';

}
