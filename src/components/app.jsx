import React from 'react'
import Nav from './nav'
import Content from './content'

export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Nav />
                <Content />
            </div>
        )
    }
}