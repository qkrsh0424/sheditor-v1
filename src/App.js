import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { 
    Route ,
    Switch, 
    // Link
} from 'react-router-dom';

//Component
import EditorV1 from './EditorV1';
import EditorModifyV1 from './EditorModifyV1';

//Error Page
import ErrorPage404 from './ErrorPage';

function App() {
    return (
        
        <>
            <Switch>
                <Route exact path='/write' component={EditorV1}></Route>
                <Route exact path='/modify' component={EditorModifyV1}></Route>
                <Route component={ErrorPage404} />
            </Switch>
        </>
    );
}

// const AppMain = () =>{
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p className='text-primary'>
//                     Welcome to ShEditor
//                 </p>
//                 <Link to={'/write'}>write</Link>
//             </header>
//         </div>
//     );
// }
export default App;
