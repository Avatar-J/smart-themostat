// const {
//   calculatePointPosition,
//   setOverlay,
//   setIndicatorPoint,
// } = require("./main.js");

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

function addOption(room) {
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomSelect.appendChild(option);
}

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

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

module.exports = {
  stateOfElement,
  validateForm,
  addOption,
  setSelectedRoom,
};
