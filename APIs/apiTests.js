let prettyjson = require('prettyjson')
let Weather = require('./OpenWeatherWrapper.js')
let Wiki = require('./WikiWrapper.js')


let mainWrapper = require('./MainWrapper.js')
Weather('fd69a8bec4fb9cd33f7a1cf60f4871eb').forecast('28.612205','77.034980',(data)=>{
	console.log("inside")
	console.log(prettyjson.render(data))
})

<<<<<<< HEAD
Wiki().getSummary('water',(err,data)=>{
	console.log(prettyjson.render(data))
=======
Wiki().getURL('Mahatma Gandhi',(err,data)=>{
	console.log(data)
>>>>>>> 5031a7179b19d227e0411fd6e58ef393c9241647
})
*/

mainWrapper["weather"]["current"]({lat : '28.612205', lon : '77.034980'},(err,data)=>{
	console.log(data)
})
<<<<<<< HEAD

mainWrapper["wiki"]["defination"]("water",(err,data)=>{
	console.log(data)
})
=======
>>>>>>> 5031a7179b19d227e0411fd6e58ef393c9241647
