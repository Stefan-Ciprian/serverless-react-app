import React, {Component} from 'react';
import axios from "axios";
import Chart from 'react-apexcharts';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import config from "./config.json";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            currentFileName: "",
            total_earnings: null,
            currency: null,
            series: [{
                data: []
            }],
            options: {
                chart: {
                    id: 'area-datetime',
                    type: 'area',
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy'
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
            },
        };
    }

    componentDidMount() {
        this.getFiles();
    }

    getFiles() {
        axios.get(`${config.API.url}/get_files`)
        .then(response => {
            const firstFile = response.data.files[0];

            this.setState({
                files: response.data.files,
                currentFileName: response.data.files[0]
            });

            this.getCsvData(firstFile);
        });
    }

    getCsvData(fileName) {
        axios.get(`${config.API.url}/get_csv_data/${fileName}`)
        .then(response => {
            this.setState({
                series: [{
                    data: response.data.series
                }],
                total_earnings: response.data.total_earnings,
                currency: response.data.currency
            });
        });
    }

    setCurrentFileName(fileName) {
        this.setState({
            currentFileName: fileName
        });
        this.getCsvData(fileName);
    }

    render() {
        const files = this.state.files.map((file) => {
            return (
                <li className="nav-item">
                    <button className={this.state.currentFileName === file ? "nav-link active" : "nav-link text-white"} onClick={() => this.setCurrentFileName(file)} >{file}</button>
                </li>
                )
            }
        );

        return (
            <Container>
                <Row>
                    <Col sm={4} className="main-col">
                        <div className="main">
                            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
                                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                    <span className="fs-4">Files</span>
                                </a>
                                <hr />
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        {files}
                                    </ul>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8} className="main-col">
                        <div id="chart">
                            <div id="chart-timeline">
                                <Chart options={this.state.options} series={this.state.series} type="area" height={350} />
                            </div>
                        </div>
                        { this.state.total_earnings ?
                            <div className="mt-2">
                                Total earnings: {this.state.total_earnings > 0 ? <span className="text-success">{this.state.total_earnings}</span> : <span className="text-danger">{this.state.total_earnings}</span>} {this.state.currency}
                            </div> : ""}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App;