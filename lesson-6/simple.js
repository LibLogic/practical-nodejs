const eventEmitter = require('events');

class Job extends eventEmitter {}
var job = new Job();

job.on('done', function(timeDone){
    console.log('Job was pronounced done at', timeDone);
});

job.emit('done', new Date());
job.removeAllListeners();