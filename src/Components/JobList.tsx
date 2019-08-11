// import Close from '@material-ui/icons/Close'
 import Star from '@material-ui/icons/Star'
 import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'
import Card from 'react-bootstrap/Card';
import { FacebookProvider, ShareButton } from 'react-facebook';
// import { Button } from '@material-ui/core';


interface IState{
    jobList: any
}

interface IProps{
    mount:any
}

export default class JobList extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = { 
            jobList: []
            }
    }

    public componentDidMount = () =>{
        this.search()
    }

    public deleteJob = (id:any) => {
        fetch("https://findmeajobapidevops97.azurewebsites.net/api/Jobs/"+id,{
            method:'DELETE'
        }).then(() => {
            this.search()
        })
    }


    public search = () => {
        fetch("https://findmeajobapidevops97.azurewebsites.net/api/Jobs/Applied", {
            headers: {
                Accept: "text/plain"
            },
            method:"GET"
        }).then(response => {
            return response.json()
        }).then((result:any) => {
            console.log(result);
            const output:any[] = []
            result.forEach((Jobs:any) => {
                const row = (
                <Card style={{ width: '53%' }} className= "centre" >
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
                    <button onClick={() => this.deleteJob(Jobs.jobId)}>Delete</button>

                    <td className="align-middle" >{Jobs.applied === true?<Star/>:<StarBorder/>}</td>
                  </FacebookProvider>
                  </div>
                  
                </Card>
                )
                console.log("hey",Jobs.applied); 
                output.push(row);
            });
            this.setState({jobList:output})
        })
        console.log("2nd"); 
  } 

    public render(){
        return (
            <div>
                {"\n"}
                <h1>Applied Jobs</h1>
                {this.state.jobList}
              
            </div>
        )

    }
}