// import { IconButton } from '@material-ui/core';
// import InputAdornment from '@material-ui/core/InputAdornment';
 import TextField from '@material-ui/core/TextField'
// import AddCircle from '@material-ui/icons/AddCircle'
import * as React from 'react';

interface IProps{
    findJobs:any,
}

interface IState{
    locationInput:string
    searchInput:string
}


export default class Header extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = { 
            locationInput:"",
            searchInput:""
        }
    }

    public findJobs = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        this.props.findJobs(this.state.searchInput, this.state.locationInput)        
    }

    public render() {
        return (
            <div className="header">
            <form className="form" id="showJob">
                <TextField
                    id="search"
                    className = "SearchBar"
                    label="Search"
                    margin="normal"
                    onChange = { (event: any) => this.setState({searchInput:event.target.value})}
                    value = {this.state.searchInput}
                />
                <TextField
                    id="location"
                    label="Location"
                    margin="normal"
                    onChange = { (event: any) => this.setState({locationInput:event.target.value})}
                    value = {this.state.locationInput}
                />
                <button className="button is-info" onClick={this.findJobs}> Search </button>
            </form>

            
            </div>
        )
    }
}