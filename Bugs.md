## Bug Title: The visual communication for warm and cold rooms is not properly represented

**Line No:** 158
**Type:** UI/Logic Bug  
**Identified using:** visual regression test

### Description:

Room image overlay show the grey gradient when warm and the reddish gradient when cold

### Expected Behavior:

- When the room is cold (e.g. 10°C - 24°C), the room image should display a "cool" color that is grey
- When the room is warm (e.g. 25°C - 32°C), it should display a "warm" color that is reddish.

### Actual Behavior:

The room overlay colors are switched for warm and cold.

### Steps to Reproduce:

1. Select any room from the dropdown.
2. Observe that the room overlay color does not change.

### Logs / Console Output:

_No relevant output seen in the browser console._

## Bug Title: Room not updating correctly on dropdown selection

**Line No:** 206
**Type:** UI/Logic Bug  
**Identified using:** visual regression test

### Description:

The application does not display the selected room as well as its corresponding data when a room is selected from the dropdown

### Expected Behavior:

- When a room is selected from the drop down, its the data does not show on the UI

### Actual Behavior:

The UI should display the data of the room. (image, current temperature).

### Steps to Reproduce:

1. Select a different room.
2. Room data does not update.

### Logs / Console Output:

The selected room data is fetched but the name attribute of option is assigned to the whole object

## Bug Title: Temperature increase/decrease buttons not responsive

**Line No:** 240
**Type:** Functional Bug  
**Identified using:** console.log

### Description:

The temperature does not increase / decrease when plus or minus button is clicked. Because the method of the object is assigned to a variable, the this keyword in the method is lost and does not point to the current object.

### Expected Behavior:

- The temperature should increase when the plus button is clicked
- The temperature should reduce when the minus button is clicked

### Actual Behavior:

The current temperature does not change when the plus and minus button is clicked

### Steps to Reproduce:

1. Select a room.
2. Click on the plus or minus button.
3. The current temperature does not change

### Logs / Console Output:

The selected room data is fetched, but the current temperature does not change

## Bug Title: Text description when AC is turned on does not show reasonable feedback

**Line No:** 585
**Type:** Functional Bug  
**Identified using:** console.log

### Description:


The text displays "warming room to" when the current temperature is less than 25 degrees.

### Expected Behavior:

- The text should display warming to when the current temperature is between 25°C - 32°C
- The text should display cooling to when the current temperature is between 10°C - 25°C

### Steps to Reproduce:

1. Turn on the AC in a room.
2. The text description will show warming to

### Logs / Console Output:

The current temperature of the room
current temp: 31


## Bug Title: Preset values update when values are out of range

**Line No:** 351
**Type:** Functional Bug  
**Identified using:** console.log

### Expected Behaviour:

- The preset values should only update when values are within range

### Steps to Reproduce:

1. Click on configure preset values
2. Enter temperatures that are out of range
3. Click save
4. The preset values update

### Logs / Console Output:

The room object logged onto the console shows updated values for preset values

