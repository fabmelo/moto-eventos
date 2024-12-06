import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly httpClient = inject(HttpClient);

  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.back4app.appId,
    'X-Parse-REST-API-Key': environment.back4app.restApiKey,
    'X-Parse-Master-Key': environment.back4app.masterKey,
  });

  public getEstados(): Observable<any> {
    return this.httpClient.get(environment.back4app.apiStateUrl, {
      headers: this.headers,
    });
  }

  public getCidades(objectId: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append(
      'where',
      JSON.stringify({
        state: {
          __type: 'Pointer',
          className: 'StateProvince',
          objectId: objectId,
        },
      })
    );
    params = params.append('limit', '1000');
    return this.httpClient.get(environment.back4app.apiCityUrl, {
      headers: this.headers,
      params,
    });
  }
}
