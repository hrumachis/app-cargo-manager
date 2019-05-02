**<big>Cargo Manager</big>**
TypeScript based web application using react.js framework combined with redux and react dnd libraries*

**Goals:**

 - User should be able to create/edit cargo items in dock.
 - User should be able to specify area and weight for cargo item
   (edit/create).
 - User should be able to drag cargo items between dock and multiple
   ships (react-dnd library).
 - Prevent dropping cargo items if ship reached maximum capacity.
 - Calculate and display total weight and area of cargo items loaded to
   the ship.
 - Calculate and display load percentage (weight and area) of the ship.

**Project Hours**
Project started Apr 26, 2019 and finished May 1, 2019 Total hours: **~30**

 - **3 hours** - Environment setup.
 - **1 hours** - HTML layout, SCSS setup.
 - **3 hours** - Redux structure.
 - **5 hours** - Ships, Dock, ShipComponent structure, layout, style, basic
   functions setup.
 - **7 hours** - Drag&Drop  implementations.
 - **8 hours** - Connecting redux, dnd, components functionality
 - **1 hours** - Api GetInit handler.
 - **2 hours** - Drag&Drop, components handling conditions.

Project generated using `create-react-app --typescript`

**Used modules:**
   

     {
    	    node-sass,
    	    redux, @type/redux,
    	    redux-thunk,
    	    react-redux,
    	    typescript,
    	    react-dnd
        }

**Missing implementations:**
Prototype still needs api requests handler, currently only GetInitData request handled.
Missing create & add funcionality.

**Ideas for the future:**
Application has good starting structure and functionality foundation. Still there is areas to improve:
 - Selected ship max volume, weight display need location adjustments.
 - Additional drag method from selected ship to ship in list.
 - Cargo item details - can be simplified.
 - Hovered drag item container effects - can be simplified.
 - Remove multiple loading indicators and have one single. Use data placeholder in places where multiple loading indicators were used.
 
**Testing framework**
The project provides its own proprietary testing, however, is suitable for unit cause it uses react-redux library. No unit taste made because of time lack.