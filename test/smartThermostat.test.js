/**
 * @jest-environment jsdom
 */

"use strict";
jest.mock("../main.js", () => {
  const originalModule = jest.requireActual("../main.js");

  return {
    ...originalModule,
    setIndicatorPoint: jest.fn(),
    setOverlay: jest.fn(),
  };
});

const { stateOfElement, validateForm, addOption } = require("../utils.js");
const { setSelectedRoom } = require("../main.js");
const { describe } = require("yargs");

const mockRooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp: jest.fn(),
    setColdPreset: jest.fn(),
    setWarmPreset: jest.fn(),
    decreaseTemp: jest.fn(),
    increaseTemp: jest.fn(),
    toggleAircon: jest.fn(),
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

    setCurrTemp: jest.fn(),
    setColdPreset: jest.fn(),
    setWarmPreset: jest.fn(),
    decreaseTemp: jest.fn(),
    increaseTemp: jest.fn(),
    toggleAircon: jest.fn(),
  },
];
const setIndicatorPoint = jest.fn();
const setOverlay = jest.fn();

test("should save the state of element", () => {
  const setInitialState = stateOfElement(false);
  expect(setInitialState.get()).toBe(false);
  expect(setInitialState.toggle()).toBe(true);
});

describe("validate form should return an object", () => {
  test("should return a false and error message", () => {
    expect(validateForm({})).toEqual({
      isValid: false,
      message: "Room name is invalid",
    });
  });

  test("should return a true and success message", () => {
    expect(validateForm(mockRooms[0])).toEqual({
      isValid: true,
      message: "Room has been added successfully",
    });
  });
});

describe("add option to dropdown", () => {
  beforeEach(() => {
    document.body.innerHTML = `<select id="roomSelect"></select>`;
  });
  test("should add an option with correct value and text", () => {
    const roomSelect = document.getElementById("roomSelect");
    addOption(mockRooms[0]);

    const options = roomSelect.querySelectorAll("option");
    expect(options.length).toBe(1);
    expect(options[0].value).toBe("Living Room");
    expect(options[0].textContent).toBe("Living Room");
  });
});

// describe("set selected room", () => {
//   beforeEach(() => {
//     document.body.innerHTML = `
//       <div class="room-name"></div>
//       <div class="currentTemp"></div>
//       <div id="temp"></div>
//       <div class="room"></div>
//     `;

//     global.rooms = mockRooms;
//     global.currentTemp = document.getElementById("temp");

//     // Clear mock calls
//     setIndicatorPoint.mockClear();
//     setOverlay.mockClear();
//   });

//   test("should update UI with currentTemp and room-name", () => {
//     setSelectedRoom("Living Room");

//     expect(setIndicatorPoint).toHaveBeenCalledTimes(1);
//     expect(setIndicatorPoint).toHaveBeenCalledWith(32);
//     expect(setOverlay).toHaveBeenCalledTimes(1);
//     expect(setOverlay).toHaveBeenCalledWith(mockRooms[0]);
//     expect(currentTemp.textContent).toBe("32°");
//     expect(document.querySelector(".room-name").innerText).toBe("Living Room");
//     expect(document.querySelector(".currentTemp").innerText).toBe("32°");
//   });
// });

// describe("set the warm and cold preset value", () => {
//   let coolInput;
//   let warmInput;
//   let errorSpan;
//   let saveBtn;

//   beforeEach(() => {
//     global.rooms = mockRooms;
//     global.selectedRoom = mockRooms[0].name;

//     document.body.innerHTML = `
//         <input id="coolInput" type="number" />
//         <input id="warmInput" type="number"/>
//         <button id="save">Save</button>
//         <span class="error"></span>
//     `;

//     require("../main.js");

//     saveBtn = document.getElementById("save");
//     coolInput = document.getElementById("coolInput");
//     warmInput = document.getElementById("warmInput");
//     errorSpan = document.querySelector(".error");
//   });

//   test("should display error message if coolInput is invalid", () => {
//     coolInput.value = "9";
//     warmInput.value = "30";
//     saveBtn.dispatchEvent(new Event("click"));
//     saveBtn.click();
//     expect(errorSpan.innerText).toContain("Enter valid temperatures");
//   });

// test("should display error message if warm input is invalid", () => {
//   coolInput.value = 11;
//   warmInput.value = 20;
//   saveBtn.dispatchEvent(new Event("click"));
//   expect(errorSpan.innerHTML).toContain(
//     "Enter valid temperatures (10° - 32°)"
//   );
// });

// test("should call setColdPreset and setWarmPreset for valid inputs", () => {
//   coolInput.value = "20";
//   warmInput.value = "28";

//   saveBtn.dispatchEvent(new Event("click"));

//   const currRoom = rooms[0];
//   // expect(currRoom.setColdPreset).toHaveBeenCalledWith("20");
//   // expect(currRoom.setWarmPreset).toHaveBeenCalledWith("28");
//   expect(coolInput.value).toBe("");
//   expect(warmInput.value).toBe("");
// });
// });
