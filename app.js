//import { setTimeout } from 'timers';

var SkyRemote = require('sky-remote');
var SkyQ = require('sky-q');
var express = require('express');
var url = require('url');

const app = express();
const port = 3001;

/* app.get('/', (request, response) => {
    response.send('Hello from Express!')
  }) */

app.get('/*', (request, response) => {
    console.log(request.params);
    var path = url.parse(request.url).path
    path = path.substr(path.length - (path.length - 1));
    console.log(path);
    if (path == 'status')
    {
        var box = new SkyQ({ip:'192.168.1.231'});
        box.getPowerState().then(isOn=>{
          if (isOn) {
            response.send("on")
          } else {
            response.send("standby")
          }
        }).catch(err=>{
          response.send("Unable to determine power state", err)
        })
    }
    else if (path == 'on')
    {
        var RemoteControl = new SkyRemote('192.168.1.231', 49160);
        RemoteControl.press('power');
        response.send(path);
        setTimeout(backuptimer, 6000)
    }
    else
    {
        var RemoteControl = new SkyRemote('192.168.1.231', 49160);
        RemoteControl.press(path);
        response.send(path);
    }
})

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${port}`)
  })

  function backuptimer() {
    var RemoteControl = new SkyRemote('192.168.1.231', 49160);
    RemoteControl.press('backup');
  }