import React from 'react'
import {HashRouter} from 'react-router-dom'
import App from './app'

export default class Root extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
        <HashRouter>
            <App/>
        </HashRouter>
        )
    }
}