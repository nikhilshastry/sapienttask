import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sapient';
  launches: any;
  selected: boolean = false;
  years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  
  launchButtons = [
    {class: "btn btn-success", name: "True"},
    {class: "btn btn-success", name: "False"}
  ]
  landButtons = [
    {class: "btn btn-success", name: "True"},
    {class: "btn btn-success", name: "False"}
  ]

  selectedLaunchButton;
  launch : boolean = false;
  selectedLandButton;
  land : boolean = false;
  year : number;
  isLoading : boolean = true;
  constructor( private http: HttpClient) {}
  ngOnInit(){
    
    this.http.get('https://api.spacexdata.com/v3/launches?limit=100')
    .subscribe((data)=>{
      this.launches=data
      this.isLoading=false
    })
  }
  select(item) {
    this.selected = item; 
  } 
  isActive(item) {
    return this.selected === item;
  }
  toggleSelect(button, type, val) {
    this.isLoading = true
    if(type == 'launch') {
      if (button == this.selectedLaunchButton) {
        this.selectedLaunchButton = undefined
      } else {
        this.selectedLaunchButton = button
        if(val == 'False') {
          this.launch = false
        } else {
          this.launch = true
        }
      }
    } else {
      if (button == this.selectedLandButton) {
        this.selectedLandButton = undefined
      } else {
        this.selectedLandButton = button
        if(val == 'False') {
          this.land = false
        } else {
          this.land = true
        }
      }
    }
    this.applyFilter(this.launch,this.land,this.year)
  }
  applyFilter(launch:boolean, land:boolean, year:number) {
    //alert(year)
    if(land){
      if(year==undefined) {
        var url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true'
        //alert(url)
        this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
      } else {
        var url = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=`+year
        //alert(url)
        this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
      }
    }
    else if(launch) {
      if(land) {
        if(year==undefined) {
          var url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true'
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        } else {
          var url = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=`+year
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        }
      } else {
        if(year==undefined) {
          var url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=false'
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        } else {
          var url = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=false&launch_year=`+year
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        }
      }
    } else if(!launch) {
        if(year==undefined) {
          var url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=false&land_success=false'
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        } else {
          var url = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=false&land_success=false&launch_year=`+year
          //alert(url)
          this.http.get(url).subscribe((data)=>{this.launches=data; this.isLoading=false})
        }
    }
    //alert(this.launches.length)
  }
  switchYear(selectedYear:number) {
    this.year = selectedYear;
    this.isLoading = true
    if(this.launch || this.land)
      this.applyFilter(this.launch,this.land,this.year)
    else
      this.http.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_year=`+selectedYear).subscribe((data)=>{this.launches=data; this.isLoading=false})
  }
}


