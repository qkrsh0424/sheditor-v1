import React ,{Suspense, lazy}from 'react';
// import logo from './logo.svg';
import './App.css';
import { 
    BrowserRouter as Router,
    Route ,
    Switch, 
    // Link
} from 'react-router-dom';

//Component
// import EditorV1 from './EditorV1';
// import EditorModifyV1 from './EditorModifyV1';
import PageLoading from './PageLoading';

// import ErrorPage404 from './ErrorPage';

const EditorV1 = lazy(()=>import('./EditorV1'));
const EditorModifyV1 = lazy(()=>import('./EditorModifyV1'));
//Error Page
const ErrorPage404 = lazy(()=>import('./ErrorPage'));
function App() {
    return (
        
        <>
            <Suspense fallback={<div><PageLoading/></div>}>
                <Switch>
                    <Route exact path='/write' component={EditorV1}></Route>
                    <Route exact path='/modify' component={EditorModifyV1}></Route>
                    <Route component={ErrorPage404} />
                </Switch>
            </Suspense>
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
