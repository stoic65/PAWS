'use strict'

const req = require('request');



const Markit = () => ({
	price: (more = {'ticker': ''}, callback) => {
		const key = 'fd69a8bec4fb9cd33f7a1cf60f4871eb'
		let state = {
			method: 'GET',
			url: 'http://dev.markitondemand.com/MODApis/Api/Quote/json'
		}
		state.url += '?symbol=' + more['ticker'];
		req(state, (err, res, body) => {
			let p = new Promise((resolve, reject) => {
				resolve(JSON.parse(body));
			});
			p.then( (data) => {
				callback(null, data);
			})
			.catch( (error) => {
				callback(err, null);
			})
		})
	},
	lookup: (more= {'input':''}, callback) => {
		const key = 'fd69a8bec4fb9cd33f7a1cf60f4871eb'
		let state = {
			method: 'GET',
			url: 'http://dev.markitondemand.com/MODApis/Api/Lookup/json'
		}
		state.url += '?input=' + more['input'];
		req(state, (err, res, body) => {
			let p = new Promise((resolve, reject) => {
				resolve(JSON.parse(body));
			});
			p.then( (data) => {
				callback(null, data[0]);
			})
			.catch( (error) => {
				callback(err, null);
			})
		})
	},

	lookupNPrice: (more = {'input':''}, callback) =>{
		const key = 'fd69a8bec4fb9cd33f7a1cf60f4871eb'
		let state = {
			method: 'GET',
			url: 'http://dev.markitondemand.com/MODApis/Api/Lookup/json'
		}
		state.url += '?input=' + more['input'];
		req(state, (err, res, body) => {
			let p = new Promise((resolve, reject) => {
				resolve(JSON.parse(body));
			});
			p.then( (data) => {
				let ticker = data[0]['Symbol']
				//console.log(ticker)
				let state = {
					method: 'GET',
					url: 'http://dev.markitondemand.com/MODApis/Api/Quote/json'
				}
				state.url += '?symbol=' + ticker;
				req(state, (err, res, body) => {
					let p1 = new Promise((resolve, reject) => {
						resolve(JSON.parse(body));
					});
					p1.then( (data) => {
						callback(null, data['Data']);
					})
					.catch( (err) => {
						callback(err, null);
					})
				})
			})
			.catch( (error) => {
				callback(err, null);
			})
		})
	}

})

module.exports = Markit


Markit().lookupNPrice('Apple', (err, data) => {
	if(!err){
		console.log(data);	
	}else{
		console.log(err)
	}

});
