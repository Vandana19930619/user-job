import React from 'react'
import Form from './Form'
import AdminDashboard from './AdminDashboard'
import { Route, BrowserRouter} from 'react-router-dom'

function App (props){
    return(
            <BrowserRouter>
                    <div>
                    <h1>User Job application</h1>


                        <Route path="/" component={Form} exact={true}/>
                        <Route path="/admindashboard" component={AdminDashboard} />
                        
                    </div>
             </BrowserRouter>             
    )
}
export default App