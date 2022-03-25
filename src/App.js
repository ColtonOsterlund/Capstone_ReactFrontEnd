import React, { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {

  useEffect(() => {
    socket.addEventListener("message", data => {
      var info = JSON.parse(data.data);
      switch (info.id) {
        case 4: //Add Package response
          if (info.success) {
            alert("Target Box: " + info.box_id);
          }

          else {
            alert(info.details)
          }
          break;

        case 5: //Package Arrived 
          alert("Package (ID: " + info.package_id + ") successfully arrived at Box " + info.box_id)
          break;

        case 7: //Destination Box Status response
          alert("Box: " + info.box_id + " , holding Package type " + info.package_type);
          alert("Packages stored: " + info.packages_stored);
          alert("Packages in transit: " + info.packages_in_transit);
          break;

        case 9: //Remove Package response
          if (info.success) {
            alert("Package " + info.package_id + " from Box " + info.box_id + " removed successfully");
          }

          else {
            alert(info.details);
          }
          break;

        case 11: //Clear Box  response
          if (info.success) {
            alert("Box: " + info.box_id + " has been cleared");
            alert("Packages removed: " + info.packages_removed);
          }

          else {
            alert(info.details);
          }
          break;
      };
    });
  }, []);


  const [disable, setDisable] = React.useState(true);

  function sendState() {
    var map = {};
    map['id'] = 1
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
      id: 2,
      conveyor_id: parseInt(converyorID),
      box_id: parseInt(boxID)
    };

    socket.send(JSON.stringify(msg));
  }


  function addPackage() {
    let packageType = window.prompt('Select a package type:', 'Accepted types: 0, 1, 2');
    let packageID = window.prompt('Enter Package ID');


    var msg = {
      id: 3,
      type: parseInt(packageType),
      package_id: parseInt(packageID)
    };

    socket.send(JSON.stringify(msg));
  }


  function boxStatus() {
    let boxID = window.prompt('Enter Box ID');
    let msg = {
      id: 6,
      box_id: parseInt(boxID)
    };

    socket.send(JSON.stringify(msg));
  }

  function removePackage() {
    let boxID = window.prompt('Enter Box ID');
    let packageID = window.prompt('Enter Package ID');

    var msg = {
      id: 8,
      box_id: parseInt(boxID),
      package_id: parseInt(packageID)
    };

    socket.send(JSON.stringify(msg));
  }

  function clearBox() {
    let boxID = window.prompt('Enter Box ID');

    var msg = {
      id: 10,
      box_id: parseInt(boxID)
    };

    socket.send(JSON.stringify(msg));
  }


  function shutdownSystem() {
    socket.close();
    socket.onclose = function (event) {
      if (event.wasClean) {
        alert('System shutdown cleanly');
      } else {

        alert('Error on system shutdown');
      }
    };
    setDisable(true);
  }

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
                <button class="btn btn-success" disabled={disable} onClick={addPackage}>Add Package</button>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-primary" disabled={disable} onClick={addBox}>
                  Add Box
                </button>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-primary" disabled={disable} onClick={boxStatus}>
                  Box Status
                </button>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-warning" disabled={disable} onClick={removePackage}>
                  Remove Package
                </button>
              </div>

              <div class="btn-group mr-4" role="group">
                <button class="btn btn-warning" disabled={disable} onClick={clearBox}>
                  Clear Box
                </button>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-danger" disabled={disable} onClick={shutdownSystem}>
                  Shutdown
                </button>
              </div>
            </div >
          </div>
        </div>
      </div>
    </p >
  );
}

export default App;
