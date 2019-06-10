function code() {
  ////////////////////////////////////////////////////////////////// Setup & Variables////////////////////////////////////////////////////////////////////////////////////////////

  myStage = stage.children[0]; // Allows stage.children[0] to be refered to as myStage.

  var inputOne = 0; // Variable to save first input number from screen when an Operator is pressed.
  var inputTwo = 0; // Variable to save second input number
  var outputEquals = 0; // Variable to store the answer after equals is pressed.
  var equalsBeenClicked; // Variable to hold via a boolean if equals has been clicked or not. Used to control the Clear button, which doesn't clear once the sum has been calculated. Fun calculator quirk.
  var inputOneSelected = false; // sets the inputOneSelected variable to boolean false, used to allow functions to know if inputOne has been used.
  var inputTwoSelected = false; // sets the inputTwoSelected variable to boolean false, used to allow functions to know if inputTwo has been used.
  var inputTwoSelectedSpecial = false; // variable used to distinguish that inputTwo is now being used for the square route function.
  var memoryPlusUsed = false; // Sets the memoryPlusUsed varaible to boolean false, used to determine if a memory function has been used.
  var myMemorySum = 0; // varaible to work out any changes to the memory total
  var myMemoryValue = 0; // variable to store the memory total ready for any recall
  var max_chars = 8; // new varaible controlling how many characters we want on screen. 8 is default screen display length, but this is edited to 9 or 10 depending on if '-' or '.' is used.
  var displayInput; // variable holding the displayScreen_txt.text value
  var displayInputLength; // variable holding the length of displayScreen_txt.text
  var displayOutput; // variable holding the display output total before it is calculated and passed back to the displayInputOne varaible.
  var displayOutputLength; // variable holding the length of displayScreenOutput_txt.text
  var plusMinusSelector = false; // Variable required for the plusMinus funtion to work correctly. Used to indicate if the button has been pressed.
  var konstConstantFigure = parseFloat(inputOne); // constant figure used in the 'k' calculation to keep hold of the input incrementaion. This changes to inputOne or inputTwo when the input is created
  var operatorSelected = false; // varaible to state if an operator has been selected or not
  operatorSymbols(0, 0, 0, 0, 0); // Sets all operator symbols to invisible
  // The following code sets the special screen characters to be hidden by default until required
  myStage.errorSymbol_txt.alpha = 0;
  myStage.karrySymbol_txt.alpha = 0;
  myStage.decimalPoint_txt.alpha = 0;
  myStage.memorySymbol_txt.alpha = 0;
  myStage.errorMemorySymbol_txt.alpha = 0;

  ////////////////////////////////////////////////////////////////////// Button Values /////////////////////////////////////////////////////////////////////////////

  for (i = 0; i <= 9; i++) {
    // For loop used to setup values of button numbers 0 - 9. The Operator values are set manually
    // i = 0, if i is equal to or less than 9, add 1 to i. This means the loop triggers 10 times, 0 - 9.
    myStage["button" + i + "_btn"].value = i; // code used to make myStage.button'X'_btn the value of i. So is i = 1, button = 1.
  }

  // Assigns values to operator buttons so that the value can be used to determine what action is carried out based on each operator in a switch statement in function createOperatorSymbol.
  myStage.buttonPlus_btn.value = "+";
  myStage.buttonMinus_btn.value = "-";
  myStage.buttonMultiply_btn.value = "*";
  myStage.buttonDivide_btn.value = "/";
  myStage.buttonPoint_btn.value = ".";

  ///////////////////////////////////////////////////////////////////// Event Listeners ///////////////////////////////////////////////////////////////////////////

  // For loop used to setup event listeners of buttons 0 - 9. The operator buttons are set manually
  for (i = 0; i <= 9; i++) {
    myStage["button" + i + "_btn"].addEventListener("click", ifPowerNumber);
  }

  myStage.buttonPlus_btn.addEventListener("click", ifPowerOperator);
  myStage.buttonMinus_btn.addEventListener("click", ifPowerOperator);
  myStage.buttonMultiply_btn.addEventListener("click", ifPowerOperator);
  myStage.buttonDivide_btn.addEventListener("click", ifPowerOperator);
  myStage.buttonOn_btn.addEventListener("click", powerOn);
  myStage.buttonPercent_btn.addEventListener("click", percentageClick);
  myStage.buttonRoute_btn.addEventListener("click", squareRoute);
  myStage.buttonPlusMinus_btn.addEventListener("click", plusMinus);
  myStage.buttonMC_btn.addEventListener("click", memoryClear);
  myStage.buttonMR_btn.addEventListener("click", memoryRecall);
  myStage.buttonMMinus_btn.addEventListener("click", memoryCreatorMinus);
  myStage.buttonMPlus_btn.addEventListener("click", memoryCreatorPlus);
  myStage.buttonClear_btn.addEventListener("click", cClear);
  myStage.buttonAC_btn.addEventListener("click", allClear);
  myStage.buttonPoint_btn.addEventListener("click", decimalPoint);
  myStage.buttonEquals_btn.addEventListener("click", clickEquals);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function ifPowerNumber(event) {
    // Function to check if power is on and the 'E' isnt on screen, ensuring calculator is ready to take number inputs
    if (
      myStage.displayScreenPlaceholder_txt.text === "0" && // If a '0' is displayed on screen, we know the on button has been pressed
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0 //If the 'E' error is shown, no number input should be possible
    ) {
      createInput(event); // function controlling if inputOne or inputTwo is to be used, depending on if an operator has been selected yet
    }
  }

  function createInput(event) {
    // function controlling if inputOne or inputTwo is to be used, depending on if an operator has been selected yet
    max_chars = 8; // Restricts screen display characters to 8, unless stated otherwise in another function
    if (operatorSelected == true) {
      // varaible turns to true if any operator button has been pressed, if true then we want to be working on inputTwo
      screenDisplayAlphas(0, 1, 0, 0); // function setting Screen display to show inputTwo, via displayScreenTwo_txt
      createInputTwo(event.currentTarget); // function to create inputTwo
      limitInputCharacters.call(myStage.displayScreenTwo_txt.text); // function to limit displayScreenTwo from showing more than 8 characters, limiting inputTwo's seen output. .call creates a custom 'this' so that the function can be reused for both inputOne and inputTwo
      screenDisplayLength.call(myStage.displayScreenTwo_txt); // calls a function to convert any input over the max_chars varaible into a substring of the allowed length if required.  .call creates a custom 'this' so that the function can be reused for both inputOne and inputTwo
    } else {
      // If no operator can be seen, we are still creating inputOne
      screenDisplayAlphas(1, 0, 0, 0); // Function setting Screen display to show inputOne, via displayScreen_txt
      createInputOne(event.currentTarget); // function to create inputOne
      limitInputCharacters.call(myStage.displayScreen_txt.text); // function to limit displayScreen_txt from showing more than 8 characters, limiting inputOne's seen output.  .call creates a custom 'this' so that the function can be reused for both inputOne and inputTwo
      screenDisplayLength.call(myStage.displayScreen_txt); // calls a function to convert any input over the max_chars varaible into a substring of the allowed length if required.  .call creates a custom 'this' so that the function can be reused for both inputOne and inputTwo
    }
    decimalPointReplace(); // Function to check if a decimal point is needed on screen
  }

  function createInputOne(a) {
    // Function overides what is currently on the display adding the current.target value (button value) onto it so that the numbers stack. We dont want this to happen after an answer or a memory value is given, therefore the IF statement is used.
    if (equalsBeenClicked == true) {
      // Check to see if equals has been pressed, if so the displayScreen is reset so that the input isn't added onto the current answer.
      equalsBeenClicked = false; // as the screen is being wiped, we are starting fresh so equals should no longer have been clicked
      myStage.displayScreen_txt.text = 0; // This removes any answer from the display
      myStage.displayScreen_txt.text = myStage.displayScreen_txt.text + a.value; // new inputOne is produced by adding event.currentTarget.value to the displayScreen figure.
      inputOne = myStage.displayScreen_txt.text; // inputOne variale used to store the new value which is passed to the calculation function when required.
    } else if (memoryPlusUsed === true) {
      // Checks to see if a memory function has been used if equals has not been used first. A memory recall will place the memory number on screen, then allow numbers to be concatonated to it.
      console.log("memory function has been used");
      myStage.displayScreen_txt.text = 0; // Screen is cleared to remove any other input, as a memory function is the only thing we currently want on the screen
      memoryPlusUsed = false; // once used, this varaible is returned to false so that a memory button can be pressed again.
      myStage.displayScreen_txt.text = // displayScreen_txt will equal the memory number concatonated to the value of the number pressed (event.currentTarget.value)
        String(myStage.displayScreen_txt.text) + a.value; // adding a string to a number concatenates rather than does an addition sum!
      inputOne = myStage.displayScreen_txt.text;
    } else {
      // If equals hasn't been pressed, or a memory function hasn't been used, numbers are simply concatonated together as a string to create the input
      myStage.displayScreen_txt.text =
        String(myStage.displayScreen_txt.text) + a.value; // adding a string to a number concatenates rather than does an addition sum!
      inputOne = myStage.displayScreen_txt.text;
    }
    inputTwoSelected = false; // If inputOne is currently selected, inputTwo should always be false
    inputOneSelected = true; // states that inputOne has been selected
    konstConstantFigure = parseFloat(inputOne);
    removeLeadingZero.call(myStage.displayScreen_txt);
    inputOne = myStage.displayScreen_txt.text;
  }

  function createInputTwo(a) {
    inputTwoSelectedSpecial = true; // variable used for percentage and square route functions to show that they should calculate based on inputTwo.
    inputTwoSelected = true; // If inputTwo is selected, this should equal true. variable used to control other functions.
    plusMinusSelector = true; // variable to determine if inputTwo has been used, requried for the plusMinus function
    myStage.displayScreenTwo_txt.text = // DisplayScreenTwo_txt takes on the value of the screen concatonated with event.currentTarget.value (value of number button pressed)
      String(myStage.displayScreenTwo_txt.text) + a.value;
    inputTwo = myStage.displayScreenTwo_txt.text; // inputTwo variable used to store a new value which is passed to the calculation function when required.
    console.log("input 2 ========================= ", inputTwo);
    konstConstantFigure = parseFloat(inputTwo);
    removeLeadingZero.call(myStage.displayScreenTwo_txt);
  }

  function limitInputCharacters() {
    console.log("limiting Characters");
    // Function stops any characters over 8 from being displayed on screen. Strings containing a decimal point or a minus are allowed additional screen space, upto 10 characters in total. 'this' is used to allow both inputOne and inputTwo to use this function.
    displayInput = String(this); // variable to hold the string value of the display. A string is required for indexOf to work.
    displayInputLength = displayInput.length; // variable to get the length of displayScreen_txt now that it is a string.
    console.log("input length ======= ", displayInputLength);
    if (
      displayInput.indexOf(".") > -1 && // if the string contains either a '.' AND a '-', then the max_chars variable is increased by two, to 10.
      displayInput.indexOf("-") > -1
    ) {
      console.log("Has a . and a  -");
      max_chars = 10;
    }
    if (displayInput.indexOf(".") > -1) {
      // if the string contains a '.'  then the max_chars variable is increased by one, to 9.
      console.log("Has a . ");
      max_chars = 9;
    }
    if (displayInput.indexOf("-") > -1) {
      // if the string contains a '-'  then the max_chars variable is increased by one, to 9.
      console.log("Has a -");
      max_chars = 9;
    }
  }

  function screenDisplayLength() {
    console.log("Reducing display chars, max_chars ========", max_chars);
    // function checks the length of the input and limits it to the max_char variable amount by creating a substring. 'this' is used to allow both inputOne and inputTwo to use this function.
    if (displayInputLength >= max_chars) {
      // If the string length on the display is greater than or equals to the max_char value, only display the characters upto max_char.
      this.text = displayInput.substr(0, max_chars); // substring created from input numbers, from first entry upto max_char value
    }
  }

  function removeLeadingZero() {
    // Function checks to see if the input starts with a zero, and removes it if the zero isnt immediately followed by a decimal point. 'this' is used to allow both inputOne and inputTwo to use this function.
    console.log("Check to see if leading zero needs removed");
    let zeroTest = String(this.text); // displayScreen_txt needs converted into a string so that we can check its contents
    console.log("before zero removed, inputOne =====", inputOne);
    if (zeroTest.length >= 2) {
      if (
        zeroTest.startsWith("-") === true &&
        zeroTest.startsWith("-0.") == false
      ) {
        console.log("removeZero -0 reached");
        // does the input start with a minus and is it at least 3 characters long?
        if (zeroTest.indexOf("0") != -1) {
          console.log("Zero has been found");
          console.log("this.text before slice", this.text);
          this.text = zeroTest.slice(2); // .slice method used to remove the first character (0) and place the correct input back into displayScreen_txt
          this.text = "-" + this.text;
          console.log("this.text AFTER slice", this.text);
          return;
        }
      }
      // If the length is 2 or more, check to see if the input starts with a zero or not
      if (zeroTest.startsWith("0") === true) {
        console.log("removeZero reached");
        // Does the input start with a zero?
        if (zeroTest.indexOf(".") == -1) {
          // does the input not include a '.'... if a '.' isnt found the answer will be  -1, and the leading zero will be removed
          this.text = zeroTest.slice(1); // .slice method used to remove the first character (0) and place the correct input back into displayScreen_txt
        }
      }
    }
  }

  function ifPowerOperator(event) {
    // Function to check if power is on and the 'E' isnt on screen, ensuring calculator is ready to take OPERATOR inputs
    if (
      myStage.displayScreenPlaceholder_txt.text === "0" && // If a '0' is displayed on screen, we know the on button has been pressed
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0 //If the 'E' error is shown, no OPERATOR input should be possible
    ) {
      if (
        inputOneSelected == true &&
        inputTwoSelectedSpecial == true &&
        operatorSelected == true
      ) {
        console.log(
          "if Operator is selected after input one and input two selected, do maths!"
        );
        screenDisplayAlphas(0, 0, 1, 0); // sets the screen display to show the displayscreenOutput_txt value.
        equalsCalculation(); // Does the maths based on which operator symbol is displayed on screen.
        resetInputs(); // function to reset the outputs and display screen values, so that only the answer is displayed in displayScreen_txt (as the answer is moved into inputOne)
        limitOutputCharacters(); // Function stops the answer being displayed over 8 characters, and throwing up the 'E' symbol if its longer.
        limitInputCharacters.call(myStage.displayScreen_txt.text); // Function checks over the value of the display screen (after tunring it into a string), and if it meets certain critera, extends the posible display number amount from the default 8 to 9 or 10.
        screenDisplayLength.call(myStage.displayScreen_txt); // Function checks the length of displayScreen_txt to ensure it isn't to long, throwing up an 'E' if it is.
        decimalPointReplace(); // Function checks to see if a decimal point has been used, and if it is, removes the placeholder decimal point from the screen via alpha.
        equalsCalculation();
        createOperatorSymbol(event.currentTarget);
      } else {
        kSymbol(event.currentTarget); // function to check if an operator has already been selected, to enable 'k' functionality
        createOperatorSymbol(event.currentTarget); // Function is a switch statement to set the correct operator symbol on the screen.
      }
    }
  }

  function createOperatorSymbol(a) {
    // function places the correct operator symbol on screen depending on which operator button is selected. Switch statement using 'a' as the argument for event.currentTarget
    operatorSelected = true;
    inputTwoSelected = true; // once an operator has been selected, we want the next selected number to go into inputTwo
    switch (
      a.value // a = currentTarget.value, so it's taking the value of the operator selected based on the value statically set in the setup area at the top of the script
    ) {
      case "+": // if the plus button was selected, current target will have the .value '+'. The plus symbol will then be displayed on the screen, if it already is or not.
        console.log("Plus pressed symbol updated");
        konstConstantFigure = parseFloat(inputOne);
        if (
          myStage.symbolPlus_mc.alpha == 1 ||
          myStage.symbolPlus_mc.alpha == 0
        ) {
          operatorSymbols(0, 0, 0, 1); // Sets the on screen operator symbol to the PLUS symbol.
        }
        break;

      case "-": // if the minus button was selected, current target will have the .value '-'. The minus symbol will then be displayed on the screen, if it already is or not.
        console.log("minus pressed symbol updated");
        konstConstantFigure = parseFloat(inputOne);
        if (
          myStage.symbolMinus_mc.alpha == 1 ||
          myStage.symbolMinus_mc.alpha == 0
        ) {
          operatorSymbols(0, 0, 1, 0); // Sets the on screen operator symbol to the MINUS symbol.
        }
        break;

      case "*": // if the multiply button was selected, current target will have the .value '*'. The multiply symbol will then be displayed on the screen, if it already is or not.
        console.log("Mutiply pressed symbol updated");
        konstConstantFigure = parseFloat(inputOne);
        if (
          myStage.symbolMultiply_mc.alpha == 1 ||
          myStage.symbolMultiply_mc.alpha == 0
        ) {
          operatorSymbols(0, 1, 0, 0); // Sets the on screen operator symbol to the MULTIPLY symbol.
        }
        break;

      case "/": // if the divide button was selected, current target will have the .value '/'. The divide symbol will then be displayed on the screen, if it already is or not.
        console.log("Divide pressed symbol updated");
        konstConstantFigure = parseFloat(inputOne);
        if (
          myStage.symbolDivide_mc.alpha == 1 ||
          myStage.symbolDivide_mc.alpha == 0
        ) {
          operatorSymbols(1, 0, 0, 0); // Sets the on screen operator symbol to the DIVIDE symbol.
        }
        break;
    }
  }

  function clickEquals() {
    // Function to control what happens when equals has been pressed. Function calculates the sum between the inputs
    if (
      myStage.displayScreenPlaceholder_txt.text === "0" // If a '0' is displayed on screen, we know the on button has been pressed so that the function only works when power is on
    ) {
      if (
        // If any 'E' on display don't do anything.
        myStage.errorSymbol_txt.alpha == 0 &&
        myStage.errorMemorySymbol_txt.alpha == 0
      ) {
        equalsBeenClicked = true; // Selects that equals has been pressed so that the  Clear function can no longer clear.
        screenDisplayAlphas(0, 0, 1, 0); // sets the screen display to show the displayscreenOutput_txt value.
        equalsCalculation(); // Does the maths based on which operator symbol is displayed on screen.
        resetInputs(); // function to reset the outputs and display screen values, so that only the answer is displayed in displayScreen_txt (as the answer is moved into inputOne)
        limitOutputCharacters(); // Function stops the answer being displayed over 8 characters, and throwing up the 'E' symbol if its longer.
        limitInputCharacters(); // Function checks over the value of the display screen (after tunring it into a string), and if it meets certain critera, extends the posible display number amount from the default 8 to 9 or 10.
        screenDisplayLength(); // Function checks the length of displayScreen_txt to ensure it isn't to long, throwing up an 'E' if it is.
        decimalPointReplace(); // Function checks to see if a decimal point has been used, and if it is, removes the placeholder decimal point from the screen via alpha.
        memoryPlusUsed = false; // Resets if any memory function has been used
        returnIsNaN(); // If answer returns NaN by mistake / bug, the answer will be ERROR instead
      }
    }
  }

  function screenDisplayAlphas(a, b, c, d) {
    // function controls which text output is shown on screen
    myStage.displayScreen_txt.alpha = a;
    myStage.displayScreenTwo_txt.alpha = b;
    myStage.displayScreenOutput_txt.alpha = c;
    myStage.displayScreenPlaceholder_txt.alpha = d;
  }

  ///////////////////////////////////////////////////////////////////////////// The Calculator //////////////////////////////////////////////////////////////////////////////////////////////////////

  function equalsCalculation() {
    console.log("inputOne =====", inputOne);
    console.log("inputTwo =======", inputTwo);
    // Does the maths based on which operator symbol is displayed on screen.
    if (
      // If any 'E' on display don't do anything.
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0
    ) {
      if (myStage.karrySymbol_txt.alpha == 1) {
        // If 'k' is on screen, inputOne should be calculated against inputOne, rather than inputTwo.
        console.log("konstConstantFigure ===========", konstConstantFigure);
        if (myStage.symbolPlus_mc.alpha == 1) {
          console.log("Add Constant"); // If '+' symbol is on screen
          if (
            // If inputOne is selected, followed by plus operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelected == false &&
            operatorSelected == true
          ) {
            console.log("no inputTwo selected before equals, k on screen");
            myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
            outputEquals = myStage.displayScreenOutput_txt.text;
          } else {
            myStage.displayScreenOutput_txt.text = // inputOne is added to inputOne
              parseFloat(inputOne) + parseFloat(konstConstantFigure); // parsefloat parses a string and returns a floating decimal point, as long as it finds numbers. NaN if can't find a number as the first character
            outputEquals = myStage.displayScreenOutput_txt.text; // konstConstantFigure varaible holds the value to be incremented. Variable filled whilst inputOne or Two are being created.
          }
        }

        if (myStage.symbolMinus_mc.alpha == 1) {
          console.log("Minus Constant"); // If '-' symbol is on screen
          if (
            // If inputOne is selected, followed by minus operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelected == false &&
            operatorSelected == true
          ) {
            console.log("no inputTwo selected before equals, k on screen");
            myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
            outputEquals = myStage.displayScreenOutput_txt.text;
          } else {
            myStage.displayScreenOutput_txt.text = // inputOne is taken from inputOne
              parseFloat(inputOne) - parseFloat(konstConstantFigure);
            outputEquals = myStage.displayScreenOutput_txt.text;
          }
        }

        if (myStage.symbolMultiply_mc.alpha == 1) {
          console.log("Mutiply Constant"); // If '*' is on screen
          if (
            // If inputOne is selected, followed by mutiply operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            console.log("no inputTwo selected before equals, k on screen");
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) * parseFloat(inputOne);
            outputEquals = myStage.displayScreenOutput_txt.text;
          } else {
            myStage.displayScreenOutput_txt.text = // inputOne is mutiplied by inputOne
              parseFloat(inputOne) * parseFloat(konstConstantFigure);
            outputEquals = myStage.displayScreenOutput_txt.text;
          }
        }

        if (myStage.symbolDivide_mc.alpha == 1) {
          console.log("Divide Constant"); // If '/' is on screen
          if (
            // If inputOne is selected, followed by divide operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            console.log("no inputTwo selected before equals, k on screen");
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) / parseFloat(inputOne);
            outputEquals = myStage.displayScreenOutput_txt.text;
          } else {
            myStage.displayScreenOutput_txt.text = // inputOne is divided by inputOne
              parseFloat(inputOne) / parseFloat(konstConstantFigure);
            outputEquals = myStage.displayScreenOutput_txt.text;
          }
        }
      } else {
        // if 'k' isnt used inputOne is calculated against inputTwo
        if (myStage.symbolPlus_mc.alpha == 1) {
          console.log("Add, operator selected");
          if (
            // If inputOne is selected, followed by plus operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          } else {
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) + parseFloat(inputTwo);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          }
        }
        if (myStage.symbolMinus_mc.alpha == 1) {
          console.log("Minus");
          if (
            // If inputOne is selected, followed by minus operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          } else {
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) - parseFloat(inputTwo);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          }
        }
        if (myStage.symbolMultiply_mc.alpha == 1) {
          console.log("Mutiply");
          if (
            // If inputOne is selected, followed by mutiply operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            console.log("outputEquals ==============", outputEquals); // Number is mutiplied by itself if no inputTwo is entered
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) * parseFloat(inputOne);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          } else {
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) * parseFloat(inputTwo);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
          }
        }

        if (myStage.symbolDivide_mc.alpha == 1) {
          console.log("Divide");
          if (
            // If inputOne is selected, followed by divide operator, followed by equals before inputTwo is pressed
            inputOneSelected == true &&
            inputTwoSelectedSpecial == false &&
            operatorSelected == true
          ) {
            console.log("no inputTwo selected before equals");
            myStage.displayScreenOutput_txt.text = 1; // Will always equal 1.
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
            console.log("outputEquals ==============", outputEquals);
            console.log("InputTwo Selected ==============", inputTwoSelected);
          } else if (inputTwo == 0) {
            // Rule to ensure anything divided by Zero is '0' not infinity!
            console.log("inputTwo ========================== ZERO");
            myStage.displayScreenOutput_txt.text = 0;
            console.log("outputEquals ==============", outputEquals);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
            console.log("outputEquals ==============", outputEquals);
            myStage.errorSymbol_txt.alpha = 1;
          } else {
            console.log(
              "inputTwo is selected, divide should be working normally"
            );
            myStage.displayScreenOutput_txt.text =
              parseFloat(inputOne) / parseFloat(inputTwo);
            console.log("outputEquals ==============", outputEquals);
            outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
            console.log("outputEquals ==============", outputEquals);
          }
        }
        if (inputOneSelected === true && inputTwoSelected === false) {
          //If no operator has been selected before equals is pressed
          console.log("No operator selected");
          inputTwo = 0;
          myStage.displayScreenOutput_txt.text =
            parseFloat(inputOne) + parseFloat(inputTwo);
          outputEquals = parseFloat(myStage.displayScreenOutput_txt.text);
        }
        operatorSymbols(0, 0, 0, 0); // Operator symbol is reset as the calculation has been completed
      }
    }
    //outputEquals = Math.round(outputEquals * 100) / 100; // this would round to two decimal places... but the casio calculator doesnt always round this way! Far more accurate to leave as is and not add rounding.
  }

  function resetInputs() {
    console.log("reset inputs");
    // function resets everything once a calculation has been completed, ready for the next input.
    inputOne = String(outputEquals); // the answer is moved into inputOne so that other numbers can be added / divided / mutiplied etc. String is needed so that if there is a '-' it is read correctly as a string.
    console.log("inputOne =======", inputOne);
    console.log("outputEquals =======", outputEquals);
    inputTwo = "";
    outputEquals = "";
    myStage.displayScreen_txt.text = inputOne; // inputOne's value is displayed in displayScreen_txt
    myStage.displayScreenTwo_txt.text = ""; // Displayscreens need cleared
    myStage.displayScreenOutput_txt.text = "";
    screenDisplayAlphas(1, 0, 0, 0); // displayScreen_txt is displayed, with the contents showing inputOne (the answer of the calulation)
    inputOneSelected = true; // Indicates that inputOne should be used, rather than inputTwo
    inputTwoSelected = false; // Tells memory functions that inputOne should be used until an operator is used.
    plusMinusSelector = false; // Resets any plusMinus function activity
    inputTwoSelectedSpecial = false; // variable used to distinguish that inputTwo is now being used for the square route function.
    operatorSelected = false;
  }

  function allClear() {
    // function controls AC button
    if (
      myStage.displayScreenPlaceholder_txt.text === "0" // If a '0' is displayed on screen, we know the on button has been pressed so that the function only works when power is on
    ) {
      console.debug("All Clear");
      inputOne = 0; // Inputs reset to 0
      inputTwo = 0;
      outputEquals = 0;
      myStage.displayScreen_txt.text = ""; // display text reset to nothing so that they don't show anyhting up on the screen
      myStage.displayScreenTwo_txt.text = "";
      myStage.displayScreenOutput_txt.text = "";
      operatorSymbols(0, 0, 0, 0); // Operator symbols removed
      screenDisplayAlphas(0, 0, 0, 1); // default 0 is shown on screen
      myStage.errorSymbol_txt.alpha = 0; // 'E' symbol removed
      myStage.displayScreenPlaceholder_txt.text = "0"; // ensures display always shows '0' at the start.
      equalsBeenClicked = false; // Resets the equalsBeenClicked variable, so that the Clear button works again
      inputOneSelected = false; // Indicates that inputOne should be used, rather than inputTwo
      inputTwoSelected = false; // Tells memory functions that inputOne should be used until an operator is used.
      ifEqualsError(); // Resets the E symbol on screen if it was showing after a calculation
      equalsBeenClicked = false; // indicates that inputOne should be used to input creation function
      myStage.decimalPoint_txt.alpha = 1; // A decimal point is placed on screen at power on, this is modified by inputs and simply serves as a placeholder.
      plusMinusSelector = false; // Resets any plusMinus function activity
      myStage.karrySymbol_txt.alpha = 0; // removes the 'k' if on screen
      inputTwoSelectedSpecial = false; // variable used to distinguish that inputTwo is now being used for the square route function.
      operatorSelected = false; // variable used to distinguish that an operator has been pressed
    } else return; // leave the function as no Power to calculator
  }

  function powerOn() {
    // Function controls turning on the calculator
    console.debug("Power On");
    inputOne = 0; // on press the inputs are reset to 0
    inputTwo = 0;
    outputEquals = 0;
    myMemoryValue = 0;
    myStage.displayScreen_txt.text = ""; // on press the displays are reset to be clear, and the alphas are set so that a default '0' is shown on screen.
    myStage.displayScreenTwo_txt.text = "";
    myStage.displayScreenOutput_txt.text = "";
    operatorSymbols(0, 0, 0, 0, 0); // Clears all operator symbols such as k, m, e
    screenDisplayAlphas(0, 0, 0, 1); // Default 0 is shown on screen
    myStage.displayScreenPlaceholder_txt.text = "0"; // Puts a placeholder '0' on screen when there is no current input
    myStage.decimalPoint_txt.alpha = 1; // A decimal point is placed on screen at power on, this is modified by inputs and simply serves as a placeholder.
    ifEqualsError(); // Resets the E symbol on screen if it was showing after a calculation
    equalsBeenClicked = false; // Resets the equalsBeenClicked variable which controls the Clear button / function.
    memoryClear(); // Function to clear any memory function activity / storage
    plusMinusSelector = false; // Resets any plusMinus function activity
    myStage.karrySymbol_txt.alpha = 0; // removes the 'k' if on screen
    inputTwoSelectedSpecial = false; // variable used to distinguish that inputTwo is now being used for the square route function.
    operatorSelected = false; // variable used to distinguish that an operator has been pressed
    inputOneSelected = false;
    inputTwoSelected = false;
  }

  function cClear() {
    // Function to control when the Clear button is pressed
    console.log("Clear function invoked");
    screenDisplayAlphas(0, 0, 0, 1); // because inputs are cleared, placeholder '0' is shown.
    myStage.errorMemorySymbol_txt.alpha = 0; //after clear the 'E' is removed
    myStage.errorSymbol_txt.alpha = 0;
    if (equalsBeenClicked == false) {
      // If equals has been pressed, equalsBeenClicked will be true and prevent Clear from working... calculator quirk
      console.log("Clear function invoked past if statement");
      if (inputTwoSelected == true) {
        // If there is anything in inputTwo, then inputTwo is cleared.
        console.log("inputTwo cleared");
        inputTwo = "";
        myStage.displayScreenTwo_txt.text = inputTwo; // inputTwo is displayed on calc screen
      } else if (inputTwoSelected == false) {
        // if there is nothing in input two, and inputOne has a value, inputOne is cleared
        console.log("inputOne cleared");
        inputOne = "";
        myStage.displayScreen_txt.text = inputOne; // inputOne is displayed on calc screen
        myStage.decimalPoint_txt.alpha = 1; // puts the placeholder decimal point back in place
        inputOneSelected = false;
        inputTwoSelected = false;
      }
    } else if (equalsBeenClicked == true) {
      console.log("Clear shouldn't be happening");
      screenDisplayAlphas(1, 0, 0, 0); // Ensure displayscreen_txt is still shown, as clear shouldn't change this
    }
  }

  inputOneSelected == true &&
    inputTwoSelectedSpecial == false &&
    operatorSelected == true;

  function limitOutputCharacters() {
    console.log("inputOne =======", inputOne);
    console.log("limit output chars function reached");
    // Function limits the amount of characters which can be displayed after calculation (the answer)
    displayOutputLength = String(myStage.displayScreen_txt.text).length; // converts answer to a string length so that .length can be used via new variable
    displayOutput = String(myStage.displayScreen_txt.text); // converts answer to a string so that is can be used to calculate correct output.
    if (displayOutput.indexOf(".") > -1 && displayOutput.indexOf("-") > -1) {
      console.log("Has a . and a  -"); // If string contains a '.' and a '-' can have 10 chars on screen
      max_chars = 10;
    } else if (displayOutput.indexOf(".") > -1) {
      console.log("Has a . "); // If a string contains a '.' can have 9 chars on screen
      max_chars = 9;
    } else if (displayOutput.indexOf("-") > -1) {
      console.log("Has a -"); // If a string contains a '-' can have 9 chars on screen
      max_chars = 9;
    } else {
      max_chars = 8; // default should be 8 if no special characters are on screen
    }
    displayOutputError(); // Function controls how many characters the display will output based on the max_chars variable
  }

  function displayOutputScreen() {
    if (displayOutputLength > max_chars) {
      // If the display screen text (converted to a string) is greater than the max_chars, limit output by creating a substing of the length of max_chars.
      myStage.displayScreen_txt.text = displayOutput.substr(0, max_chars); // display screen text is only given as a substring of display screen text, containing the letters upto max_chars, so 8.
      //displayOutputError(); // Function to control where the 'E' symbol should be shown on screen based on if 'M' is on screen
    }
  }

  function displayOutputError() {
    // Function to control if the 'E' is displayed to the left or right depending on if 'm' is on screen
    if (
      myStage.displayScreen_txt.text > 100000000 ||
      myStage.displayScreen_txt.text < -100000000
    ) {
      // If the number is larger than 999999999, or smaller than -100000000 than the 'E' is added on, before the number length is reduced to fit onto the screen in the displayOutputScreen function
      if (myStage.memorySymbol_txt.alpha == 1) {
        myStage.errorMemorySymbol_txt.alpha = 1;
      } else {
        myStage.errorSymbol_txt.alpha = 1; // Gives us the 'E' symbol, meaning error as the answer is two long
      }
    }
    displayOutputScreen();
  }

  function ifEqualsError() {
    // Resets the 'E' symbol when ON is pressed.
    if (myStage.errorSymbol_txt.alpha == 1) {
      myStage.errorSymbol_txt.alpha = 0;
    }
    if (myStage.errorMemorySymbol_txt.alpha == 1) {
      myStage.errorMemorySymbol_txt.alpha = 0;
    }
  }

  function operatorSymbols(a, b, c, d) {
    //Function to control alphas of the on screen operator icons.
    myStage.symbolDivide_mc.alpha = a;
    myStage.symbolMultiply_mc.alpha = b;
    myStage.symbolMinus_mc.alpha = c;
    myStage.symbolPlus_mc.alpha = d;
  }

  function squareRoute() {
    console.log("Square Route clicked"); // Function to calculate square route
    if (
      // If any 'E' on display don't do anything.
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0
    ) {
      screenDisplayAlphas(1, 0, 0, 0); // Sets displayScreen_txt as the correct calculator display so that inputOne can be seen.

      if (inputOne == false) {
        // If no input has been selected, when calculator has just been tunred on for example. Then do nothing. Square route of 0, should stay 0.
        screenDisplayAlphas(0, 0, 0, 1);
      }

      if (
        myStage.displayScreen_txt.text < 0.0 ||
        myStage.displayScreenTwo_txt.text < 0.0
      ) {
        console.log("Number less than 0"); // If the number to be squared is a minus number. Math.sqrt doesnt work on minus numbers so have to make a positive first.
        if (inputTwoSelectedSpecial == true) {
          console.log("inputTwo squared"); // If there is a value in  inputTwo, then the square route of inputTwo is calculated.
          myStage.displayScreenTwo_txt.text = String(
            myStage.displayScreenTwo_txt.text
          ); // Turn inputTwo into a string so that we can slice off the minus '-' at the start
          myStage.displayScreenTwo_txt.text = myStage.displayScreenTwo_txt.text.slice(
            1
          );
          inputTwo = myStage.displayScreenTwo_txt.text; // inputTwo now equals the input with the '-' taken away.
          inputTwo = Math.sqrt(inputTwo); // inputOne becomes the square route of inputOne using Math.sqrt
          inputOne = inputTwo; // inputTwo moved into inputOne as its now an answer
          myStage.displayScreen_txt.text = inputOne; // displayScreen_txt.text is given the value of inputOne to display
          inputTwo = ""; // inputTwo needs to be cleared as inputTwo is now in inputOne's position
          if (myStage.memorySymbol_txt.alpha == 1) {
            myStage.errorMemorySymbol_txt.alpha = 1;
          } else {
            myStage.errorSymbol_txt.alpha = 1; // Gives us the 'E' symbol, meaning error as the answer is two long
          }
          squareRouteMinusError();
        } else if (
          inputOneSelected === true &&
          inputTwoSelectedSpecial == false
        ) {
          console.log("inputOne squared"); // If there is no value in inputTwo, then the square route of inputOne is calculated.
          myStage.displayScreen_txt.text = String(
            myStage.displayScreen_txt.text
          );
          myStage.displayScreen_txt.text = myStage.displayScreen_txt.text.slice(
            1
          );
          inputOne = myStage.displayScreen_txt.text;
          inputOne = Math.sqrt(inputOne); // inputOne becomes the square route of inputOne using Math.sqrt
          myStage.displayScreen_txt.text = inputOne; // displayScreen_txt.text is given the value of inputOne to display
          if (myStage.memorySymbol_txt.alpha == 1) {
            myStage.errorMemorySymbol_txt.alpha = 1;
          } else {
            myStage.errorSymbol_txt.alpha = 1; // Gives us the 'E' symbol, meaning error as the answer is two long
          }
        }
      } else {
        if (inputTwoSelectedSpecial == true) {
          console.log("inputTwo squared"); // If there is anything in inputTwo, then the square route of inputTwo is calculated.
          inputTwo = Math.sqrt(inputTwo); // inputOne becomes the square route of inputOne using Math.sqrt
          inputOne = inputTwo;
          myStage.displayScreen_txt.text = inputOne; // displayScreen_txt.text is given the value of inputOne to display
          inputTwo = ""; // inputTwo needs to be cleared as inputTwo is now in inputOne's position
        } else if (
          inputOneSelected === true &&
          inputTwoSelectedSpecial == false
        ) {
          inputOne = Math.sqrt(inputOne); // inputOne becomes the square route of inputOne using Math.sqrt
          myStage.displayScreen_txt.text = inputOne; // displayScreen_txt.text is given the value of inputOne to display
        }
      }
      equalsBeenClicked = true;
      limitOutputCharacters(); // limits the answer characters so that they remain on the screen.
      roundingToWholeNumber(); // Rounds up 1.00000000XXXXX... to a whole number of 1.
      decimalPointReplace(); // Removes the 'fake decimal' point if a real one is used
    }
  }

  function decimalPoint(event) {
    // Function to deal with the decimal point input, depending on if its being put into inputOne or inputTwo
    if (inputOneSelected === true && inputTwoSelected !== true) {
      // If displayScreenTwo is empty, we are currently working with inputOne in displayScreen_txt
      decimalPointOne(event); // function which controls if a decimal point can be placed into displayScreen_txt or not
    } else {
      // If displayScreenTwo is not empty, we are currently working with inputTwo in displayScreenTwo_txt
      decimalPointTwo(event); // function which controls if a decimal point can be placed into displayScreenTwo_txt or not
    }
    decimalAtStart(); // Function to ensure a '0' is placed infront of a leading '.' to avoid NaN, and also makes the calculator act correctly when a lone decimal point is pressed.
  }

  function decimalPointOne(event) {
    // function which controls if a decimal point should be placed into displayScreen_txt or not
    var a = String(myStage.displayScreen_txt.text);
    if (a.indexOf(".") > -1) {
      return; // If displayScreen_txt has a '.' leave the function before the other functions are invoked to actually place the decimal point
    } else {
      // If no '.' is found
      ifPowerNumber(event); // function checks to ensure the power button is on, then adds the decimal point onto the current input number
      decimalPointReplace(); // Removes the 'fake decimal' point if a real one is used
    }
  }

  function decimalPointTwo(event) {
    var a = String(myStage.displayScreenTwo_txt);
    // function which controls if a decimal point can be placed into displayScreenTwo_txt or not
    if (a.indexOf(".") > -1) {
      return; // If displayScreen_txt has a '.' leave the function before the other functions are invoked to actually place the decimal point
    } else {
      // If no '.' is found
      ifPowerNumber(event); // function checks to ensure the power button is on, then adds the decimal point onto the current input number
      decimalPointReplace(); // Removes the 'fake decimal' point if a real one is used
    }
  }

  function decimalPointReplace() {
    console.log("check to see if decimal point needs replaced"); // Function Removes the 'fake decimal' point if a real one is used. Converts answer to a string length so that .length can be used via new variable
    if (inputOneSelected == true && inputTwoSelected != true) {
      //  if inputOne is selected = true and inputTwoSelected isnt true, we are working on inputOne
      var displayOutput = String(myStage.displayScreen_txt.text);
      if (displayOutput.indexOf(".") > -1) {
        // If a '.' is found in the string, remove the default demical point to avoid their being two.
        myStage.decimalPoint_txt.alpha = 0;
      } else {
        myStage.decimalPoint_txt.alpha = 1;
      }
    }
    if (inputOneSelected == true && inputTwoSelected == true) {
      // If inputOne and inputTwoSelected are both true, we are working on inputTwo
      var displayOutputTwo = String(myStage.displayScreenTwo_txt.text);
      if (
        // if displayScreen or displayScreenTwo contain a '.' (indexOf looks of this, if > -1 there is one as greater than 0), then remove fake decimal
        displayOutputTwo.indexOf(".") > -1
      ) {
        // If a '.' is found in the string, remove the default demical point to avoid their being two.
        myStage.decimalPoint_txt.alpha = 0; // removes the fake decimal point
      } else {
        myStage.decimalPoint_txt.alpha = 1;
      }
    }
  }

  function decimalAtStart() {
    // Function to ensure a '0' is placed infront of a leading '.' to avoid NaN, and also makes the calculator act correctly when a lone decimal point is pressed.
    if (inputOneSelected === true && inputTwoSelected !== true) {
      //  if inputOne is selected = true and inputTwoSelected isnt true, we are working on inputOne
      var numberToString = String(myStage.displayScreen_txt.text);
      var numberTest = numberToString.startsWith(".");
      // If inputOne has been selected, and inputTwo hasnt, action on inputOne
      if (numberTest === true) {
        // If numberTest starts with a '.', a zero is to be added.
        console.log("Zero Added to input One");
        myStage.displayScreen_txt.text = 0 + myStage.displayScreen_txt.text;
        inputOne = myStage.displayScreen_txt.text;
      }
    }
    if (inputOneSelected === true && inputTwoSelected === true) {
      // If inputOne and inputTwoSelected are both true, we are working on inputTwo
      var numberToStringTwo = String(myStage.displayScreenTwo_txt.text);
      var numberTestTwo = numberToStringTwo.startsWith(".");
      screenDisplayAlphas(0, 1, 0, 0); // Changes the display to displayScreenTwo_txt so that inputTwo is shown
      // If inputTwo has been selected, action on inputTwo
      if (numberTestTwo === true) {
        // If numberTest starts with a '.', a zero is to be added.
        console.log("Zero Added to input Two");
        myStage.displayScreenTwo_txt.text =
          0 + myStage.displayScreenTwo_txt.text;
        inputTwo = myStage.displayScreenTwo_txt.text;
      }
    }
  }

  function percentageClick(event) {
    console.log("percentage clicked"); // Function controls what happens when the % button is pressed
    if (
      myStage.displayScreenPlaceholder_txt.text === "0" // If a '0' is displayed on screen, we know the on button has been pressed so that the function only works when power is on
    ) {
      if (inputOne == false) {
        console.log("no input, do nothing");
        // If no input has been selected, when calculator has just been tunred on for example. Then do nothing. Square route of 0, should stay 0 and exit the function.
        myStage.displayScreenOutput_txt.text = 0;
      }
      if (inputOneSelected === true && inputTwoSelectedSpecial === true) {
        // If inputOne and inputTwoSelected are both true, we know that a sum can be calculated.
        if (myStage.symbolPlus_mc.alpha == 1) {
          console.log("Add percentage"); // If the plus operator has been selected
          var percentageDecimal = parseFloat(inputOne) / 100; // Firstly need to convert percentage into a decimal!
          var percentageFigure =
            parseFloat(percentageDecimal) * parseFloat(inputTwo);
          myStage.displayScreenOutput_txt.text =
            parseFloat(inputOne) + parseFloat(percentageFigure); // parsefloat parses a string and returns a floating decimal point, as long as it finds numbers. NaN if can't find a number as the first character
        }
        if (myStage.symbolMinus_mc.alpha == 1) {
          console.log("Minus percentage"); // If the minus operator has been selected
          var percentageDecimal = parseFloat(inputOne) / 100;
          var percentageFigure =
            parseFloat(percentageDecimal) * parseFloat(inputTwo);
          myStage.displayScreenOutput_txt.text =
            parseFloat(inputOne) - parseFloat(percentageFigure);
        }
        if (myStage.symbolMultiply_mc.alpha == 1) {
          console.log("Mutiply percentage");
          var percentageFigure = inputTwo / 100;
          myStage.displayScreenOutput_txt.text =
            parseFloat(inputOne) * parseFloat(percentageFigure);
        }
        if (myStage.symbolDivide_mc.alpha == 1) {
          console.log("Divide percentage");
          var percentageFigure = inputTwo / 100;
          myStage.displayScreenOutput_txt.text =
            parseFloat(inputOne) / parseFloat(percentageFigure);
        }
      } else if (
        inputOneSelected == true &&
        inputTwoSelectedSpecial == false &&
        operatorSelected == true
      ) {
        // If inputOne is selected, inputTwo isn't, but an operator has been selected! Curve ball dodged!
        if (myStage.symbolPlus_mc.alpha == 1) {
          console.log("Add percentage no inputTwo"); // If the plus operator has been selected just show current display input
          myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
        }
        if (myStage.symbolMinus_mc.alpha == 1) {
          console.log("Minus percentage no inputTwo"); // If the minus operator has been selected just show current siplay input
          myStage.displayScreenOutput_txt.text = parseFloat(inputOne);
        }
        if (myStage.symbolMultiply_mc.alpha == 1) {
          console.log("Mutiply percentage no inputTwo"); // If percentage is clicked, divide input by 100 to make a percentage, then mutiply by itself before dividing by 100
          var percentageDecimal = parseFloat(inputOne) / 100;
          var percentageFigure = parseFloat(inputOne) * parseFloat(inputOne);
          myStage.displayScreenOutput_txt.text =
            parseFloat(percentageFigure) / 100;
        }
        if (myStage.symbolDivide_mc.alpha == 1) {
          console.log("Divide percentage no inputTwo"); // if Divide is pressed, simply display 100
          myStage.displayScreenOutput_txt.text = 100;
        }
      } else if (inputOneSelected == true && inputTwoSelectedSpecial == false) {
        myStage.displayScreenOutput_txt.text = inputOne; // we dont want any answer, other than the current input to remain on screen
      }

      myStage.displayScreenTwo_txt.text = 0; // inputTwo is reset, as the answer is moved into inputOne
      outputEquals = String(myStage.displayScreenOutput_txt.text);
      myStage.displayScreen_txt.text = String(
        myStage.displayScreenOutput_txt.text
      ); // String value created so that after answer numbers are concatonated not added!
      inputOne = String(myStage.displayScreen_txt.text);
      inputTwo = ""; // inputTwo is reset, as the answer is moved into inputOne
      outputEquals = ""; // outputEquals has been used so now needs to be cleared
      operatorSymbols(0, 0, 0, 0); //Function to control alphas of the on screen operator icons. Removes all symbols as sum has been completed.
      limitInputCharacters.call(myStage.displayScreen_txt.text); // Function to ensure characters dont exceed screen limit
      screenDisplayLength.call(myStage.displayScreen_txt); // Function controls how long the screenOne display output can be depending on if any '.' or '-' are found in the answer.
      screenDisplayAlphas(1, 0, 0, 0); // displayScreen_txt is displayed, with the contents showing inputOne (the answer of the calulation)
      equalsBeenClicked = true; // Percentage button acts as an equals press, so this variable becomes true
      inputOneSelected = true; // Indicates that inputOne should be used, rather than inputTwo
      inputTwoSelected = false; // Tells memory functions that inputOne should be used until an operator is used.
      plusMinusSelector = false; // Resets any plusMinus function activity
      inputTwoSelectedSpecial = false; // variable used to distinguish that inputTwo is now being used for the square route function.
      operatorSelected = false; // No longer using any operator symbol
      decimalPointReplace(); // Function checks to see if a decimal point needs added / taken away
      console.log("inputOne ========", inputOne);
      console.log("inputTwo ======", inputTwo);
    }
  }

  function plusMinus() {
    console.log("Plus Minus"); // function controls what happens when the plus/minus button is pressed. This includes stopping a '-' from being added if there is an 'E' on screen.
    console.log("inputOne ====", inputOne);
    if (inputOneSelected == false) {
      console.log("no input, do nothing");
      // If no input has been selected, when calculator has just been tunred on for example. Then do nothing. Square route of 0, should stay 0 and exit the function.
      return;
    }
    if (inputOneSelected != false && plusMinusSelector == false) {
      // If inputOneSelected is not false, AND inputTwoSelected is false, do something to input One
      console.log("plus minus one"); // if inputOne selcted and inputTwo not, plusMinus inputOne
      if (myStage.errorSymbol_txt.alpha == 0) {
        plusMinusOne(); // controls if a '-' is added or taken away
      }
    }
    if (inputOneSelected != false && plusMinusSelector == true) {
      // If inputOneSelected is not false, AND inputTwoSelected is not false, so something to input Two
      console.log("plus minus two"); // if inputOne selcted and inputTwo selected, plusMinus inputTwo
      if (myStage.errorSymbol_txt.alpha == 0) {
        plusMinusTwo(); // controls if a '-' is added or taken away
      }
    }
  }

  function plusMinusOne() {
    console.debug("plusMinusOne invoked"); // Function controls if a '-' is added or taken away
    var displayOutput = String(myStage.displayScreen_txt.text); // input is turned into a string so that the index can be examined.
    if (displayOutput.indexOf("-") == -1) {
      console.debug("no '-' found"); // index checked for the '-' symbol, if non is found (-1) then one is added to the start of the display text
      myStage.displayScreen_txt.text = "-" + myStage.displayScreen_txt.text;
      inputOne = myStage.displayScreen_txt.text;
    } else {
      console.debug("take the '-' away"); // if a '-' is found, then its removed. the '-' will be in position one, so we can use slice(1) to remove it.
      myStage.displayScreen_txt.text = myStage.displayScreen_txt.text.slice(1);
      inputOne = myStage.displayScreen_txt.text;
    }
  }

  function plusMinusTwo() {
    console.debug("plusMinusTwo invoked"); // Function does the same as plusMinusOne but for inputTwo
    var displayOutput = String(myStage.displayScreenTwo_txt.text);
    if (displayOutput.indexOf("-") == -1) {
      console.debug("no '-' found");
      myStage.displayScreenTwo_txt.text =
        "-" + myStage.displayScreenTwo_txt.text;
      inputTwo = myStage.displayScreenTwo_txt.text;
    } else {
      console.debug("take the '-' away");
      myStage.displayScreenTwo_txt.text = myStage.displayScreenTwo_txt.text.slice(
        1
      );
      inputTwo = myStage.displayScreenTwo_txt.text;
    }
  }

  function roundingToWholeNumber() {
    // Function controls the rounding of 1.00000000 to simply '1' during a square route calculation. displayScreen_text.text will equal 1.0 when it reaches 1.00000000 and therefore become 1.
    if (myStage.displayScreen_txt.text == 1.0) {
      myStage.displayScreen_txt.text = 1;
      inputOne = myStage.displayScreen_txt.text;
    }
    if (myStage.displayScreen_txt.text == "1.0000000") {
      myStage.displayScreen_txt.text = 1;
      inputOne = myStage.displayScreen_txt.text;
    }
  }

  function returnIsNaN() {
    console.log("Return NaN reached"); // Function to change any NaN answer to equal ERROR instead as a catch in case any bugs happen etc.
    if (myStage.displayScreen_txt.text == "NaN") {
      console.log("inputOne ===== NAN, function reached");
      inputOne = "ERROR";
      myStage.displayScreen_txt.text = inputOne;
    }
  }

  ////////////////////////////////////////////////////////////////////////////MEMORY FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////

  function memoryClear() {
    //Function controls the memory value being cleared on the MC button press
    myStage.memorySymbol_txt.alpha = 0; // The 'M' is removed from screen
    myMemoryValue = 0; // myMemoryValue variable is reset to 0.
    memoryPlusUsed = false;
  }

  function memoryCreatorPlus() {
    if (
      // Function only works if Power is ON. Function adds to the memory value via the myMemoryValue variable
      myStage.displayScreenPlaceholder_txt.text === "0" && // If a '0' is displayed on screen, we know the on button has been pressed
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0 &&
      inputOneSelected == true //If the 'E' error is shown, no number input should be possible//If the 'E' error is shown, no number input should be possible
    ) {
      console.log("M+ pressed"); // need to add the new figure onto the current memory figure if already there... 2 variables. myMemorySum and myMemoryValue.
      myStage.memorySymbol_txt.alpha = 1; // Adds the 'M' to the screen so that we know a memory function has been used
      memoryPlusUsed = true; // variable to state that a memory function has been used
      if (inputOneSelected === true && inputTwoSelected === true) {
        console.log("Memory function used on input Two"); // If input one and input two have been selected, take memory value from inputTwo display.
        clickEquals(); // Function works out the sum first, then adds the answer to the myMemory variables
        myMemorySum = parseFloat(inputOne) + parseFloat(myMemoryValue); // memorySum is calculated by taking the number value of displayScreenTwo and adding it to the current memory value.
        myMemoryValue = myMemorySum;
      } else if (inputOneSelected === true && inputTwoSelected !== true) {
        console.log("Memory function used on input One");
        // If only inputOne has been used, take memory value from inputOne display.
        myMemorySum =
          parseFloat(myStage.displayScreen_txt.text) + myMemoryValue;
        myMemoryValue = parseFloat(myMemorySum);
      } else return;
    }
    console.log("myMemoryValue ========", myMemoryValue);
  }

  function memoryCreatorMinus() {
    // takes away value on screen from the memory. Same as memoryCreatorPlus, only takes value away from the myMemoryValue variable
    if (
      // Function only works if Power is ON
      myStage.displayScreenPlaceholder_txt.text === "0" && // If a '0' is displayed on screen, we know the on button has been pressed
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0 &&
      inputOneSelected == true //If the 'E' error is shown, no number input should be possible
    ) {
      console.log("M- pressed"); // need to add the new figure onto the current memory figure if already there... 2 variables. myMemorySum and myMemoryValue.
      myStage.memorySymbol_txt.alpha = 1;
      memoryPlusUsed = true; // variable to state that a memory function has been used
      if (inputOneSelected === true && inputTwoSelected === true) {
        console.log("Input Two used, Memory Value ===", myMemoryValue); // If input one and input two have been selected, take memory value from inputTwo display.
        clickEquals(); // Function works out the sum first, then adds the answer to the myMemory variables
        myMemorySum = myMemoryValue - parseFloat(inputOne);
        myMemoryValue = parseFloat(myMemorySum);
        console.log("Input Two used, Memory Value ===", myMemoryValue);
      } else if (inputOneSelected === true && inputTwoSelected !== true) {
        // If only inputOne has been used, take memory value from inputOne display.
        myMemorySum =
          myMemoryValue - parseFloat(myStage.displayScreen_txt.text);
        myMemoryValue = parseFloat(myMemorySum);
        console.log("Input one used, Memory Value =======", myMemoryValue);
      } else return;
    }
  }

  function memoryRecall() {
    if (
      // Function only works if Power is ON. Function places the myMemoryValue onto the screen.
      myStage.displayScreenPlaceholder_txt.text === "0" && // If a '0' is displayed on screen, we know the on button has been pressed
      myStage.errorSymbol_txt.alpha == 0 &&
      myStage.errorMemorySymbol_txt.alpha == 0 //If the 'E' error is shown, no number input should be possible
    ) {
      console.log("Memory Recall pressed");
      console.log("myMemoryValue ========", myMemoryValue);
      if (inputOneSelected === true && inputTwoSelected === true) {
        console.log("memory is recalled into inputTwo"); // If something in outputOne and outputTwo, Memory should be recalled into outputTwo.
        inputTwo = myMemoryValue; // InputTwo takes the myMemoryValue figure and displays it on the screen
        myStage.displayScreenTwo_txt.text = inputTwo;
        limitInputCharacters.call(myStage.displayScreenTwo_txt.text); // Used to esnure the memory figure doesnt display longer than allowed screen characters
        screenDisplayLength.call(myStage.displayScreenTwo_txt);
        screenDisplayAlphas(0, 1, 0, 0);
        inputTwoSelectedSpecial = true;
      } else if (inputOneSelected === true && inputTwoSelected == true) {
        console.log("memory is recalled into inputOne"); // If something in outputOne and not outputTwo, Memory should be recalled into outputOne.
        inputOne = myMemoryValue; // InputOne takes the myMemoryValue figure and displays it on the screen
        myStage.displayScreen_txt.text = inputOne;
        limitInputCharacters.call(myStage.displayScreen_txt.text); // Used to esnure the memory figure doesnt display longer than allowed screen characters
        screenDisplayLength.call(myStage.displayScreen_txt);
        screenDisplayAlphas(1, 0, 0, 0);
        console.log("myMemoryValue ========", myMemoryValue);
      } else {
        console.log("Memory Recalled after Clear"); // If nothing on screen e.g. after CLEAR, then memory is recalled to outputOne.
        screenDisplayAlphas(1, 0, 0, 0); // Ensures display screen is back to showing inputOne after a clear.
        inputOne = parseFloat(myMemoryValue);
        myStage.displayScreen_txt.text = inputOne;
        limitInputCharacters.call(myStage.displayScreen_txt.text); // Used to esnure the memory figure doesnt display longer than allowed screen characters
        screenDisplayLength.call(myStage.displayScreenTwo_txt);
        inputOneSelected = true;
      }
    }
    limitOutputCharacters();
    decimalPointReplace(); // Removes fake decimal if a real on is used in the answer. Prevents double decimals
  }

  ////////////////////////////////////////////////////////////////////// Constant Function //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function kSymbol(a) {
    karryActive = false;
    console.log("Konstant function reached"); // Function controls if the 'k' symbol is added to the screen or not depending on if any operator symbol has already been displayed.
    console.log("konstConstantFigure ===========", konstConstantFigure);
    switch (
      a.value // a = currentTarget.value, so it's taking the value of the operator selected based on the value statically set in the setup area at the top of the script
    ) {
      case "+":
        console.log("Plus pressed"); // if Plus operator symbol AND 'k' can be seen on screen then remove the 'k', else add it
        if (
          myStage.symbolMinus_mc.alpha == 1 ||
          myStage.symbolMultiply_mc.alpha == 1 ||
          myStage.symbolDivide_mc.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (
          myStage.symbolPlus_mc.alpha == 1 &&
          myStage.karrySymbol_txt.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (myStage.symbolPlus_mc.alpha == 1) {
          myStage.karrySymbol_txt.alpha = 1;
          karryActive = true;
        }
        break;
      case "-":
        console.log("minus pressed konsant"); // if Minus operator symbol AND 'k' can be seen on screen then remove the 'k', else add it
        if (
          myStage.symbolPlus_mc.alpha == 1 ||
          myStage.symbolMultiply_mc.alpha == 1 ||
          myStage.symbolDivide_mc.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (
          myStage.symbolMinus_mc.alpha == 1 &&
          myStage.karrySymbol_txt.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (myStage.symbolMinus_mc.alpha == 1) {
          myStage.karrySymbol_txt.alpha = 1;
          karryActive = true;
        }
        break;
      case "*":
        console.log("Mutiply pressed konstant"); // if Multiply operator symbol AND 'k' can be seen on screen then remove the 'k', else add it
        if (
          myStage.symbolMinus_mc.alpha == 1 ||
          myStage.symbolPlus_mc.alpha == 1 ||
          myStage.symbolDivide_mc.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (
          myStage.symbolMultiply_mc.alpha == 1 &&
          myStage.karrySymbol_txt.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (myStage.symbolMultiply_mc.alpha == 1) {
          myStage.karrySymbol_txt.alpha = 1;
          karryActive = true;
        }
        break;
      case "/":
        console.log("Divide pressed konstant"); // if Divide operator symbol AND 'k' can be seen on screen then remove the 'k', else add it
        if (
          myStage.symbolMinus_mc.alpha == 1 ||
          myStage.symbolMultiply_mc.alpha == 1 ||
          myStage.symbolPlus_mc.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (
          myStage.symbolDivide_mc.alpha == 1 &&
          myStage.karrySymbol_txt.alpha == 1
        ) {
          myStage.karrySymbol_txt.alpha = 0;
        } else if (myStage.symbolDivide_mc.alpha == 1) {
          myStage.karrySymbol_txt.alpha = 1;
          karryActive = true;
        }
        break;
    }
  }
}
