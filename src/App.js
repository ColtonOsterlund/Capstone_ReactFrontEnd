import React, { useState, useEffect } from "react";

function App() {

  var socket;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener("message", data => {  
      var info = JSON.parse(data);
      switch (info.id) {
        case "4":
          alert(info.details);
          if(info.success)
          {
            alert("Package successfully added to system");
          }
          break;
  
        case "5":
          break;
  
        case "6":
          break
      };
    });
  
  })

  

  const [disable, setDisable] = React.useState(true);
  const boxCapacity = 5;
  let packageArr = [];
  //const [packageArr, setPackageArr] = useState([{ name: "", type: "", destinationBox: "" }]);

  var dBox1 = {
    name: "Box 1",
    capacity: boxCapacity
  };
  let dBox1_Arr = ['Apples', 'Oranges', 'A', 'B', 'C', 'D'];

  var dBox2 = {
    name: "Box 2",
    capacity: boxCapacity
  };
  let dBox2_Arr = ['Chocolate', 'Candy'];

  var dBox3 = {
    name: "Box 3",
    capacity: boxCapacity
  };
  let dBox3_Arr = ['Bread', 'Eggs'];



  const destinationBoxes = [dBox1, dBox2, dBox3];


  function addPackage() {
    let packageType = window.prompt('Select a package type:', '0, 1, 2');


    // Check if package type is supported by boxes


    var msg = {
      id: "1",
      type: packageType
    };

    socket.send(JSON.stringify(msg));

    packageArr.push(msg);
  }

  

  function retrieve(boxName) {
    let remNum = window.prompt("How many packages would you like to remove?");
    switch (boxName) {
      case "Box 1":
        for (let i = 0; i < remNum; i++) {
          alert("Removing " + dBox1_Arr.pop());
        }
        break;

      case "Box 2":
        for (let i = 0; i < remNum; i++) {
          alert("Removing " + dBox2_Arr.pop());
        }
        break;

      case "Box 3":
        for (let i = 0; i < remNum; i++) {
          alert("Removing " + dBox3_Arr.pop());
        }
        break;
    }

  }

  function boxStats() {
    let msg = {
      id: "2"
    }
    socket.send(JSON.stringify(msg));
    socket.addEventListener("message", data => {
      alert('Server sent ' + data.data);
    });

  }


  function sendState() {
    var map = {};
    map['id'] = 0x01
    map['1'] = [4, 2, -1, -1];
    map['2'] = [5, 3, -1, 1];
    map['3'] = [6, -1, -1, 2];
    map['4'] = [7, 5, 1, -1];
    map['5'] = [8, 6, 2, 4];
    map['6'] = [9, -1, 3, 5];
    map['7'] = [-1, 8, 4, -1];
    map['8'] = [-1, 9, 5, 7];
    map['9'] = [-1, -1, 6, 8];

    // const socket = new WebSocket('ws://localhost:8080');

    socket.send(JSON.stringify(map));

    //  socket.close()

  }

  function shutdownSystem() {
    socket.close();
    socket.onclose = function (event) {
      if (event.wasClean) {
        alert('[close] Connection closed cleanly');
      } else {

        alert('[close] Connection died');
      }
    };

    setDisable(true);
  }
  // Boxes assigned a type

  return (
    <p>

      <div className="card">
        <div className="card-header text-center">Warehouse View</div>
        <div className="card-body text-center">

          <div class="row justify-content-center">
            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./dbox.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./dbox.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./dbox.jpg")} />
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>

            <div class="col-md-3">
              <div class="thumbnail">
                <img src={require("./conveyor.jpg")} />
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="btn-toolbar">
              <div class="btn-group mr-4" role="group">
                <button class="btn btn-success" disabled={!disable} onClick={() => setDisable(false)}>Initialize</button>
              </div>
              <div class="btn-group mr-4" role="group">
                <button class="btn btn-success" onClick={sendState}>Send State</button>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-success" disabled={disable} onClick={addPackage}>Add Package</button>            </div>

              <div class="btn-group mr-4" role="group">
                <button class="btn btn-warning" disabled={disable} onClick={boxStats}>
                  Stats
                </button>
              </div>

              {/* box 1 */}
              <div class="btn-group dropdown">
                <div class="btn-group mr-4" role="group">
                  <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 1</button>
                </div>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="/#" id="Box 1" onClick={() => {
                    let contents = "";

                    dBox1_Arr.forEach(function (elem) {
                      contents += elem + "\n";
                    });

                    alert(contents);

                  }
                  }> Contents
                  </a>
                  <a class="dropdown-item" href="/#" id="Box 1" onClick={() => {
                    retrieve("Box 1");
                  }
                  }> Retrieve
                  </a>
                </div>
              </div>

              {/* box 2 */}
              <div class="btn-group dropdown">
                <div class="btn-group mr-4" role="group">
                  <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 2</button>
                </div>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="/#" id="Box 2" onClick={() => {
                    let contents = "";

                    dBox2_Arr.forEach(function (elem) {
                      contents += elem + "\n";
                    });

                    alert(contents);

                  }
                  }> Contents
                  </a>
                  <a class="dropdown-item" href="/#" id="Box 2" onClick={() => {
                    retrieve("Box 2");
                  }
                  }> Retrieve
                  </a>
                </div>
              </div>

              {/* box 3 */}
              <div class="btn-group dropdown">
                <div class="btn-group mr-4" role="group">
                  <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 3</button>
                </div>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="/#" id="Box 3" onClick={() => {
                    let contents = "";

                    dBox3_Arr.forEach(function (elem) {
                      contents += elem + "\n";
                    });

                    alert(contents);

                  }
                  }> Contents
                  </a>
                  <a class="dropdown-item" href="/#" id="Box 3" onClick={() => {
                    retrieve("Box 3");
                  }
                  }> Retrieve
                  </a>
                </div>
              </div>

              <div class="btn-group mr-4" role="group">

                <button class="btn btn-danger" disabled={disable} onClick={shutdownSystem}>
                  Shutdown
                </button>
              </div>
            </div>
          </div >
        </div>
      </div>
    </p >
  );
}

export default App;
