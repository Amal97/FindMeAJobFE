// import { IconButton } from '@material-ui/core';
// import InputAdornment from '@material-ui/core/InputAdornment';
import './Header.css';
 import TextField from '@material-ui/core/TextField'
// import AddCircle from '@material-ui/icons/AddCircle'
import * as React from 'react';
import Button from '@material-ui/core/Button';

interface IProps{
    findJobs:any,
}

interface IState{
    fromInput:string
    locationInput:string
    searchInput:string
}

export default class Header extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = { 
            fromInput:"seek",
            locationInput:"",
            searchInput:""
        }
    }

    public findJobs = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        this.props.findJobs(this.state.searchInput, this.state.locationInput, this.state.fromInput)        
    }

    public render() {
        return (
            <div className="header">
            <form className="form" id="showJob">
                <TextField
                    required={true}
                    id="search"
                    className = "SearchBar"
                    label="Search Job Titles"
                    margin="normal"
                    onChange = { (event: any) => this.setState({searchInput:event.target.value})}
                    value = {this.state.searchInput}
                />
                <TextField
                    required={true}
                    id="location"
                    className = "SearchBar"
                    label="Location"
                    margin="normal"
                    onChange = { (event: any) => this.setState({locationInput:event.target.value})}
                    value = {this.state.locationInput}
                />
                {/*
                <TextField
                    select
                    required={true}
                    id="from"
                    className = "SearchBar"
                    label="From Seek"
                    margin="normal"
                    onChange = { (event: any) => this.setState({fromInput:event.target.value})}
                    value = {this.state.fromInput}
                />
                */}
            </form>
                <Button variant="contained" className="searchButton" style={{backgroundColor: '#00ADB4', color: 'white'}} onClick={this.findJobs}>Search</Button>


            
            </div>
            //     <Button className="button is-info" onClick={this.findJobs}> Search </Button>

        )
    }
}