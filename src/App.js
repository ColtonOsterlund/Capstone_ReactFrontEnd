import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import Draggable from 'react-draggable';


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
          alert("Box: " + info.box_id + " , holding Package type " + info.package_type + "\n");
          alert("Packages stored: " + info.packages_stored + "\n");
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
            alert("Box: " + info.box_id + " has been cleared\n");
            alert("Packages removed: " + info.packages_removed);
          }

          else {
            alert(info.details);
          }
          break;

        case 12: //Add Destination Box Response
          if (info.success) {
            alert("Box " + info.box_id + " successfully added, located beside " + info.conveyor_id + "\n");
          }

          else {
            alert(info.details);
          }
      };
    });
  }, []);


  const [disable, setDisable] = React.useState(true);
  let package_id = 0;
  let boxPos = [];
  let pageMap = new Array(5);
  for (var i = 0; i < pageMap.length; i++) {
    pageMap[i] = new Array(5);
  }
  pageMap[3][1] = 1; //Input conveyor


  function sendState() {
    getNeighbours();
  }

  function setNeighbours() {
    // Conveyors
    for (let num = 2; num <= 9; num++) {
      var z = document.getElementById("myConveyor" + num);
      let i = parseInt(z.name);
      let j = parseInt(z.className);
      pageMap[i][j] = parseInt(z.value);

    }

    // Boxes
    for (let num = 1; num <= 9; num++) {
      var z = document.getElementById("myBox" + num);
      let i = parseInt(z.name);
      let j = parseInt(z.className);
      let val = parseInt(z.value);

      if (val == 10 || val == 20 || val == 30) {
        pageMap[i][j] = parseInt(val);
      }
    }

  }

  function getNeighbours() {
    setNeighbours();
    var map = {};

    for (let i = 3; i > 0; i--) {
      for (let j = 1; j < 4; j++) {
        let north = pageMap[i - 1][j];
        let east = pageMap[i][j + 1];
        let south = pageMap[i + 1][j]
        let west = pageMap[i][j - 1];
        if (pageMap[i][j] >= 1 && pageMap[i][j] <= 9 && !isNaN(pageMap[i][j])) {
          if (north == null || isNaN(north)) {
            north = -1;
          }

          else if (north >= 10) {
            boxPos.push(north, pageMap[i][j], 0);
            north = -1;
          }

          if (east == null || isNaN(east)) {
            east = -1;
          }

          else if (east >= 10) {
            boxPos.push(east, pageMap[i][j], 1);
            east = -1;
          }

          if (south == null || isNaN(south)) {
            south = -1;
          }

          else if (south >= 10) {
            boxPos.push(south, pageMap[i][j], 2);
            south = -1;
          }

          if (west == null || isNaN(west)) {
            west = -1;
          }

          else if (west >= 10) {
            boxPos.push(west, pageMap[i][j], 3);
            west = -1;
          }

          map[pageMap[i][j]] = [north, east, south, west];
          // alert(pageMap[i][j] + ": " + map[pageMap[i][j]]);
        }
      }

    }

    // console.log(pageMap);
    map["id"] = 1;

    if (noNulls(map)) {
      socket.send(JSON.stringify(map));
    }

    addBox(boxPos);
  }


  function addBox(boxPositions) {
    for (let i = 0; i < boxPos.length; i += 3) {
      var msg = {
        id: 2,
        conveyor_id: parseInt(boxPositions[i + 1]),
        box_id: parseInt(boxPositions[i]),
        box_location: parseInt(boxPositions[i + 2])
      };

      if (noNulls(msg)) {
        socket.send(JSON.stringify(msg));
      }
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
            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox1" name="0" className="1">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox2" name="0" className="2">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox3" name="0" className="3">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>
          </div>

          <div class="row justify-content-center">

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox4" name="1" className="0">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>


            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <div>
                <select id="myConveyor7" name="1" className="1">
                  <option selected>No Conveyor</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <div>
                <select id="myConveyor8" name="1" className="2">
                  <option selected>No Conveyor</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <div>
                <select id="myConveyor9" name="1" className="3">
                  <option selected>No Conveyor</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox5" name="1" className="4">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>
          </div>


          <div class="row justify-content-center">
            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox6" name="2" className="0">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <select id="myConveyor4" name="2" className="1">
                <option selected>No Conveyor</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <select id="myConveyor5" name="2" className="2">
                <option selected>No Conveyor</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <select id="myConveyor6" name="2" className="3">
                <option selected>No Conveyor</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox7" name="2" className="4">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox8" name="3" className="0">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

            </div>
            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <button class="btn">1 (Input Conveyor)</button>
            </div>


            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <select id="myConveyor2" name="3" className="2">
                <option selected>No Conveyor</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./conveyor.png")} />
              </div>
              <select id="myConveyor3" name="3" className="3">
                <option selected>No Conveyor</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>

            <div class="col-md-2">
              <div class="thumbnail">
                <img src={require("./dbox.png")} />
              </div>
              <select id="myBox9" name="3" className="4">
                <option selected>Deactivated</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

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
