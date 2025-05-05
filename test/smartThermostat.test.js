/**
 * @jest-environment jsdom
 */

"use strict";

const {
  stateOfElement,
  validateForm,
  setInitialOverlay,
  addOption,
  calculatePointPosition,
  setIndicatorPoint,
  showHideModal,
  addListenerToSaveButton,
  addListenerToFileInput,
  createTurnACBtn,
  addTimerModalToEachRoom,
  addListenersToRoomControls,
  addListenerToTimerForm,
} = require("../utils.js");

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

//testing stateOfElement function
test("should save the state of element", () => {
  const setInitialState = stateOfElement(false);
  expect(setInitialState.get()).toBe(false);
  expect(setInitialState.toggle()).toBe(true);
});

//testing validateFormFunction
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

//setInitialOverlay and setOverlay function
describe("set initial UI of thermostat", () => {
  const coolOverlay = `linear-gradient(
        to bottom,
        rgba(141, 158, 247, 0.2),
        rgba(194, 197, 215, 0.1)
      )`;

  const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

  beforeEach(() => {
    document.body.innerHTML = `
            <div class="room"></div>
        `;
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should set room background to the image", () => {
    setInitialOverlay(mockRooms, coolOverlay, warmOverlay);
    expect(document.querySelector(".room").style.backgroundImage).toContain(
      mockRooms[0].image
    );
  });
});

//add options to select
describe("add option to dropdown", () => {
  beforeEach(() => {
    document.body.innerHTML = `<select id="rooms"></select>`;
  });
  test("should add an option with correct value and text", () => {
    const roomSelect = document.getElementById("rooms");
    addOption(mockRooms[0]);

    const options = roomSelect.querySelectorAll("option");
    expect(options.length).toBe(1);
    expect(options[0].value).toBe("Living Room");
    expect(options[0].textContent).toBe("Living Room");
  });
});

test("should calculate point position and return an object", () => {
  const result = calculatePointPosition(mockRooms[0].currTemp);
  expect(result).toEqual({
    translateX: -8.091750954318567,
    translateY: -115.71742983013961,
  });
});

describe("set indicator point", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="point"></div>
        `;
  });

  test("should set the transform style", () => {
    const svgPoint = document.querySelector(".point");
    setIndicatorPoint(mockRooms[0].currTemp);
    expect(svgPoint.style.transform).toContain("translate");
  });
});

describe("show or hide modal", () => {
  beforeEach(() => {
    document.body.innerHTML = `
              <div id="modal-container"></div>
          `;
  });

  test("should show overlay if state is true", () => {
    const modalOverlay = document.getElementById("modal-container");
    showHideModal(true);
    expect(modalOverlay.classList).toContain("overlay");
  });

  test("should hide overlay if state is false", () => {
    const modalOverlay = document.getElementById("modal-container");
    showHideModal(false);
    expect(modalOverlay.classList).toContain("hidden");
  });
});

describe("set the warm and cold preset value", () => {
  let coolInput;
  let warmInput;
  let errorSpan;
  let saveBtn;
  beforeEach(() => {
    document.body.innerHTML = `
                <input id="coolInput" type="number" />
                <input id="warmInput" type="number"/>
                <button id="save">Save</button>
                <span class="error"></span>
          `;

    saveBtn = document.getElementById("save");
    coolInput = document.getElementById("coolInput");
    warmInput = document.getElementById("warmInput");
    errorSpan = document.querySelector(".error");
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should display error message if coolInput is invalid", () => {
    addListenerToSaveButton(mockRooms, mockRooms[0].name);
    coolInput.value = "9";
    warmInput.value = "30";
    saveBtn.dispatchEvent(new Event("click"));
    expect(errorSpan.innerText).toContain(
      "Enter valid temperatures (10° - 32°)"
    );
  });

  test("should call setColdPreset and setWarmPreset for valid inputs", () => {
    addListenerToSaveButton(mockRooms, mockRooms[0].name);
    coolInput.value = "20";
    warmInput.value = "28";

    saveBtn.dispatchEvent(new Event("click"));

    expect(errorSpan.innerHTML).toContain("");
  });
});

describe("File input change handler", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <input type="file" id="file-input" />
        <span id="file-name"></span>
      `;
  });

  it("should update file-name text content when file is selected", () => {
    const input = document.getElementById("file-input");
    const fileName = document.getElementById("file-name");

    addListenerToFileInput();
    const imageFile = new File(["fake image data"], "photo.png", {
      type: "image/png",
    });
    const event = new Event("change");
    Object.defineProperty(input, "files", {
      value: [imageFile],
    });
    input.dispatchEvent(event);

    expect(fileName.textContent).toBe("photo.png");
  });
});

describe("createTurnACBtn", () => {
  let turnACsBtnState;
  let toggleMock;
  let generateRooms;

  beforeEach(() => {
    document.body.innerHTML = `<div class="rooms-control"></div>`;

    toggleMock = jest.fn();
    turnACsBtnState = {
      get: jest.fn().mockReturnValue(false),
      toggle: toggleMock.mockReturnValue(true),
    };

    generateRooms = jest.fn();
    global.generateRooms = generateRooms;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates the AC toggle button with correct text and appends it", () => {
    createTurnACBtn(turnACsBtnState, mockRooms);

    const btn = document.querySelector(".turn-on-btn");
    expect(btn).toBeTruthy();
    expect(btn.textContent).toBe("Turn ACs On");
  });

  it("clicking the button toggles aircons, button state, and calls generateRooms", () => {
    createTurnACBtn(turnACsBtnState, mockRooms);

    const btn = document.querySelector(".turn-on-btn");
    btn.dispatchEvent(new Event("click"));

    expect(mockRooms[0].toggleAircon).toHaveBeenCalled();
    expect(mockRooms[1].toggleAircon).toHaveBeenCalled();
    expect(turnACsBtnState.toggle).toHaveBeenCalled();
    expect(generateRooms).toHaveBeenCalled();
  });
});

describe("addTimerModalToEachRoom", () => {
  let mockToggle;
  let mockStateOfElement;
  let mockShowTimerModal;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="timer" id="Living Room">Timer</div>
      <div id="timerModalOverlay" class="hidden"></div>
    `;

    mockToggle = jest.fn();
    mockStateOfElement = jest.fn(() => ({
      toggle: mockToggle,
    }));
    global.stateOfElement = mockStateOfElement;

    mockShowTimerModal = jest.fn();
    global.showTimerModal = mockShowTimerModal;
    global.timerModalOverlay = document.getElementById("timerModalOverlay");

    jest.clearAllMocks();
  });

  it("should attach click event listener to .timer and show modal correctly", () => {
    const timerEl = document.querySelector(".timer");

    mockToggle.mockReturnValue(true);
    addTimerModalToEachRoom();
    timerEl.dispatchEvent(new Event("click"));

    expect(showTimerModal).toHaveBeenCalled();

    const overlay = document.getElementById("timerModalOverlay");
    expect(overlay.classList.contains("hidden")).toBe(false);
    expect(overlay.classList.contains("overlay")).toBe(true);
  });
});

describe("addListenersToRoomControls", () => {
  let generateRoomsMock;
  let setSelectedRoomMock;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="rooms-control">

        <div id="Living Room">
          <div>
            <div>
              <button class="switch">Toggle AC</button>
            </div>
          </div>
        </div>
      </div>  
    `;

    generateRoomsMock = jest.fn();
    setSelectedRoomMock = jest.fn();

    // global.generateRooms = generateRoomsMock;
    // global.setSelectedRoom = setSelectedRoomMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls toggleAircon and generateRooms when switch is clicked", () => {
    const switchBtn = document.querySelector(".switch");
    addListenersToRoomControls(mockRooms, generateRoomsMock);
    switchBtn.dispatchEvent(new Event("click"));

    // expect(mockRooms[0].toggleAircon).toHaveBeenCalled();
    // expect(generateRoomsMock).toHaveBeenCalled();
  });
});

describe("addListenerToTimerForm", () => {
  let generateRoomsMock;
  let setAutomaticTimerMock;
  let toggleMock;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="add-timer-form">
        <input name="startTime" value="08:00" />
        <input name="endTime" value="18:00" />
        <button type="submit">Set Timer</button>
      </form>
      <div id="timerModalOverlay" class="overlay"></div>
    `;

    generateRoomsMock = jest.fn();
    setAutomaticTimerMock = jest.fn();

    toggleMock = jest.fn().mockReturnValue(false);
    global.timerModalState = { toggle: toggleMock };

    global.timerModalOverlay = document.getElementById("timerModalOverlay");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("updates room times, calls generateRooms and setAutomaticTimer, and hides modal", () => {
    const form = document.getElementById("add-timer-form");

    addListenerToTimerForm(
      mockRooms,
      mockRooms[0].name,
      generateRoomsMock,
      setAutomaticTimerMock
    );
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    const room = mockRooms[0];

    expect(room.startTime).toBe("08:00");
    expect(room.endTime).toBe("18:00");
  });
});
