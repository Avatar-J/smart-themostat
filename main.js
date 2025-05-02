// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setStartTime(time) {
      this.startTime = time;
    },

    setEndTime(time) {
      this.endTime = time;
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setStartTime(time) {
      this.startTime = time;
    },

    setEndTime(time) {
      this.endTime = time;
    },
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setStartTime(time) {
      this.startTime = time;
    },

    setEndTime(time) {
      this.endTime = time;
    },
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setStartTime(time) {
      this.startTime = time;
    },

    setEndTime(time) {
      this.endTime = time;
    },
  },
];

const coolOverlay = `linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
function addOption(room) {
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomSelect.appendChild(option);
}
rooms.forEach((room) => {
  addOption(room);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  console.log(room);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});

// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  if (e.target.id === "cool") {
    room.setCurrTemp(room.coldPreset);
    setSelectedRoom(selectedRoom);
  } else {
    room.setCurrTemp(room.warmPreset);
    setSelectedRoom(selectedRoom);
  }
});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // const increaseRoomTemperature = room.increaseTemp;

  if (room.currTemp < 32) {
    room.increaseTemp();
  }
  console.log("updated current temp", room.currTemp);
  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // const decreaseRoomTemperature = room.decreaseTemp;

  if (room.currTemp > 10) {
    room.decreaseTemp();
  }
  console.log("updated current temp", room.currTemp);
  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");

const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  if (coolInput.value && warmInput.value) {
    // Validate the data
    if (coolInput.value < 10 || coolInput.value > 25) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    }
    // Validation passed
    // Set current room's presets

    const currRoom = rooms.find((room) => room.name === selectedRoom);

    if (coolInput.value >= 10 && coolInput.value < 25) {
      errorSpan.style.display = "none";
      currRoom.setColdPreset(coolInput.value);
    }

    if (warmInput.value >= 25 && warmInput.value <= 32) {
      errorSpan.style.display = "none";
      currRoom.setWarmPreset(warmInput.value);
    }
    coolInput.value = "";
    warmInput.value = "";
  }
});

//add rooms -- edited and added by me

//set span of custom file upload to the name of file
const inputFile = document.getElementById("file-input");
let fileName = document.getElementById("file-name");
inputFile.addEventListener("change", (e) => {
  fileName.textContent = e.target.files[0].name;
});

//to manage state of modal and turn all AC button
function stateOfElement(initialState = false) {
  let state = initialState;
  return {
    toggle: function () {
      state = !state;
      return state;
    },
    get: function () {
      return state;
    },
  };
}
//set initial state of modal
const modalState = stateOfElement(false);
const modalOverlay = document.getElementById("modal-container");

//show modal when add room btn is clicked
document.getElementById("show_modal").addEventListener("click", () => {
  const isModalVisible = modalState.toggle();

  if (isModalVisible) {
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("overlay");
  }
});

//close modal when close button is clicked
document.getElementById("close-modal").addEventListener("click", () => {
  const isModalVisible = modalState.toggle();
  if (!isModalVisible) {
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("overlay");
  }
});

//close modal when overlay is clicked
modalOverlay.addEventListener("click", () => {
  const isModalVisible = modalState.toggle();
  if (!isModalVisible) {
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("overlay");
  }
});

document.getElementById("modal").addEventListener("click", (e) => {
  e.stopPropagation();
});

//validates form
function validateForm(newRoomFormData) {
  if (!newRoomFormData.name) {
    return { isValid: false, message: "Room name is invalid" };
  }
  if (!newRoomFormData.image) {
    return { isValid: false, message: "Please upload an image" };
  }
  if (!newRoomFormData.currTemp) {
    return { isValid: false, message: "Please set the current temperature" };
  } else if (newRoomFormData.currTemp < 10 || newRoomFormData.currRoom > 32) {
    return {
      isValid: false,
      message: "Temperature range should be between (10° - 32°) inclusive",
    };
  }
  if (!newRoomFormData.coldPreset) {
    return { isValid: false, message: "Please set a coldPreset value" };
  }
  if (!newRoomFormData.warmPreset) {
    return { isValid: false, message: "Please set a warmPreset value" };
  }

  return { isValid: true, message: "Room has been added successfully" };
}

//adds new room to array and dropdown
document.getElementById("add-room-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const newRoom = {
    name: form.name.value.trim(),
    currTemp: parseFloat(form.currTemp.value),
    coldPreset: parseFloat(form.coldPreset.value),
    warmPreset: parseFloat(form.warmPreset.value),
    // image: form.image.files[0] || "./assets/living-room.jpg",
    image: form.image.files[0]
      ? URL.createObjectURL(form.image.files[0])
      : "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",
    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setStartTime(time) {
      this.startTime = time;
    },

    setEndTime(time) {
      this.endTime = time;
    },
  };

  const { isValid, message } = validateForm(newRoom);
  if (isValid) {
    rooms.push(newRoom);
    document.getElementById("add-room-btn").textContent = "Submitted";
    document.getElementById("error-message").style.color = "green";
    addOption(newRoom);
    generateRooms();
  }
  document.getElementById("error-message").textContent = message;
});

// Rooms Control

//set state of all ACs
const turnACsBtnState = stateOfElement();

// Generate rooms

const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    console.log("current temp:", room.currTemp);

    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>

            <div class="ac-control">

              <button id="${room.name}" class="timer">
                <ion-icon name="alarm"></ion-icon>
              </button>
              
              <button class="switch">
                <ion-icon name="power-outline" class="${
                  room.airConditionerOn ? "powerOn" : ""
                }"></ion-icon>
              </button>
            
            </div>
            
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp < 25 ? "Cooling room to: " : "Warming room to: "}${
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;

  //turn all ACs on
  if (roomsControlContainer) {
    let areACsOn = turnACsBtnState.get();
    const turnACsOn = document.createElement("div");
    const OnBtn = document.createElement("button");
    OnBtn.textContent = `Turn ACs ${areACsOn ? "off" : "On"}`;
    OnBtn.classList.add("turn-on-btn");
    turnACsOn.classList.add("btn-section");

    turnACsOn.appendChild(OnBtn);
    document.querySelector(".rooms-control").appendChild(turnACsOn);

    //turn on all AC buttons
    OnBtn.addEventListener("click", () => {
      rooms.forEach((room) => {
        room.toggleAircon();
      });
      areACsOn = turnACsBtnState.toggle();
      generateRooms();
    });

    //add modal to all rooms
    document.querySelectorAll(".timer").forEach((el) => {
      const timerModal = stateOfElement();
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        let roomName;
        if (e.target.classList.contains("timer")) {
          roomName = e.target.id;
        } else {
          roomName = e.target.parentNode.id;
        }
        showTimerModal(timerModal, roomName);
        const isModalVisible = timerModal.toggle();
        if (isModalVisible) {
          timerModalOverlay.classList.remove("hidden");
          timerModalOverlay.classList.add("overlay");
        }
      });
    });
  }
};
const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `;
};

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});

//for timer of AC
//set state of timer modal

const timerModalOverlay = document.createElement("div");

function showTimerModal(timerModal, roomName) {
  console.log(roomName);
  timerModalOverlay.classList.add("hidden");

  const modalHTML = `
  <div id="timer-modal">
          <div class="modal-header">
            <h1 class="add-room-title">Set start and stop time</h1>
            <button id="close-timer-modal"><ion-icon name="close"></ion-icon></button>

          </div>
          <form id="add-timer-form" action="" method="post">
              <div>
                <label for="start-time">Start time</label>
                <input id="start-time" type="time" name="startTime" />
              </div>

              <div>
                <label for="end-time">End time</label>
                <input id="end-time" type="time" name="endTime" />
              </div>

              <button id="add-timer-btn" type="submit">Set timer</button>
          </form>
  </div>
  `;

  timerModalOverlay.innerHTML = modalHTML;

  document.querySelector(".rooms-control").appendChild(timerModalOverlay);

  //add event to close timer modal
  document.getElementById("close-timer-modal").addEventListener("click", () => {
    const isModalVisible = timerModal.toggle();
    if (!isModalVisible) {
      timerModalOverlay.classList.add("hidden");
      timerModalOverlay.classList.remove("overlay");
    }
  });

  //set timer

  document.getElementById("add-timer-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const room = rooms.find((room) => room.name === roomName);
    console.log(room);
    const form = e.target;

    console.log(form.startTime.value, form.endTime.value);

    if (form.startTime.value) {
      room.startTime = form.startTime.value;
    }
    if (form.endTime.value) {
      room.endTime = form.endTime.value;
    }
    generateRooms();
    setAutomaticTimer();
    const isModalVisible = timerModal.toggle();
    if (!isModalVisible) {
      timerModalOverlay.classList.add("hidden");
      timerModalOverlay.classList.remove("overlay");
    }
  });
}

function setRoomTimer(startTime, endTime, room) {
  //create new date object
  const now = new Date();

  //convert time into hours and min
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  // Create Date objects for today
  const startDate = new Date(now);
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date(now);
  endDate.setHours(endHour, endMin, 0, 0);

  //schedule for tomorrow, if it crosses
  if (startDate < now) startDate.setDate(startDate.getDate() + 1);
  if (endDate < now || endDate < startDate)
    endDate.setDate(endDate.getDate() + 1);

  const secondsStart = startDate - now;
  const secondsEnd = endDate - now;

  setTimeout(() => {
    room.toggleAircon();
    generateRooms();
    setTimeout(() => {
      console.log("turn ac off");
      room.toggleAircon();
      generateRooms();
    }, secondsEnd - secondsStart);
  }, secondsStart);
}

function setAutomaticTimer() {
  rooms.forEach((room) => {
    setRoomTimer(room.startTime, room.endTime, room);
  });
}
setAutomaticTimer();
