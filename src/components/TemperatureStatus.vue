<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 status-style">
                <div v-if="documents.thirdBoxDisplayStatus">
                    <div v-if="documents.sensorIsPlugged">
                        <div class="alert alert-success">
                            <div>Current Temperature: {{temperature}} &#8451;</div>
                        </div>
                        <div v-if="graphData" class="col-sm-12">
                            <vue-plotly :data="graphData" :layout="layout" :options="options" class="graph-style" />
                        </div>
                    </div>
                    <div v-else class="alert alert-warning">
                        Unplugged Sensor
                    </div>
                </div>
                <div v-else class="alert alert-danger">
                    No Data Available
                </div>
            </div>
            <div class="col-sm-12">
                <button type="button" class="btn btn-dark third-box-button" v-on:click="updateThirdBoxDisplayStatus()">
                    <span v-if="documents.thirdBoxDisplayStatus">Press to Toggle Third Box Off</span>
                    <span v-else>Press to Toggle Third Box On</span>
                </button>
            </div>
            <div class="dividing-line col-sm-12"></div>
        </div>
        <div class="row text-message-area">
            <h4 class="col-sm-12">Enter specified text message and phone number in the event of outliar temperatures</h4>
            <div class="input-box col-sm-6">
                <input v-model="textMessage" placeholder="Enter text message here...">
            </div>
            <br>
            <div class="input-box col-sm-6">
                <vue-tel-input @onInput="onInput" type="tel"></vue-tel-input>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    import {
        database
    } from '../database.js'
    import {
        nexmo
    } from '../smsHandler.js'

    import VuePlotly from '@statnett/vue-plotly'

    export default {
        components: {
            VuePlotly,
        },

        firebase: {
            documents: database.ref('/'),
        },

        data: function () {
            return {
                documents: {},
                time: 0,
                phone: {
                    number: '',
                    isValid: false,
                    country: {}
                },

                textMessage: "",

                graphInterval: null,

                graphData: [{
                    x: [0],
                    y: [0],
                    type: "scatter"
                }],
                layout: {
                    title: "Temperature vs. Time",
                    xaxis: {
                        title: {
                            text: 'Time',
                            font: {
                                family: 'Courier New',
                                size: 18,
                            }
                        },
                        range: [0, 300]
                    },
                    yaxis: {
                        title: {
                            text: 'Temperature',
                            font: {
                                family: 'Courier New',
                                size: 18,
                            }
                        },
                        range: [10, 50]
                    },
                },
                options: {
                    scrollZoom: true,
                }
            }
        },

        computed: {
            temperature: {
                get: function () {
                    let temp = this.documents.temperature
                    return temp;
                }
            },

            thirdBoxDisplayStatus: {
                get: function () {
                    return this.documents.thirdBoxDisplayStatus
                },
                set: function (newVal) {
                    this.documents.thirdBoxDisplayStatus = newVal;
                }
            },
        },

        methods: {
            updateThirdBoxDisplayStatus: function () {
                return this.$firebaseRefs.documents.update({
                    thirdBoxDisplayStatus: (this.thirdBoxDisplayStatus = !this.thirdBoxDisplayStatus)
                });
            },

            updateGraph: function () {
                let xArray = this.graphData[0].x;
                let yArray = this.graphData[0].y;

                //300 seconds has passed, reset
                if (xArray.length > 300) {
                    this.resetGraphData();
                }

                //within bounds
                if (this.temperature >= 10 && this.temperature <= 50) {
                    xArray.push(this.time++);
                    yArray.push(this.temperature);
                } else {
                    xArray.push(this.time++);
                    yArray.push("");
                }
            },

            resetGraphData: function () {
                this.graphData[0].x.length = 0;
                this.graphData[0].y.length = 0;
                this.time = 0;
            },

            onInput({
                number,
                isValid,
                country
            }) {
                this.phone.number = number;
                this.phone.isValid = isValid;
                this.phone.country = country;

                if (!isValid) {
                    this.textMessage = "Please enter a valid phone number"
                } else {
                    this.textMessage = `Thanks for entering a valid ${this.phone.country.name} phone number`
                }
            },
        },

        created() {
            if (this.thirdBoxDisplayStatus == true)
                this.graphInterval = setInterval(() => {
                    this.updateGraph();
                }, 1000);
        },

        // destroyed() {
        //     clearInterval(this.graphInterval);
        // },

        watch: {
            thirdBoxDisplayStatus: function () {
                //clear regardless
                clearInterval(this.graphInterval);

                if (this.thirdBoxDisplayStatus == true) {
                    this.graphInterval = setInterval(() => {
                        this.updateGraph();
                    }, 1000);
                }
            },

            temperature: function () {
                if (this.temperature < 10 || this.temperature > 50) {
                    nexmo.message.sendSms(
                        '14085974815', this.phone.number.e164, this.textMessage, {
                            type: 'unicode'
                        },
                        (err, responseData) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.dir(responseData);
                            }
                        }
                    )
                }
            }
        },
    }
</script>

<style scoped>
    .temperature {
        background-color: grey;
    }

    .status-style {
        font-size: 40px;
        text-align: center;
    }

    .third-box-button {
        margin-top: 20px;
        border: 2px solid grey;
    }

    .text-message-area {
        margin: 50px 0;
        display: block;
        text-align: center !important;
        font-size: 10px;
    }

    .input-box {
        display: inline-block;
        width: 600px;
    }

    input {
        display: inline-block;
        width: 100%;
        text-align: left;
        padding-left: 10px;
    }

    .dividing-line {
        margin-top: 50px;
        border: 1px solid black;
        height: 1px;
    }
</style>