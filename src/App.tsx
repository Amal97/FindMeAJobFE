// import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import './App.css';
// import { Button } from '@material-ui/core';
import Header from './Components/Header';
import JobList from './Components/JobList';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import EjectIcon from '@material-ui/icons/ArrowBack'
import Card from 'react-bootstrap/Card';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FacebookProvider, ShareButton } from 'react-facebook';
import logo from './images/logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';


import 'react-sharingbuttons/dist/main.css'




// import logo from './logo.svg';

interface IState {
  empty: any
  locationSearch: string
  inputSearch: string
  isSignedIn:boolean
  isLoading: boolean
  jobList: any
  updateJobList: any
  fromSearch: string
  applied: boolean
  appliedButtonValue: string
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
      applied: false,
      appliedButtonValue: "Show Applied Jobs",
      empty: "",
      fromSearch:"",
      inputSearch: "",
      isLoading: false,
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
    this.setState({isLoading:true})
    this.setState({applied:false})
    this.setState({appliedButtonValue: "Show Applied Jobs"})

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
                <Card style={{ width: '53%' }} className= "centre">
                  <Card.Body>
                      <Card.Title>{Jobs.jobTitle}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{Jobs.companyName}</Card.Subtitle>
                      <Card.Text>
                          {Jobs.jobDescription}
                      </Card.Text>
                      <Card.Link href={Jobs.webUrl}>Visit Website</Card.Link>
                  </Card.Body>
                  <div>
                  <FacebookProvider appId="2346056735478005"  >
                    <ShareButton href={Jobs.webUrl} className="react-sharing-button__link react-sharing-button--facebook">
                      Share on Facebook
                    </ShareButton>
                    <td className="align-middle" onClick={() => this.handleLike(Jobs)}>{Jobs.applied === true?<Star/>:<StarBorder/>}</td>
                  </FacebookProvider>
                  </div>
                  
                </Card>
                )
                console.log("hey",Jobs.applied); 
                output.push(row);
            });
            this.setState({isLoading:false})
            this.setState({jobList:output})

            if(this.state.jobList.length <= 0){
                this.setState({empty: "No Jobs Found"})
            }
        })
        console.log("2nd"); 
  }

      public handleLike = (Jobs:any) => {
        const toSend = [{
            "from":"",
            "op":"replace",
            "path":"/Applied",
            "value":!Jobs.applied,
        }]
        const proxyurl = "https://findmeajobapidevops97.azurewebsites.net/api/Jobs/update/"+Jobs.jobId;
        fetch(proxyurl, {
            body:JSON.stringify(toSend),
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json-patch+json"
            },
            method: "PATCH"
          }).then(() => {
            console.log("IM IN"); 
          })
    }

    public check=() => {
      this.setState({applied: !this.state.applied})
      if(this.state.appliedButtonValue === "Show Applied Jobs"){
        this.setState({appliedButtonValue: "Hide Applied Jobs"})
      }
      else{
        this.setState({appliedButtonValue: "Show Applied Jobs"})
      }
    }



  public render() {
    return (
       <div className="App">
         {this.state.isSignedIn ? (
           <span>
             <AppBar style={{backgroundColor: '#00ADB4'}} position="static">
              <Toolbar>
                  <EjectIcon />
                <Typography variant="h6" className="title">
                  <Button color="inherit" onClick={()=>firebase.auth().signOut()}> Log Out</Button>
                  <img src={firebase.auth().currentUser!.photoURL || ''} alt="profile picture" width="40" height="40" />
                  <Button style={{backgroundColor: '#00ADB4', color: 'white', position: 'absolute', right: 0}} onClick={this.check}> {this.state.appliedButtonValue} </Button>
                </Typography>

              </Toolbar>
            </AppBar>


             <img src={logo} alt="Logo" width="200" height="200" />;
             <h1 className="h1">Welcome {firebase.auth().currentUser!.displayName} </h1>
             <Header findJobs={this.findJobs} />


             {this.state.isLoading && <h2 className="h2"> This might take some time...</h2>}
             {this.state.isLoading && <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Loading_Key.gif" alt="Loading..."/>}

            {/* <button className="button is-info" onClick={this.check}> {this.state.appliedButtonValue} </button> */}

            {this.state.applied && <JobList mount={this.listMounted} />}
            {!this.state.applied && this.state.jobList}
            <p className="text"> {this.state.empty} </p>

          </span>
         ):
         
         (
          <span>
             <h1 className="h1"> Please Sign In</h1>
             <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
              />
          </span>
         )}
       </div>

      
    );
  }
}


export default App;
