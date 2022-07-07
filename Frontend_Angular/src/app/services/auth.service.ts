import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) {}

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  getUsuarios() {
    return this.httpClient.get<JwtResponseI>(`${this.AUTH_SERVER}/listado`);
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCES_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expireIn: string): void {
    localStorage.setItem('ACCES_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expireIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = JSON.parse(localStorage.getItem('ACCES_TOKEN')!);
    }
    return this.token;
  }
}
