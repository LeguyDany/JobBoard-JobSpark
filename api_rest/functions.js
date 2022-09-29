function getTimeNow () {
    let date = new Date();
    date.setTime(date.getTime())
    return date.toUTCString()
}

module.exports = {
    getTimeNow
}