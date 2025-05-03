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

module.exports = {
  stateOfElement,
  validateForm,
  addOption,
};
