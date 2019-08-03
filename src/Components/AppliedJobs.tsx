// import * as React from 'react';

// interface IState {
//     input: string,
//     result: any,
//     body:any,
// }

// interface IProps {
//     currentVideo:any,
//     play: any
// }

// export default class AppliedJobs extends React.Component<IProps, IState>{
//         public constructor(props: any) {
//         super(props);
//         this.state = {
//             body: [],
//             input: "",
//             result: [],
//         }
//     }
        

//     public search = () => {
//         fetch("https://scriberapi.azurewebsites.net/api/Videos/SearchByTranscriptions/"+this.state.input, {
//             headers: {
//                 Accept: "text/plain"
//             },
//             method:"GET"
//         }).then(response => {
//             return response.json()
//         }).then(answer => {
//             this.setState({result:answer},()=>this.makeTableBody())
//         })
//     }

    
//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// }

