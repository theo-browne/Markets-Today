import { LineChart, Line, CartesianGrid, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import React from 'react'
import '../stylesheets/body.css'
const axios = require("axios")

// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, ...];



export default class Content extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            articles: []
        }
    }
    componentDidMount(){
        axios.get('https://newsapi.org/v2/everything?' +
            'q=Stocks&' +
            'language=en&' +
            'from=2019-09-28&' +
            'sortBy=popularity&' +
            'apiKey=225c5edc06b4480e857a3dfa12947e0d')
            .then(res => {
                // articles = res.data.articles
                this.setState({ articles: res.data.articles })
                // console.log(res.data.articles)
            })

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DJIA&interval=15min&outputsize=compact&apikey=50NALSTN8SFPXBLF")
            .then(res => {
                // console.log(Object.values(res.data["Time Series (15min)"]).map(point => point["1. open"]))
                // main = Object.values(res.data["Time Series (15min)"]).map(point => point["1. open"])
                this.setState({ main: Object.values(res.data["Time Series (15min)"]) })
            })
        axios.get("https://www.alphavantage.co/query?function=SECTOR&apikey=50NALSTN8SFPXBLF")
            .then(res => {
                let data = res.data["Rank B: 1 Day Performance"]
                console.log(data)
                let val = (Object.keys(data).map(point => {
                    return(
                        {"sector": point, "value": data[point] }
                    )
                }
                   ))
                this.setState({ second: val})
            })
            
        axios({
            "method": "GET",
            "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": "5ea319a809msh6364d1301f97bb4p171d5ejsn1a2627ea9286"
            }, "params": {
                "region": "US",
                "lang": "en"
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        // this.setState({ articles, main })
    }

    render(){
        if (!this.state.articles) return null
        
        return(
            <div className="main">

                <div className="news">
                    {this.state.articles.map(article => <div>
                        <li>{article.title}</li>
                        <img src={article.urlToImage} alt="" srcset=""/>
                    </div>)}
                </div>
                <div className="graphics">
                    <div className="movers">
                        <div className="mover"></div>
                        <div className="mover"></div>
                        <div className="mover"></div>
                        <div className="mover"></div>
                        <div className="mover"></div>

                    </div>
                    <div className="main-graphics">
                        <div className="main-graphics-1">
                            <LineChart width={400} height={100} c data={this.state.main}>
                                <Line type="monotone" dataKey={"1. open"} stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                            </LineChart>
                        </div>
                        <div className="main-graphics-2">
                            <BarChart
                                width={500}
                                height={300}
                                data={this.state.second}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="sector" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <ReferenceLine y={0} stroke="#000" />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}