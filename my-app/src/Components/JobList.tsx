// import Close from '@material-ui/icons/Close'
// import Star from '@material-ui/icons/Star'
// import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'

interface IState{
    jobList: any
}

interface IProps{
    mount:any
    play:any
}

export default class JobList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            jobList: []
        }
      //  this.updateList();
    }
}