import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private readonly baseUrl: string = environment.baseUrl;


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  public setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/user/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => console.log(err.error.message)))
      );
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('token', token);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          //this._authStatus.set( AuthStatus.authenticated );
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }


  async register(user: User) {

    let {
      nombre,
      edad,
      sexo,
      email,
      password
    } = user;

    const validEmail = await fetch(`${this.baseUrl}/api/user/buscarEmail/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

    }).then(response => response.json())

    try {
      if (!validEmail.ok) {
        const new_user = await fetch(`${this.baseUrl}/api/user`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, edad, sexo, email, password })
        }).then(response => response.json())

        if (new_user.error) {
          await Swal.fire('Error', new_user.message[0], 'error')
        }
        else await Swal.fire('Successfully', 'You have registered on the platform', 'success')
      }
      else {
        await Swal.fire('Error', 'Email not valid', 'error')
      }
    } catch (error) {
    }
    return;
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

}
