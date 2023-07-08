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

  // This function will be called when the button is clicked
  convert(){
    console.warn(this.fromCountry,this.toCountry,this.amount);

    // Calling the getCurrencyRates function of the service which gives the rates of the all currencies with respect to base currency.
    // Here the base currency is is the fromCountry.
    this.service.getCurrencyRates(this.fromCountry).subscribe(
      (response: any) => {

        // Response gives object containing 5 entries amongst them entry having the key "rates" contains the rate conversion values
        this.rates = response["rates"];
        console.warn(this.rates);

        // Accessing the rate of the currency entered by user with respect to base currency.
        console.warn(this.rates[<any>this.toCountry]);

        // Multiplying the amount with rate obtained to gain the conversion. And assigning it to the output so can be shown as a result
        this.output = this.amount*this.rates[<any>this.toCountry];
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );

  }
  
}
