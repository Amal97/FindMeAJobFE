// import Close from '@material-ui/icons/Close'
// import Star from '@material-ui/icons/Star'
// import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'
import Card from 'react-bootstrap/Card';

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
            jobList: [],
        }
      //  this.updateList();
    }

    public updateList = () => {
        console.log("1st");
        fetch('https://findmeajobapidevops97.azurewebsites.net/api/Jobs' , {
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((result:any) => {
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

    public render(){
        return (
            <div>
                <h1>Jobs</h1>
                <button className="button is-info" onClick={this.updateList}> get jobs </button>
                {this.state.jobList}
            </div>
        )

    }
}