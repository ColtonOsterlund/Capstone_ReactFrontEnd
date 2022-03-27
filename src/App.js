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
  let package_id = 0;

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
    let conveyorID = parseInt(window.prompt('Enter Conveyor ID'));
    let boxID = parseInt(window.prompt('Enter Box ID'));

    if (conveyorID >= 1 && conveyorID <= 9 && boxID >= 1 && boxID <= 3) {
      var msg = {
        id: 2,
        conveyor_id: conveyorID,
        box_id: boxID
      };

      if (noNulls(msg)) {
        socket.send(JSON.stringify(msg));
      }
    }

    else {
      alert("Invalid entry");
      return;
    }
  }


  function addPackage(type) {
    let packageID = parseInt(package_id);
    let packageType = parseInt(type);
    let types = ["Red", "Yellow", "Green"];

    var msg = {
      id: 3,
      type: packageType,
      package_id: packageID
    };

    if (noNulls(msg)) {
      alert("Added " + types[packageType] + " Package with ID: " + packageID);
      socket.send(JSON.stringify(msg));
      package_id++;
    }
  }


  function boxStatus(boxNumber) {
    let boxID = parseInt(boxNumber);
    let msg = {
      id: 6,
      box_id: boxID
    };

    if (noNulls(msg)) {
      socket.send(JSON.stringify(msg));
    }
  }

  function removePackage(boxNum) {
    let boxID = parseInt(boxNum);
    let packageID = parseInt(window.prompt('Enter Package ID'));

    if (packageID >= 0 && packageID <= package_id) {
      var msg = {
        id: 8,
        box_id: boxID,
        package_id: packageID
      };

      if (noNulls(msg)) {
        socket.send(JSON.stringify(msg));
      }
    }

    else { alert("Package ID does not exist"); };
  }

  function clearBox(boxNum) {
    let boxID = parseInt(boxNum);

    var msg = {
      id: 10,
      box_id: boxID
    };

    if (noNulls(msg)) {
      socket.send(JSON.stringify(msg));
    }
  }

  function noNulls(clientObject) {
    for (let x in clientObject) {
      if (clientObject[x] == null) {
        alert("Null field in message");
        return false;
      }
    }

    return true;
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


              <div class="btn-group mr-4 dropup" role="group">
                <button class="btn btn-success dropdown-toggle" disabled={disable} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Package</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button" onClick={() => { addPackage(0) }}>Red</button>
                  <button class="dropdown-item" type="button" onClick={() => { addPackage(1) }}>Yellow</button>
                  <button class="dropdown-item" type="button" onClick={() => { addPackage(2) }}>Green</button>
                </div>
              </div>


              <div class="btn-group mr-4" role="group">
                <button class="btn btn-primary" disabled={disable} onClick={addBox}>
                  Add Box
                </button>
              </div>


              <div class="btn-group mr-4 dropup" role="group">
                <button class="btn btn-primary dropdown-toggle" disabled={disable} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box Status</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button" onClick={() => { boxStatus(1) }}>Box 1</button>
                  <button class="dropdown-item" type="button" onClick={() => { boxStatus(2) }}>Box 2</button>
                  <button class="dropdown-item" type="button" onClick={() => { boxStatus(3) }}>Box 3</button>
                </div>
              </div>


              <div class="btn-group mr-4 dropup" role="group">
                <button class="btn btn-primary dropdown-toggle" disabled={disable} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Remove Package</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button" onClick={() => { removePackage(1) }}>Box 1</button>
                  <button class="dropdown-item" type="button" onClick={() => { removePackage(2) }}>Box 2</button>
                  <button class="dropdown-item" type="button" onClick={() => { removePackage(3) }}>Box 3</button>
                </div>
              </div>

              <div class="btn-group mr-4 dropup" role="group">
                <button class="btn btn-warning dropdown-toggle" disabled={disable} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Clear Box</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button" onClick={() => { clearBox(1) }}>Box 1</button>
                  <button class="dropdown-item" type="button" onClick={() => { clearBox(2) }}>Box 2</button>
                  <button class="dropdown-item" type="button" onClick={() => { clearBox(3) }}>Box 3</button>
                </div>
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
