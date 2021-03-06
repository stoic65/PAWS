const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
var async = require('async');
const sim = require('string-similarity');


function helperFunctions(){
}

function pythonIntegrate(){
}

helperFunctions.prototype.parseTuple = (type, input, callback) => {
  try{
    var py = spawn('python3', ['./pythonFiles/main.py', type, input]);
    var str = ''
    py.stdout.on('data', (data) => {
        str += data;
        //str = str.toString();
        str = str.replace(/[()\[\]',]/g, "");
        str = str.slice(0,-1);
        str = str.split(" ");  
    });

    py.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    py.on('close', (code) => {
      callback(null, str)
    });
  }catch(err){
    callback(err, null);
  }
}


pythonIntegrate.prototype.parseStanParser = (input, callback) => {
  var helper = new helperFunctions();
  helper.parseTuple('p', input, function(err, data){
    var arr = [];
    if(err) callback(err, null);
    else{
      var t = data;
      for(var i = 0; i<t.length; i=i+5){
        var temp = t.slice(i, i+5);
        var temp2 = [];
        temp2.push(temp.slice(0,2));
        temp2.push(temp[2]);
        temp2.push(temp.slice(3,5));
        arr.push(temp2);
      }
      callback(null, arr);
    }
  })
}

pythonIntegrate.prototype.synonymParser = (input, callback) => {
  var helper = new helperFunctions();
  helper.parseTuple('s', input, function(err, data){
    if(err) callback(err, null);
    else{
      var seen = {};
      var out = [];
      var len = data.length;
      var j = 0;
      for(var i = 0; i < len; i++) {
           var item = data[i];
           if(seen[item] !== 1) {
                 seen[item] = 1;
                 out[j++] = item;
           }
      }
      callback(null, out);
    }
  })
}

pythonIntegrate.prototype.parseNV = (input, callback) => {
	try{
    var py = spawn('python3', ['./pythonFiles/main.py', 'n', input]);
    var str = '';
    py.stdout.on('data', (data) => {
      str += data;
      var out = JSON.parse(str.slice(0,-1));
    });

    py.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    py.on('close', (code) => {
      callback(null, str)
    });
  }catch(err){
    callback(err, null);
  }
}

pythonIntegrate.prototype.fuzzy = (input, callback) => {
  //  input = [' ', ['', '', '', ''] ]
  //          toMatch   matchWith
  //
  callback(null, sim.findBestMatch(input[0], input[1]))
}

exports.pythonIntegrate = pythonIntegrate;
