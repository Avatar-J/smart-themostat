const setInitialOverlay = (rooms, coolOverlay, warmOverlay) => {
  if (document.querySelector(".room")) {
    document.querySelector(
      ".room"
    ).style.backgroundImage = `url('${rooms[0].image}')`;

    document.querySelector(".room").style.backgroundImage = `${
      rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
    }, url('${rooms[0].image}')`;
  }
};

const setOverlay = (room, coolOverlay, warmOverlay) => {
  if (document.querySelector(".room")) {
    const overlay = room.currTemp < 25 ? coolOverlay : warmOverlay;
    document.querySelector(
      ".room"
    ).style.backgroundImage = `${overlay}, url('${room.image}')`;
  }
};

function addOption(room) {
  const roomSelect = document.getElementById("rooms");
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;

  if (roomSelect) {
    roomSelect.appendChild(option);
  }
}

const calculatePointPosition = (currTemp) => {
  const angleOffset = 86;
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const svgPoint = document.querySelector(".point");
  const position = calculatePointPosition(currTemp);
  if (svgPoint) {
    svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
  }
};

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

function showHideModal(isModalVisible) {
  const modalOverlay = document.getElementById("modal-container");
  if (modalOverlay) {
    if (isModalVisible) {
      modalOverlay.classList.remove("hidden");
      modalOverlay.classList.add("overlay");
    } else {
      modalOverlay.classList.add("hidden");
      modalOverlay.classList.remove("overlay");
    }
  }
}

function addListenerToSaveButton(rooms, selectedRoom) {
  document.getElementById("save")?.addEventListener("click", () => {
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

      if (Number(coolInput.value) >= 10 && Number(warmInput.value) < 25) {
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
}

function addListenerToFileInput() {
  const inputFile = document.getElementById("file-input");
  let fileName = document.getElementById("file-name");
  inputFile?.addEventListener("change", (e) => {
    fileName.textContent = e.target.files[0].name;
  });
}
function createTurnACBtn(turnACsBtnState, rooms) {
  let areACsOn = turnACsBtnState.get();
  //create the button
  const turnACsOn = document.createElement("div");
  const OnBtn = document.createElement("button");
  OnBtn.textContent = `Turn ACs ${areACsOn ? "off" : "On"}`;
  OnBtn.classList.add("turn-on-btn");
  turnACsOn.classList.add("btn-section");

  turnACsOn.appendChild(OnBtn);
  document.querySelector(".rooms-control").appendChild(turnACsOn);

  //add event listener to ACs button
  OnBtn.addEventListener("click", () => {
    rooms.forEach((room) => {
      room.toggleAircon();
    });
    areACsOn = turnACsBtnState.toggle();
    generateRooms();
  });
}

function addTimerModalToEachRoom() {
  document.querySelectorAll(".timer").forEach((el) => {
    const timerModalState = stateOfElement();

    el.addEventListener("click", (e) => {
      e.stopPropagation();

      let roomName;
      if (e.target.classList.contains("timer")) {
        roomName = e.target.id;
      } else {
        roomName = e.target.parentNode.id;
      }
      showTimerModal(timerModalState, roomName);

      const isModalVisible = timerModalState.toggle();
      if (isModalVisible) {
        timerModalOverlay.classList.remove("hidden");
        timerModalOverlay.classList.add("overlay");
      }
    });
  });
}

function addListenersToRoomControls(rooms, generateRooms) {
  document.querySelector(".rooms-control")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("switch")) {
      const room = rooms.find(
        (room) => room.name === e.target.parentNode.parentNode.parentNode.id
      );
      room.toggleAircon();
      generateRooms();
    }

    if (e.target.classList.contains("room-name")) {
      setSelectedRoom(e.target.parentNode.parentNode.id, rooms);
    }
  });
}

function addListenerToTimerForm(
  rooms,
  roomName,
  generateRooms,
  setAutomaticTimer
) {
  document.getElementById("add-timer-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const timerModalOverlay = document.getElementById("timerModalOverlay");

    const room = rooms.find((room) => room.name === roomName);
    const form = e.target;
    const startTimeInput = form.querySelector('[name="startTime"]');
    const endTimeInput = form.querySelector('[name="endTime"]');
    room.startTime = startTimeInput.value;
    room.endTime = endTimeInput.value;

    generateRooms();
    setAutomaticTimer();
    const isModalVisible = timerModalState.toggle();
    if (!isModalVisible) {
      timerModalOverlay.classList.add("hidden");
      timerModalOverlay.classList.remove("overlay");
    }
  });
}

module.exports = {
  setInitialOverlay,
  setOverlay,
  stateOfElement,
  validateForm,
  addOption,
  setIndicatorPoint,
  showHideModal,
  calculatePointPosition,
  addListenerToSaveButton,
  addListenerToFileInput,
  createTurnACBtn,
  addTimerModalToEachRoom,
  addListenersToRoomControls,
  addListenerToTimerForm,
};
