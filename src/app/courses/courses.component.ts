import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  //Initiating array for courses
  courseList: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = "";

  //Making service available
  constructor (private courseservice: CourseService) { }

  //Fetching data from API
  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courseList = data;
      this.filteredCourses = data;
    })
  }

  //Filter
  filterSearch(): void {
    this.filteredCourses = this.courseList.filter((course) => {
      return course.coursename.toLowerCase().includes(this.filterValue.toLowerCase()) || course.code.toLowerCase().includes(this.filterValue.toLowerCase());
    });
  }

  //Sorting
  sortCourses(e: Event): void {
    const target = e.target as HTMLElement;
    const searchType = target.innerHTML;

    if(searchType === "Kurskod") {
      //sorting array after coursecode
      this.courseList.sort((a,b) => {
          if (a.code > b.code) { //Returning 1 if a should be listed after b
          return 1;
        } if (a.code < b.code) { //Returnsing -1 if a should be listed before b
          return -1;
        } else {
            return 0;   //Returning 0 if a and b are equal
        }
      })

      } else if(searchType === "Kursnamn") {
        //Sorting array after coursname
        this.courseList.sort((a,b) => {
          if (a.coursename > b.coursename) {
            return 1;
          } if (a.coursename < b.coursename) {
            return -1;
          } else {
              return 0;
          }
        })

      } else {
        //Sorting array after progression
        this.courseList.sort((a,b) => {
          if (a.progression > b.progression) {
            return 1;
          } if (a.progression < b.progression) {
            return -1;
          } else {
              return 0;
          }
      })
    }
  }
}
