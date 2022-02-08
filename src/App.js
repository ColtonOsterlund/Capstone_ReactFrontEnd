import React, { useState } from "react";
//import button from 'react-bootstrap/button';

// let typeA_capacity = 5;
// let typeB_capacity = 5;
// let typeC_capacity = 5;
// let typeD_capacity = 5;
function App() {

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

  var dBox4 = {
    name: "Box 4",
    capacity: boxCapacity
  };
  let dBox4_Arr = [];


  const destinationBoxes = [dBox1, dBox2, dBox3, dBox4];

  function addPackage() {
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

  function sendPackage() {
    let packageName = window.prompt('Enter your package name:');
    let packageType = window.prompt('Enter your package type:');
    let random = Math.floor(Math.random() * destinationBoxes.length);
    if (packageName != null && packageType != null && packageName != '' && packageType != '') {
      alert('Sorting into ' + destinationBoxes[random].name + ', current capacity: ' + --destinationBoxes[random].capacity);

    }
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
      socket.send(
        JSON.stringify({
          name: packageName,
          type: packageType,
          destinationBox: destinationBoxes[random]
        }));
    });

    var newPackage = {
      name: packageName,
      type: packageType,
      destinationBox: destinationBoxes[random]
    };

    counter++;
    packageArr.push(newPackage);

    socket.onclose = function (event) {
      if (event.wasClean) {
        alert('[close] Connection closed cleanly');
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }
    };

  }
  function getPackageOne() {

    let contents = "";

    packageArr.forEach(function (elem) {
      if (elem.destinationBox.name == "Box 1") {
        contents += elem.name + ", " + elem.type + "\n";
      }
    });
    alert(contents);
    return contents;

  }

  function getPackageTwo() {
    let contents = "";

    dBox2_Arr.forEach(function (elem) {
      contents += elem.name + ", " + elem.type + "\n";
    });
    alert(contents);
  }


  function getPackageThree() {
    let contents = "";

    dBox3_Arr.forEach(function (elem) {
      contents += elem.name + ", " + elem.type + "\n";
    });
    alert(contents);
  }


  function getPackageFour() {
    let contents = "";

    dBox4_Arr.forEach(function (elem) {
      contents += elem.name + ", " + elem.type + "\n";
    });
    alert(contents);
  }

  function getPackages(boxName) {
    packageArr.forEach(function (elem) {
      if (elem.destinationBox.name == boxName) {
        alert(elem.name)
      }
    });
  }


  function boxStats() {
    let boxes = "";
    destinationBoxes.forEach(function (elem) {
      boxes += elem.name + ", Capacity: " + elem.capacity + "\n";
    });

    let packz = "";
    packageArr.forEach(function (elem) {
      packz += elem.name + ", Type: " + elem.type + "\n";
    });
    alert(boxes);
    alert(packz);
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

    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
      socket.send(
        JSON.stringify({ map }));
    });
  }


  return (
    <p>
      <div className="card">
        <div className="card-header text-center">Warehouse View</div>
        <div className="card-body">
          <button class="btn btn-success" disabled={!disable} onClick={() => setDisable(false)}>Initialize</button>
          <button class="btn btn-success" onClick={sendState}>Send State</button>

          <button class="btn btn-success" disabled={disable} onClick={sendPackage}>Add Package</button>
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
                    contents += elem.name + ", " + elem.type + "\n";
                  }
                });
                alert(contents);
              }
              }> Contents
              </a>
            </div>
          </div>

          {/* box 2 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 2</button>
            <ul class="dropdown-menu">
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
            </ul>
          </div>

          {/* box 3 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 3</button>
            <ul class="dropdown-menu">
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
            </ul>
          </div>

          {/* box 4 */}
          <div class="btn-group dropdown">
            <button class="btn btn-danger dropdown-toggle" disabled={disable} id="ddMenu-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Box 4</button>
            <ul class="dropdown-menu">
              <a class="dropdown-item" href="#" id="Box 4" onClick={() => {
                let contents = "";

                packageArr.forEach(function (elem) {
                  if (elem.destinationBox.name == "Box 4") {
                    contents += elem.name + ", " + elem.type + "\n";

                  }
                });
                alert(contents);

              }
              }> Contents
              </a>
            </ul>
          </div>
        </div>

      </div>

    </p >
  );
}

export default App;
