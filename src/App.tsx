import React from 'react';
import './App.css';
import ArticleManagerModule from "./components/article-manager-module";
import {ACCESS_TOKEN} from "./components/type-module/constants";
import TypeModule from "./components/type-module";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <TypeModule token={localStorage.getItem(ACCESS_TOKEN) as string}/>
                </Route>
                <Route path={"/articles"}>
                    <ArticleManagerModule token={localStorage.getItem(ACCESS_TOKEN) as string}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
