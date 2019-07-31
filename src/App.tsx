// import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import './App.css';
// import { Button } from '@material-ui/core';
import Header from './Components/Header';
import JobList from './Components/JobList';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import Card from 'react-bootstrap/Card';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


// import logo from './logo.svg';

interface IState {
  locationSearch: string
  inputSearch: string
  isSignedIn:boolean
  jobList: object
  updateJobList: any
}

  firebase.initializeApp({
    apiKey:"AIzaSyAM5UQGYIRCd845-OdWSmwtS0DQdhyKmbk",
    authDomain:"findmeajob-b108e.firebaseapp.com"
  })


class App extends React.Component<{}, IState>{
    private uiConfig = {
    Callbacks: {
      signInSuccess: () => false
    },
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ]
  }
  public constructor(props: any) {
    super(props);
    this.state = {
      inputSearch: "",
      isSignedIn: false,
      jobList: [],
      locationSearch: "",
      updateJobList: null
    }
  }

  
  public componentDidMount = () =>{
  firebase.auth().onAuthStateChanged(user => {
    this.setState({isSignedIn: !!user })
    console.log("user", user)
    })
  }
  
  public updateJobList =() =>{
        console.log("hey");
  }

  public listMounted = (callbacks: any) => {
    this.setState({ updateJobList: callbacks })
  }


  public findJobs = (inputSearch: string, locationSearch: string, fromSearch: string) => {
    console.log(fromSearch);
    const body = {"jobSearch":inputSearch, "location":locationSearch, "from":fromSearch}
    const proxyurl = "https://findmeajobapidevops97.azurewebsites.net/api/Jobs";
    fetch(proxyurl, {
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
         "Content-Type": "application/json",
      },
      method: "POST"
      }).then((ret:any) => {
            return ret.json();
        }).then((result:any) => {
            console.log(result);
            const output:any[] = []
            result.forEach((Jobs:any) => {
                const row = (
                <Card style={{ width: '60rem' }}>
                <Card.Body>
                    <Card.Title>{Jobs.jobTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{Jobs.companyName}</Card.Subtitle>
                    <Card.Text>
                        {Jobs.jobDescription}
                    </Card.Text>
                    <Card.Link href={Jobs.webUrl}>Visit Website</Card.Link>
                </Card.Body>
                </Card>
                )
                output.push(row);
            });
            this.setState({jobList:output})
        })
        console.log("2nd");
    
  }



  public render() {
    return (
       <div className="App">
         {this.state.isSignedIn ? (
           <span>
             <div> Signed In !</div>
             <button onClick={()=>firebase.auth().signOut()}> Sign Out!</button>
             <h1>Welcome {firebase.auth().currentUser!.displayName} </h1>
             <Header findJobs={this.findJobs} />
             <JobList mount={this.listMounted} />
             {this.state.jobList}
          </span>
         ):(
           <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
         )}
       </div>

      
    );
  }
}

export default App;
