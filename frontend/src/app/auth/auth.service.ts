import { Injectable } from '@angular/core';
import { CrudService } from '../core/services/http/crud.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../core/services/storage/storage.service';
import { StorageKey } from '../core/services/storage/storage.model';
import { map } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';
import { of, Observable } from 'rxjs';
const { AUTH_TOKEN } = StorageKey;

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService {
  endpoint = 'auth';
  token: string;
  redirectUrl: string;

  constructor(http: HttpClient,
    private storage: StorageService,
    private backendSvc: BackendService
  ) {
    super(http);
    this.token = this.storage.read(AUTH_TOKEN) || '';
  }

  public login(email: string, password: string): Observable<any> {
    try {
      return this.backendSvc.post('/auth/login', {
          username: email,
          password: password
        })
        .pipe(
          map((authResult: any) => {
            this.token = authResult.token;
            this.storage.save(AUTH_TOKEN, this.token);
            return this.redirectUrl;
            //this.backendSvc.saveToken(authResult.token);
          })
      );
    } catch (error) {
      console.error('Error during login request', error);
      return of(error);
    }
  }

  public async mockLogin(email: string, password: string) {
      try {
          if (!(email === 'user' && password === 'user')) {
              throw new Error(
                  'When using mockLogin, login with credentials: \nemail: user\npassword:user',
              );
          }
          this.token = 'user';
          this.storage.save(StorageKey.AUTH_TOKEN, this.token);
          return this.redirectUrl;
      } catch (e) {
          return Promise.reject(e.message);
      }
  }

  public getToken(): string {
      return this.token;
  }

  public logout() {
      this.token = '';
      this.storage.remove(AUTH_TOKEN);
  }

  public isLogged(): boolean {
      return this.token.length > 0;
  }
}
