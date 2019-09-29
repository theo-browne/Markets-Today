import React from 'react'
import '../stylesheets/nav.css'

export default class Nav extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
    return(
        <header className="main-nav">
            <h1>Markets Today</h1>
            <nav className="sections">
                <ul>
                    <li>Equities</li>
                    <li>Bonds & Rates</li>
                    <li>Forex</li>
                    <li>Crypto</li>
                </ul>
            </nav>
        </header>
    )
}
}
