import React, { useState } from "react";

function App() {
  const Ysocket = new WebSocket('ws://localhost:8080');


  const [disable, setDisable] = React.useState(true);
  let counter = 0;
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

  function connect() {
    socket = new WebSocket('ws://localhost:8080');
  }

  function checkAvail(pName, pType, rand) {
    socket.send("0x01");
    socket.addEventListener("message", data => {
      let avail = new Promise(function (success, failure) {
        let status = data.data;
        if (status == "Available") {
          success();
        }

        else {
          failure();
        }
      });

      avail.then(
        function () {
          alert("Input conveyor available");
          socket.send(
            JSON.stringify({
              name: pName,
              type: pType,
              destinationBox: destinationBoxes[rand]
            }));
          alert("Package added to system");
          /** FIGURE THIS OUT
 *
 *
 * 
 * 
 * 
 * */
          socket.close();
          shutdownSystem();
          setDisable(false);
        },
        function () {
          alert("Input conveyor is busy...");
        }
      );
    });
  }

  function checkSupport(pName, pType, rand) {
    socket.send("0x03");
    socket.addEventListener("message", data => {
      let sup = new Promise(function (success, failure) {
        let types = data.data;
        if (types.includes(pType)) {
          success();
        }

        else {
          failure();
        }
      });

      sup.then(
        function () {
          alert("Package type supported");
          checkAvail(pName, pType, rand);
        },
        function () {
          alert("Package type NOT supported");
        }
      );
    });
  }



  function addPackage() {
    let packageName = window.prompt('Enter your package name:');
    let packageType = window.prompt('Enter your package type:');
    let random = Math.floor(Math.random() * destinationBoxes.length);
    // if (packageName != null && packageType != null && packageName != '' && packageType != '') {
    //alert('Sorting into ' + destinationBoxes[random].name + ', current capacity: ' + --destinationBoxes[random].capacity);
    //  }

    // Check if package type is supported by boxes

    checkSupport(packageName, packageType, random);


    var newPackage = {
      name: packageName,
      type: packageType,
      destinationBox: destinationBoxes[random]
    };

    counter++;
    packageArr.push(newPackage);


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
    socket.send("0x02");
    socket.addEventListener("message", data => {
      alert('Server sent ' + data.data);
    });

  }


  function sendState() {
    var map = {};

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

    socket.send("0x04" +
      JSON.stringify(map));

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
