import React from 'react'
// import {Link} from 'react-router-dom'
import axios from './config/axios'
import moment from 'moment'


class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            candidates:[],
            jobTitle:['Front-End Developer', 'Node.js Developer', 'MEAN Stack Developer', 'FULL Stack Developer'],
            selectedJob:''
        }
    }
    componentDidMount(){
        axios.get('/users/application-forms')
        .then(response=>{
            console.log(response.data)
            const candidates=response.data
            this.setState({candidates})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    chnageTitle=(title)=>{
        this.setState({selectedJob: title})
    }
    handleView=(id)=>{
        axios.get(`/users/application-form/${id}`)
        .then(response=>{
            const candidate= response.data
            alert(`${candidate.name} - ${candidate.email} - ${candidate.phone}`)
        })
        
    }
    handleStatus=(id, status)=>{
        axios.put(`/users/application-form/update/${id}`, { status })
        .then(response=>{
            const candidate= response.data
            this.setState(prevState=>({
                candidates: prevState.candidates.map(cand=>{
                    if(cand._id=== candidate._id){
                        return {...candidate}
                    } else{ 
                        return {...cand}
                    }
                })
            }))
        })
    }
   

    render(){
        return(
            <div>
                <h2>Admin Dashboard</h2>
                {this.state.jobTitle.map(title=>{
                    return <button onClick={()=>{
                        this.chnageTitle(title)
                    }}> { title } </button>
                })}

                <h1>{this.state.selectedJob}s</h1>
                <p>List of candidates applied for {this.state.selectedJob} job</p>
                
                <table border="2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.candidates.filter(candidate=> candidate.jobTitle === this.state.selectedJob).map(candidate=>{
                                return(
                                    <tr key={candidate.id}>
                                        <td>{candidate.name}</td>
                                        <td>{candidate.skills}</td>
                                        <td>{candidate.experience}</td>
                                        <td>{moment(candidate.createdAt).format("DD/MM/YYYY")}</td>
                                        <td><button onClick={()=>{
                                            this.handleView(candidate._id)
                                        }}>View Details</button></td>
                                        <td>
                                            {candidate.status === 'applied' ? (
                                                <div>
                                             <button onClick={()=>{
                                                 this.handleStatus('Shortlisted')
                                             }}>shorlist</button>
                                             <button onClick={()=>{
                                                this.handleStatus('Rejected')
                                             }}>reject</button>
                                            </div>
                                            ) : (
                                                <button>{candidate.status}</button>
                                            )}
                                            </td>


                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>


            </div>
        )
    }
}
export default AdminDashboard