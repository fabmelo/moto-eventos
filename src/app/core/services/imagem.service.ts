import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagemService {
  private readonly httpClient = inject(HttpClient);

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    return this.httpClient.post<any>(environment.cloudinary.apiUrl, formData);
  }

}
