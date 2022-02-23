import React, { useState } from "react";


function App() {
  const socket = new WebSocket('ws://localhost:8080');

  const [disable, setDisable] = React.useState(true);
  let counter = 0;
  const boxCapacity = 5;
  let packageArr = [];
  //const [packageArr, setPackageArr] = useState([{ name: "", type: "", destinationBox: "" }]);

  var dBox1 = {
    name: "Box 1",
    capacity: boxCapacity
  };
  let dBox1_Arr = [];

  var dBox2 = {
    name: "Box 2",
    capacity: boxCapacity
  };
  let dBox2_Arr = [];

  var dBox3 = {
    name: "Box 3",
    capacity: boxCapacity
  };
  let dBox3_Arr = [];



  const destinationBoxes = [dBox1, dBox2, dBox3];

  function baddPackage() {
    if (counter == 20) {
      alert('All destination boxes are full!');
    }

    else {
      let packageName = window.prompt('Enter your package name:');
      let packageType = window.prompt('Enter your package type:');

      // if (typeA_capacity < 0 && typeB_capacity > 0 && typeC_capacity > 0 && typeD_capacity > 0) {

      if (packageName != null && packageType != null && packageName != '' && packageType != '') {
        let random = Math.floor(Math.random() * destinationBoxes.length);
        alert('Sorting into ' + destinationBoxes[random].name + ', current capacity: ' + --destinationBoxes[random].capacity);
        //  destinationBoxes[random].capacity--;

        var newPackage = {
          name: packageName,
          type: packageType,
          destinationBox: destinationBoxes[random]
        };
      }

      // if (newPackage.destinationBox.capacity == 0) {
      //   alert('Capacity limit reached on ' + newPackage.destinationBox.name);
      //   // Need to do something here to prevent box from being added to 
      // }
    }
    counter++;
    packageArr.push(newPackage);


    // if (newPackage.destinationBox == dBox1) {
    //   dBox1_Arr.push(newPackage);
    // }

    // else if (newPackage.destinationBox == dBox2) {
    //   dBox2_Arr.push(newPackage);
    // }

    // else if (newPackage.destinationBox == dBox3) {
    //   dBox3_Arr.push(newPackage);
    // }

    // else if (newPackage.destinationBox == dBox4) {
    //   dBox4_Arr.push(newPackage);
    // }
    // Ask C++ side for input conveyor status
  }


  function checkAvail() {
    socket.send("0x01");
    socket.addEventListener("message", data => {
      let status = data.data;
      if (status.contains("Available")) {
        alert("Input conveyor available");
        return true;
      }

      else {
        alert("Input conveyor is busy...");
      }
    });
    return false;
  }

  function checkSupport(pType) {
    socket.send("0x03");
    socket.addEventListener("message", data => {
      let types = data.data;
      if (types.includes(pType)) {
        alert("Package type supported");
        return true;
      }

      else {
        alert("Package type NOT supported");
      }
    });
    return false;
  }



  function addPackage() {

    let packageName = window.prompt('Enter your package name:');
    let packageType = window.prompt('Enter your package type:');
    let random = Math.floor(Math.random() * destinationBoxes.length);
    // if (packageName != null && packageType != null && packageName != '' && packageType != '') {
    //alert('Sorting into ' + destinationBoxes[random].name + ', current capacity: ' + --destinationBoxes[random].capacity);
    //  }

    // Check if package type is supported by boxes

    if (checkSupport(packageType)) {
 /* FXN NOT MOVING PAST THIS POINT  
*
*
*
*
*/
      alert("AHH SUPPORT");
      if (checkAvail()) {
        socket.send(
          JSON.stringify({
            name: packageName,
            type: packageType,
            destinationBox: destinationBoxes[random]
          }));

        alert("Package added to system");
      }
    }

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
    for (let i = 0; i < remNum; i++) {
      alert(packageArr.pop());
    }
  }

  function boxStats() {

    socket.send("0x02");
    socket.addEventListener("message", data => {
      //  alert('Server sent ' + data.data);
    });

  }


  function sendState() {
    var map = {};

    map['1'] = [2, 4];
    map['2'] = [1, 3, 5];
    map['3'] = [2, 6];
    map['4'] = [1, 5, 7];
    map['5'] = [2, 4, 6, 8];
    map['6'] = [3, 5, 9];
    map['7'] = [4, 8];
    map['8'] = [5, 7, 9];
    map['9'] = [6, 8];

    // const socket = new WebSocket('ws://localhost:8080');

    socket.send(
      JSON.stringify({ map }));

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
        <div className="card-body">
          <button class="btn btn-success" disabled={!disable} onClick={() => setDisable(false)}>Initialize</button>
          <button class="btn btn-success" onClick={sendState}>Send State</button>

          <button class="btn btn-success" disabled={disable} onClick={addPackage}>Add Package</button>
          <button class="btn btn-warning" disabled={disable} onClick={boxStats}>
            Stats
          </button>

          {/* box 1 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 1</button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" id="Box 1" onClick={() => {
                let contents = "";

                packageArr.forEach(function (elem) {
                  if (elem.destinationBox.name == "Box 1") {
                    dBox1_Arr.push(elem);
                  }
                });
                alert(dBox1_Arr);
              }
              }> Contents
              </a>
            </div>
          </div>

          {/* box 2 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 2</button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" id="Box 2" onClick={() => {
                let contents = "";

                packageArr.forEach(function (elem) {
                  if (elem.destinationBox.name == "Box 2") {
                    contents += elem.name + ", " + elem.type + "\n";
                  }
                });
                alert(contents);
              }
              }> Contents
              </a>
            </div>
          </div>

          {/* box 3 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 3</button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" id="Box 3" onClick={() => {
                let contents = "";

                packageArr.forEach(function (elem) {
                  if (elem.destinationBox.name == "Box 3") {
                    contents += elem.name + ", " + elem.type + "\n";
                  }
                });
                alert(contents);
              }
              }> Contents
              </a>
            </div>
          </div>

          <div>
            <button class="btn btn-danger" disabled={disable} onClick={shutdownSystem}>
              Shutdown
            </button>
          </div>
        </div>
      </div>
    </p >
  );
}

export default App;
