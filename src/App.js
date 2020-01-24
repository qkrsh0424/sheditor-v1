import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { 
    Route ,
    Switch, 
    // Link
} from 'react-router-dom';

//Component
import Editor from './Editor';
import CKEditor from './CKEditor';


function App() {
    return (
        
        <>
            <Switch>
                <Route exact path='/' component={Editor}></Route>
                <Route exact path='/write' component={CKEditor}></Route>
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
