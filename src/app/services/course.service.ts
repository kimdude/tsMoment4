import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  //Url to API
  private url: string = "https://webbutveckling.miun.se/files/ramschema.json";

  // Accessing HTTPClient
  constructor(private http: HttpClient) { }

  //Fetching courses from API
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
