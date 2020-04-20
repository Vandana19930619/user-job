import React from 'react'
import axios from './config/axios'

class Form extends React.Component {
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            phone:"",
            jobTitle:"",
            experience:"",
            skills:"",
            list:[]
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value

        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`/users/application-form`,{
            "name": this.state.name,
            "email": this.state.email,    
            "phone": this.state.phone,
            "skills": this.state.skills,
            "jobTitle": this.state.jobTitle,
            "experience": this.state.experience           
        })
        .then((res)=>{
            console.log(res.data)
            const data = res.data
            this.setState(prevState=>({
                list:prevState.list.concat(data)
            }))
        })
        .catch((err)=>{
            console.log(err)
        })
       
        }
       
       
    render(){
       
        return(
            <div>
                <h2>Apply for Job</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange} />
                     <br/><br/>

                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <br/><br/>

                    
                    <label htmlFor="phone">Contact Number</label>
                    <input type="text" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    <br/><br/>
                    <label htmlFor="jobTitle">Apply for Job</label>
                    <select id="jobTitle" name="jobTitle" placeholder="---select---" value={this.state.jobTitle} onChange={this.handleChange} >
                        <option value="-- select--">--Select--</option>
                        <option value="Front-End Developer">Front-End Developer</option>
                        <option value="Node.js Developer">Node.js Developer</option>
                        <option value="MEAN Stack Developer">Mean Stack Developer</option>
                        <option value="FULL Stack Developer">Full Stack Developer</option>

                    </select>
                 
                    <br/><br/>
                    <label htmlFor="experience">Experience</label>
                    <input type="text" id="experience" name="experience" value={this.state.experience} onChange={this.handleChange} />
                    <br/><br/>
                    <label htmlFor="skills">Technical skills</label>
                    <textarea type="text" id="skills" name="skills" value={this.state.skills} onChange={this.handleChange} />
                    <br/><br/>
                    <input type="submit" value="send Apllication" />
                    
                </form>
            </div>
        )
    }

}

export default Form