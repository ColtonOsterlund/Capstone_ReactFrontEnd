import React, { useState } from "react";
//import button from 'react-bootstrap/button';

// let typeA_capacity = 5;
// let typeB_capacity = 5;
// let typeC_capacity = 5;
// let typeD_capacity = 5;
let counter = 0;
const packageArr = new Array(20);
var dBox1 = {
  name: "Box 1",
  capacity: 5
};
var dBox2 = {
  name: "Box 2",
  capacity: 5
};
var dBox3 = {
  name: "Box 3",
  capacity: 5
};
var dBox4 = {
  name: "Box 4",
  capacity: 5
};

const destinationBoxes = [dBox1, dBox2, dBox3, dBox4];

// const packageTypeAArr = new Array(5);
// const packageTypeBArr = new Array(5);
// const packageTypeCArr = new Array(5);
// const packageTypeDArr = new Array(5);

function addPackage() {
  let packageName = window.prompt('Enter your package name:');
  let packageType = window.prompt('Enter your package type:');


  let random = Math.floor(Math.random() * destinationBoxes.length);
  destinationBoxes[random].capacity--;
  alert('Sorting into box: ' + destinationBoxes[random].name + ', capacity: ' + destinationBoxes[random].capacity)
  // if (typeA_capacity < 0 && typeB_capacity > 0 && typeC_capacity > 0 && typeD_capacity > 0) {

  var newPackage = {
    name: packageName,
    type: packageType,
    destinationBox: destinationBoxes[random]
  };

  if (newPackage.destinationBox.capacity == 0) {
    alert('Capacity limit reached on ' + newPackage.destinationBox.name);
    // Need to do something here to prevent box from being added to 
  }

  counter++;
  packageArr[counter] = newPackage;


  //   packageTypeAArr[typeA_capacity] = newPackage;
  //   typeA_capacity--;
  //   counter++;
  // }

  // else if (packageType == 'B') {
  //   packageTypeBArr[typeB_capacity] = newPackage;
  //   typeB_capacity--;
  //   counter++;
  // }

  // else if (packageType == 'C') {
  //   packageTypeCArr[typeC_capacity] = newPackage;
  //   typeC_capacity--;
  //   counter++;
  // }

  // else if (packageType == 'D') {
  //   packageTypeDArr[typeD_capacity] = newPackage;
  //   typeD_capacity--;
  //   counter++;

  // }
  //}


  // Ask C++ side for input conveyor status
}

function getPackageOne() {
  packageArr.forEach(function (elem) {
    if (elem.destinationBox.name == "Box 1") {
      alert(elem.name + ', ' + elem.type);
    }
  });
}

function getPackageTwo() {
  packageArr.forEach(function (elem) {
    if (elem.destinationBox.name == "Box 2") {
      alert(elem.name + ', ' + elem.type);
    }
  });
}


function getPackageThree() {
  packageArr.forEach(function (elem) {
    if (elem.destinationBox.name == "Box 3") {
      alert(elem.name + ', ' + elem.type);
    }
  });
}


function getPackageFour() {
  packageArr.forEach(function (elem) {
    if (elem.destinationBox.name == "Box 4") {
      alert(elem.name + ', ' + elem.type);
    }
  });
}


function boxStats() {
  // alert('Packages: \n' + counter);
  destinationBoxes.forEach(function (elem) {
    alert(elem.name + ', Capacity: ' + elem.capacity);
  });

  // alert('A: ' + (5 - typeA_capacity) + '\nB: ' + (5 - typeB_capacity)
  //   + '\nC: ' + (5 - typeC_capacity) + '\nD: ' + (5 - typeD_capacity));
}

export default function App() {
  let db1 = "Box 1";
  return (
    <p>
      <div class="btn-group">
        <div>
          <button class="btn btn-success" onClick={addPackage}>Add Package</button>
        </div>
        <div class="dropdown">
          <button class="btn btn-danger dropdown-toggle" id="ddMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Retrieve Package
          </button>
          <ul class="dropdown-menu" aria-labelledby="ddMenu">
            <button class="dropdown-item" onClick={getPackageOne}>Box 1</button>
            <button class="dropdown-item" onClick={getPackageTwo}>Box 2</button>
            <button class="dropdown-item" onClick={getPackageThree}>Box 3</button>
            <button class="dropdown-item" onClick={getPackageFour}>Box 4</button>

          </ul>
        </div>

        <div>
          <button class="btn btn-warning" onClick={boxStats}>
            Stats
          </button>
        </div>
      </div>
    </p>
  );
}
