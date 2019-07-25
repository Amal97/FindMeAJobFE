// import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import './App.css';
// import { Button } from '@material-ui/core';
import Header from './Components/Header';

// import logo from './logo.svg';

interface IState {
  locationSearch: string
  inputSearch: string
  jobList: object
  updateJobList: any
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      inputSearch: "",
      jobList: [],
      locationSearch: "",
      updateJobList: null
    }
  }



  public findJobs = (inputSearch: string, locationSearch: string) => {
    const body = {"inputSearch":inputSearch, "locationSearch":locationSearch}
    const proxyurl = "https://findmeajobapidevops97.azurewebsites.net/api/Jobs";
    const url = "https://findmeajob.azurewebsites.net/";
    fetch(proxyurl + url, {
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(() => {
      this.state.updateJobList();
    })
    console.log(inputSearch);
    console.log(locationSearch);
    
  }

  public render() {
    return (
       <div>
         <Header findJobs={this.findJobs} />

       </div>

      
    );
  }
}

export default App;
