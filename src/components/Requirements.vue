<template>
    <div>
        <br>
        <h2>Interface</h2>
        <ul>
        <li> If sensor-is-plugged variable set to true in firebase, display the temperature (celsius or farenheit),
            otherwise if sensor is unplugged, display "unplugged sensor" instead of temp (updated once a second)
        </li>
        <li>If 3rd box switched off, display no data available --- should both unplugged AND no data be displayed at
            the same time...?
        </li>
        <li>
            Create button to toggle boolean variable 'third-box-display-status'
            -> allowing pi to poll and then display or turn off 7-seg display (response time less than 1 second)
        </li>
        <li>
            WHILE DISPLAY (3rd box) ON, display graph of data of past 300 seconds, within 10 seconds start...
            -> graph in celcius, y axis (10 - 50), x-axis labeled in 'seconds ago from the current time (0-300 seconds),
            scaleable size w/ mouse
            . . . missing data should be clearly discernable,
        </li>
        <li>
            Text message sent to specified phone number whenever temp exceeds or fails to meet certain threshold
            -> the text message should be able to be altered, including the number sent to
        </li>
        </ul>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
ul {
    text-align: left !important;
}
</style>