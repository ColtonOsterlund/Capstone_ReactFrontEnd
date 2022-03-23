import React, { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {

  var status = 0;

  useEffect(() => {
    socket.addEventListener("message", data => {
      var info = JSON.parse(data.data);
      switch (info.id) {
        case "4": //Add Package response
          if (info.success) {
            alert("Target Box: " + info.box_id);
          }

          else {
            alert(info.details)
          }
          break;

        case "5": //Package Arrived 
          alert("Package (ID: " + info.package_id + ") successfully arrived at Box " + info.box_id)
          break;

        case "7": //Destination Box Status response
          alert("Box: " + info.box_id + " , holding Package type " + info.package_type);
          alert("Packages stored: " + info.packages_stored);
          alert("Packages in transit: " + info.packages_in_transit);
          break;
      };
    });
  }, []);



  const [disable, setDisable] = React.useState(true);
  const boxCapacity = 5;
  let packageArr = [];
  //const [packageArr, setPackageArr] = useState([{ name: "", type: "", destinationBox: "" }]);

  function sendState() {
    var map = {};
    map['id'] = "1"
    map['1'] = [4, 2, -1, -1];
    map['2'] = [5, 3, -1, 1];
    map['3'] = [6, -1, -1, 2];
    map['4'] = [7, 5, 1, -1];
    map['5'] = [8, 6, 2, 4];
    map['6'] = [9, -1, 3, 5];
    map['7'] = [-1, 8, 4, -1];
    map['8'] = [-1, 9, 5, 7];
    map['9'] = [-1, -1, 6, 8];

    socket.send(JSON.stringify(map));

  }


  function addBox() {
    let converyorID = window.prompt('Enter Conveyor ID');
    let boxID = window.prompt('Enter Box ID');

    var msg = {
      id: "2",
      conveyor_id: converyorID,
      box_id: boxID
    };

    socket.send(JSON.stringify(msg));
  }


  function addPackage() {
    let packageType = window.prompt('Select a package type:', 'Accepted types: 0, 1, 2');

    // Check if package type is supported by boxes
    var msg = {
      id: "3",
      type: packageType
    };

    socket.send(JSON.stringify(msg));
  }

  function retrieve(boxName) {
    let remNum = window.prompt("How many packages would you like to remove?");


  }

  function boxStats() {
    let boxID = window.prompt('Enter Box ID');
    let msg = {
      id: "6",
      box_id: boxID
    };

    socket.send(JSON.stringify(msg));
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
    //  status++;
    //  alert(status);
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

              <div class="btn-group mr-4" role="group">

                <button class="btn btn-danger" disabled={disable} onClick={addBox}>
                  Add Box
                </button>
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
