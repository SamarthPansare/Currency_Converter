import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  // Making instance of HttpClient
  constructor(private http: HttpClient) { }
  
  // Returning the list of the curencies.
  fetchCurrencies() {
    
    // Api url found using chatGPT
    const apiUrl = 'https://openexchangerates.org/api/currencies.json';
    // Calling get request
    return this.http.get(apiUrl);
  }
  getCurrencyRates(base:string){

    // Accepting base as parameter and fetching the rates using api
    const url = 'https://api.exchangerate.host/latest?base='+base;
    // Calling get request
    return this.http.get(url);
  }

}
