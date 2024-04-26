import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent {
  // For storing all the currencies
  currencies: any[] = [];
  // For storing the conversion rates 
  rates: any[] = [];

  // All the properties for using ngModel
  fromCountry:string="";
  toCountry:string="";
  amount:number=1;
  output:number=0;

  // Making the instance of service
  constructor(private service:ApiServiceService){  }

  // Calling fetchCurrencies function of the service as soon as component is created
  ngOnInit() {

    // fetchCurrencies() gives the list of all the currencies
    this.service.fetchCurrencies().subscribe(
      (response: any) => {
        this.currencies = Object.entries(response).map(([code, name]) => ({ code, name }));
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );
  }



  convert(){
    console.warn(this.fromCountry, this.toCountry, this.amount);
  
    // Calling the getCurrencyRates function of the service which gives the rates of the all currencies with respect to base currency.
    // Here the base currency is is the fromCountry.
    this.service.getCurrencyRates(this.fromCountry, this.toCountry, this.amount.toString()).subscribe(
      (response: any) => {
        // Parse the response 
          // Calculate the exact conversion result
        this.output = this.amount * response;

        const responseBody = response.body;
        console.log(response);
        // Check if the response body exists and contains the conversion result
        if (responseBody && responseBody.success) {
          // Get the exact conversion rate from the response body
          const conversionRate = responseBody.value;
  
          
        } else {
          // Handle the case where the response body is missing or the conversion failed
          console.error('Conversion failed or invalid response.');
        }
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );
  }
  


}
