
export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  topic: 'Robotics' | 'AI' | 'HTML' | 'CSS' | 'JavaScript';
};

export const questions: Question[] = [
  // --- SET 1 (Robotics Basics) ---
  {
    id: 1,
    question: "What identifies the positive terminal of an LED?",
    options: ["The shorter lead", "The longer lead", "The black-colored lead", "The flat side of the casing"],
    answer: "The longer lead",
    topic: "Robotics"
  },
  {
    id: 2,
    question: "What is the typical operating voltage range for a standard LED?",
    options: ["0.5V to 1.5V", "1.8V to 3.3V", "5V to 10V", "12V to 24V"],
    answer: "1.8V to 3.3V",
    topic: "Robotics"
  },
  {
    id: 3,
    question: "How do you make an LED glow using a battery?",
    options: ["Connect both leads to the positive terminal", "Connect the positive lead to the negative terminal and vice versa", "Connect the positive lead to the positive terminal and the negative lead to the negative terminal", "It depends on the color of the LED"],
    answer: "Connect the positive lead to the positive terminal and the negative lead to the negative terminal",
    topic: "Robotics"
  },
  {
    id: 4,
    question: "What component is used to supply the correct voltage to an LED if the battery voltage is too high?",
    options: ["Capacitor", "Diode", "Transistor", "Resistor"],
    answer: "Resistor",
    topic: "Robotics"
  },
  {
    id: 5,
    question: "An RGB LED can produce which three primary colors?",
    options: ["Red, Yellow, Blue", "Red, Green, Blue", "Cyan, Magenta, Yellow", "Orange, Purple, Green"],
    answer: "Red, Green, Blue",
    topic: "Robotics"
  },
  {
    id: 6,
    question: "How many leads does a standard common cathode/anode RGB LED have?",
    options: ["2", "3", "4", "5"],
    answer: "4",
    topic: "Robotics"
  },
  {
    id: 7,
    question: "What is the main purpose of a breadboard?",
    options: ["To permanently solder components", "To test circuits temporarily without soldering", "To supply power to circuits", "To amplify signals"],
    answer: "To test circuits temporarily without soldering",
    topic: "Robotics"
  },
  {
    id: 8,
    question: "How are the central terminal strips of a breadboard typically connected?",
    options: ["Horizontally in long rows", "Vertically in short columns", "In diagonal pairs", "They are all separate"],
    answer: "Vertically in short columns",
    topic: "Robotics"
  },
  {
    id: 9,
    question: "What is a key advantage of a 'solderable board' (like a perfboard) over a breadboard?",
    options: ["It is cheaper", "It is easier to change components", "It creates permanent, more reliable connections", "It requires no tools"],
    answer: "It creates permanent, more reliable connections",
    topic: "Robotics"
  },
  {
    id: 10,
    question: "What primary energy conversion happens inside a battery?",
    options: ["Mechanical to Electrical", "Thermal to Electrical", "Chemical to Electrical", "Light to Electrical"],
    answer: "Chemical to Electrical",
    topic: "Robotics"
  },
  {
    id: 11,
    question: "Which type of battery is designed for single use and cannot be officially recharged?",
    options: ["Li-ion batteries", "Rechargeable batteries", "Primary (Non-Rechargeable) batteries", "All batteries can be recharged"],
    answer: "Primary (Non-Rechargeable) batteries",
    topic: "Robotics"
  },
  {
    id: 12,
    question: "What is the main function of a resistor in an electronic circuit?",
    options: ["To store electrical energy", "To amplify current", "To limit or reduce current flow", "To act as a one-way gate for current"],
    answer: "To limit or reduce current flow",
    topic: "Robotics"
  },
  {
    id: 13,
    question: "Do standard fixed resistors have polarity?",
    options: ["Yes, they must be connected in a specific direction", "No, they can be connected either way", "Only high-value resistors have polarity", "Only low-value resistors have polarity"],
    answer: "No, they can be connected either way",
    topic: "Robotics"
  },
  {
    id: 14,
    question: "A capacitor stores energy in the form of:",
    options: ["A magnetic field", "An electric field", "Chemical energy", "Kinetic energy"],
    answer: "An electric field",
    topic: "Robotics"
  },
  {
    id: 15,
    question: "What happens to the total capacitance when multiple capacitors are connected in series?",
    options: ["It increases", "It stays the same", "It decreases", "It becomes zero"],
    answer: "It decreases",
    topic: "Robotics"
  },
  {
    id: 16,
    question: "What is the simplest way to reverse the direction of a simple DC motor?",
    options: ["Increase the voltage", "Add a capacitor", "Reverse the polarity of the power supply", "Decrease the current"],
    answer: "Reverse the polarity of the power supply",
    topic: "Robotics"
  },
  {
    id: 17,
    question: "What is the key advantage of a servo motor over a standard DC motor?",
    options: ["It is much faster", "It consumes less power", "It allows for precise control of angular position", "It is smaller in size"],
    answer: "It allows for precise control of angular position",
    topic: "Robotics"
  },
  {
    id: 18,
    question: "A DC Geared motor (like a BO motor) is designed to provide:",
    options: ["Higher speed and lower torque", "Lower speed and higher torque", "Only high speed", "Only high torque"],
    answer: "Lower speed and higher torque",
    topic: "Robotics"
  },
  {
    id: 19,
    question: "A standard diode allows current to flow in:",
    options: ["Two directions", "One direction only", "Any direction", "No direction"],
    answer: "One direction only",
    topic: "Robotics"
  },
  {
    id: 20,
    question: "What are the two terminals of a standard diode called?",
    options: ["Positive and Negative", "Anode and Cathode", "Collector and Emitter", "Source and Drain"],
    answer: "Anode and Cathode",
    topic: "Robotics"
  },
  {
    id: 21,
    question: "A transistor is a semiconductor device that can be used as both a switch and an:",
    options: ["Amplifier", "Resistor", "Capacitor", "Inductor"],
    answer: "Amplifier",
    topic: "Robotics"
  },
  {
    id: 22,
    question: "Which terminal of a BJT transistor is used to control the flow of current between the other two?",
    options: ["Collector", "Emitter", "Base", "Gate"],
    answer: "Base",
    topic: "Robotics"
  },
  {
    id: 23,
    question: "What is the 'brain' of an Arduino board?",
    options: ["USB Port", "Microcontroller", "Voltage Regulator", "Power Jack"],
    answer: "Microcontroller",
    topic: "Robotics"
  },
  {
    id: 24,
    question: "Which pins on an Arduino board are used to read a range of values, typically from a sensor?",
    options: ["Digital pins", "Analog pins", "Power pins", "GND pins"],
    answer: "Analog pins",
    topic: "Robotics"
  },
  {
    id: 25,
    question: "Which Arduino board is most commonly recommended for beginners?",
    options: ["Arduino Nano", "Arduino Mega", "Arduino UNO", "Arduino LilyPad"],
    answer: "Arduino UNO",
    topic: "Robotics"
  },
  {
    id: 26,
    question: "What is the primary function of hook-up wires in electronics?",
    options: ["To resist current flow", "To store charge", "To connect components in a circuit", "To amplify signals"],
    answer: "To connect components in a circuit",
    topic: "Robotics"
  },
  {
    id: 27,
    question: "What is a key advantage of jumper cables for breadboarding?",
    options: ["They can handle more current", "They are better for permanent circuits", "They have rigid pins for easy insertion", "They are always red and black"],
    answer: "They have rigid pins for easy insertion",
    topic: "Robotics"
  },
  {
    id: 28,
    question: "A berg strip is another name for a:",
    options: ["Jumper Cable", "Pin Header", "Alligator Clip", "DC Jack"],
    answer: "Pin Header",
    topic: "Robotics"
  },
  {
    id: 29,
    question: "What is a 'crocodile connector' also known as?",
    options: ["Alligator clip", "DC Jack", "Berg Strip", "Jumper cable"],
    answer: "Alligator clip",
    topic: "Robotics"
  },
  {
    id: 30,
    question: "The material 'phenolic,' used in some solderable boards, is obtained from:",
    options: ["Petroleum products", "Synthetic polymers", "Plant-based resins", "Recycled metals"],
    answer: "Plant-based resins",
    topic: "Robotics"
  },

  // --- SET 2 (HTML Basics) ---
  {
    id: 31,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High-level Text Machine Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language",
    topic: "HTML"
  },
  {
    id: 32,
    question: "Which element is used to define the main content of an HTML document?",
    options: ["<head>", "<body>", "<content>", "<main>"],
    answer: "<body>",
    topic: "HTML"
  },
  {
    id: 33,
    question: "What is the correct HTML for creating the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>",
    topic: "HTML"
  },
  {
    id: 34,
    question: "Which tag is used to define a paragraph?",
    options: ["<p>", "<paragraph>", "<para>", "<pg>"],
    answer: "<p>",
    topic: "HTML"
  },
  {
    id: 35,
    question: "What is the correct HTML tag for inserting a line break?",
    options: ["<break>", "<lb>", "<br>", "<newline>"],
    answer: "<br>",
    topic: "HTML"
  },
  {
    id: 36,
    question: "Which character is used to indicate an end tag?",
    options: ["<", "^", "/", "*"],
    answer: "/",
    topic: "HTML"
  },
  {
    id: 37,
    question: "How do you create a hyperlink in HTML?",
    options: ["<a url='...'>", "<link href='...'>", "<a href='...'>", "<hyperlink>...<hyperlink>"],
    answer: "<a href='...'>",
    topic: "HTML"
  },
  {
    id: 38,
    question: "Which attribute is used to provide the link's destination URL?",
    options: ["src", "href", "link", "url"],
    answer: "href",
    topic: "HTML"
  },
  {
    id: 39,
    question: "How do you add an image to a webpage?",
    options: ["<image src='...'>", "<img source='...'>", "<img src='...'>", "<picture>...<picture>"],
    answer: "<img src='...'>",
    topic: "HTML"
  },
  {
    id: 40,
    question: "Which attribute is used to provide alternate text for an image?",
    options: ["alt", "text", "title", "description"],
    answer: "alt",
    topic: "HTML"
  },
  {
    id: 41,
    question: "Which tag creates an unordered (bulleted) list?",
    options: ["<ol>", "<list>", "<ul>", "<li>"],
    answer: "<ul>",
    topic: "HTML"
  },
  {
    id: 42,
    question: "Which tag creates a numbered list?",
    options: ["<ul>", "<num>", "<ol>", "<list>"],
    answer: "<ol>",
    topic: "HTML"
  },
  {
    id: 43,
    question: "Which tag is used to define a list item in both ordered and unordered lists?",
    options: ["<item>", "<dt>", "<li>", "<dd>"],
    answer: "<li>",
    topic: "HTML"
  },
  {
    id: 44,
    question: "How do you create a simple HTML table?",
    options: ["<table><row><col>...</col></row></table>", "<table><tr><td>...</td></tr></table>", "<table><head>...</head><body>...</body></table>", "<table><line><item>...</item></line></table>"],
    answer: "<table><tr><td>...</td></tr></table>",
    topic: "HTML"
  },
  {
    id: 45,
    question: "What does the <tr> tag define in a table?",
    options: ["Table Cell", "Table Header", "Table Row", "Table Data"],
    answer: "Table Row",
    topic: "HTML"
  },
  {
    id: 46,
    question: "What does the <td> tag define in a table?",
    options: ["Table Data (a cell)", "Table Division", "Table Date", "Table Detail"],
    answer: "Table Data (a cell)",
    topic: "HTML"
  },
  {
    id: 47,
    question: "How do you add a comment in an HTML file?",
    options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "' This is a comment"],
    answer: "<!-- This is a comment -->",
    topic: "HTML"
  },
  {
    id: 48,
    question: "Which element contains meta-information about the HTML document?",
    options: ["<body>", "<html>", "<title>", "<head>"],
    answer: "<head>",
    topic: "HTML"
  },
  {
    id: 49,
    question: "Which tag is used to make text bold?",
    options: ["<bold>", "<b>", "<important>", "<strong>"],
    answer: "<strong>",
    topic: "HTML"
  },
  {
    id: 50,
    question: "Which tag is used to make text italic?",
    options: ["<i>", "<italic>", "<em>", "<emphasize>"],
    answer: "<em>",
    topic: "HTML"
  },
  {
    id: 51,
    question: "What is the purpose of the <!DOCTYPE html> declaration?",
    options: ["It creates a new page", "It defines the document type to be HTML5", "It links to a CSS file", "It is an old, optional tag"],
    answer: "It defines the document type to be HTML5",
    topic: "HTML"
  },
  {
    id: 52,
    question: "Which input type is used for a checkbox?",
    options: ["<input type='check'>", "<input type='checkbox'>", "<checkbox>", "<check>"],
    answer: "<input type='checkbox'>",
    topic: "HTML"
  },
  {
    id: 53,
    question: "Which element is used to create a button?",
    options: ["<button>", "<input type='button'>", "<btn>", "Both A and B"],
    answer: "Both A and B",
    topic: "HTML"
  },
  {
    id: 54,
    question: "Which tag is used to create a dropdown list?",
    options: ["<list>", "<select>", "<dropdown>", "<input type='list'>"],
    answer: "<select>",
    topic: "HTML"
  },
  {
    id: 55,
    question: "What is the <div> tag used for?",
    options: ["To create a division or a section", "To display text", "To create a hyperlink", "To add an image"],
    answer: "To create a division or a section",
    topic: "HTML"
  },
  {
    id: 56,
    question: "What is a <span> tag typically used for?",
    options: ["Spanning multiple columns in a table", "Adding a large block of content", "Grouping and styling small inline elements", "Adding spacing between elements"],
    answer: "Grouping and styling small inline elements",
    topic: "HTML"
  },
  {
    id: 57,
    question: "What does the <th> tag define in a table?",
    options: ["A table row", "A thick-bordered cell", "A table header cell", "A theme for the table"],
    answer: "A table header cell",
    topic: "HTML"
  },
  {
    id: 58,
    question: "What element is used to embed a video?",
    options: ["<media>", "<movie>", "<video>", "<vid>"],
    answer: "<video>",
    topic: "HTML"
  },
  {
    id: 59,
    question: "Which attribute controls the width of an element?",
    options: ["size", "width", "length", "w"],
    answer: "width",
    topic: "HTML"
  },
  {
    id: 60,
    question: "The root element of any HTML page is:",
    options: ["<body>", "<html>", "<!DOCTYPE html>", "<head>"],
    answer: "<html>",
    topic: "HTML"
  },

  // --- SET 3 (CSS Basics) ---
  {
    id: 61,
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets",
    topic: "CSS"
  },
  {
    id: 62,
    question: "Where in an HTML document is the correct place to refer to an external style sheet?",
    options: ["In the <body> section", "At the end of the document", "In the <head> section", "After the <html> tag"],
    answer: "In the <head> section",
    topic: "CSS"
  },
  {
    id: 63,
    question: "Which HTML tag is used to link to an external CSS file?",
    options: ["<style src='...'>", "<stylesheet>...</stylesheet>", "<link rel='stylesheet' href='...'>", "<css>...</css>"],
    answer: "<link rel='stylesheet' href='...'>",
    topic: "CSS"
  },
  {
    id: 64,
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "styles", "font"],
    answer: "style",
    topic: "CSS"
  },
  {
    id: 65,
    question: "Which is the correct CSS syntax?",
    options: ["body:color=black;", "{body;color:black;}", "body {color: black;}", "{body:color=black;}"],
    answer: "body {color: black;}",
    topic: "CSS"
  },
  {
    id: 66,
    question: "How do you insert a comment in a CSS file?",
    options: ["// this is a comment", "/* this is a comment */", "' this is a comment", "<!-- this is a comment -->"],
    answer: "/* this is a comment */",
    topic: "CSS"
  },
  {
    id: 67,
    question: "Which CSS property is used to change the background color of an element?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color",
    topic: "CSS"
  },
  {
    id: 68,
    question: "How do you select an element with id 'demo'?",
    options: [".demo", "#demo", "demo", "*demo"],
    answer: "#demo",
    topic: "CSS"
  },
  {
    id: 69,
    question: "How do you select all elements with class name 'test'?",
    options: ["#test", "test", ".test", "*test"],
    answer: ".test",
    topic: "CSS"
  },
  {
    id: 70,
    question: "How do you select all <p> elements inside a <div> element?",
    options: ["div + p", "div p", "div.p", "div, p"],
    answer: "div p",
    topic: "CSS"
  },
  {
    id: 71,
    question: "Which property is used to change the font of an element?",
    options: ["font-style", "font-family", "font-weight", "font-variant"],
    answer: "font-family",
    topic: "CSS"
  },
  {
    id: 72,
    question: "How do you make text bold in CSS?",
    options: ["font: bold;", "font-weight: bold;", "style: bold;", "text-weight: bold;"],
    answer: "font-weight: bold;",
    topic: "CSS"
  },
  {
    id: 73,
    question: "How do you make text italic?",
    options: ["font-style: italic;", "text-style: italic;", "font: italic;", "style: italic;"],
    answer: "font-style: italic;",
    topic: "CSS"
  },
  {
    id: 74,
    question: "Which property controls the size of the text?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
    topic: "CSS"
  },
  {
    id: 75,
    question: "How do you add a border to an element?",
    options: ["border-style: 1px solid black;", "border: 1px solid black;", "border-width: 1px;", "element-border: 1px solid black;"],
    answer: "border: 1px solid black;",
    topic: "CSS"
  },
  {
    id: 76,
    question: "Which property is used to change the left margin of an element?",
    options: ["padding-left", "margin-left", "indent-left", "spacing-left"],
    answer: "margin-left",
    topic: "CSS"
  },
  {
    id: 77,
    question: "What is the difference between padding and margin?",
    options: ["Padding is space outside the border, margin is inside.", "Padding is space inside the border, margin is outside.", "They are the same thing.", "Margin adds a border, padding adds space."],
    answer: "Padding is space inside the border, margin is outside.",
    topic: "CSS"
  },
  {
    id: 78,
    question: "Which property is used to center-align text?",
    options: ["align: center;", "text-align: center;", "position: center;", "align-text: center;"],
    answer: "text-align: center;",
    topic: "CSS"
  },
  {
    id: 79,
    question: "How do you make a list that lists its items with squares?",
    options: ["list-style-type: square;", "list-type: square;", "list: square;", "list-style: square;"],
    answer: "list-style-type: square;",
    topic: "CSS"
  },
  {
    id: 80,
    question: "Which property is used to control an element's visibility?",
    options: ["display", "visible", "visibility", "hidden"],
    answer: "visibility",
    topic: "CSS"
  },
  {
    id: 81,
    question: "How can you select an input field with type='text'?",
    options: ["input[type='text']", "input.text", "input:text", "input text"],
    answer: "input[type='text']",
    topic: "CSS"
  },
  {
    id: 82,
    question: "What is the default value of the `position` property?",
    options: ["relative", "fixed", "absolute", "static"],
    answer: "static",
    topic: "CSS"
  },
  {
    id: 83,
    question: "How do you change the color of a hyperlink when the mouse is over it?",
    options: ["a:hover { color: red; }", "a:active { color: red; }", "a:visited { color: red; }", "a:link { color: red; }"],
    answer: "a:hover { color: red; }",
    topic: "CSS"
  },
  {
    id: 84,
    question: "Which unit is relative to the font-size of the element (2em means 2 times the size of the current font)?",
    options: ["px", "cm", "em", "%"],
    answer: "em",
    topic: "CSS"
  },
  {
    id: 85,
    question: "What does the 'float' property do?",
    options: ["Makes an element float on top of others", "Lets an element be pushed to the left or right, with text wrapping around it", "Changes the element's position", "Stretches an element to the full width"],
    answer: "Lets an element be pushed to the left or right, with text wrapping around it",
    topic: "CSS"
  },
  {
    id: 86,
    question: "Which property is used to change the space between characters?",
    options: ["letter-spacing", "character-spacing", "text-spacing", "font-spacing"],
    answer: "letter-spacing",
    topic: "CSS"
  },
  {
    id: 87,
    question: "How do you specify a background image for a page?",
    options: ["body { background-image: url('image.jpg'); }", "body { image: url('image.jpg'); }", "body { background: 'image.jpg'; }", "body { bg-image: url('image.jpg'); }"],
    answer: "body { background-image: url('image.jpg'); }",
    topic: "CSS"
  },
  {
    id: 88,
    question: "How do you apply a style to all elements on a page?",
    options: [".all { ... }", "* { ... }", "body { ... }", "page { ... }"],
    answer: "* { ... }",
    topic: "CSS"
  },
  {
    id: 89,
    question: "What is the 'z-index' property used for?",
    options: ["To set the zoom level", "To set the stacking order of positioned elements", "To set the text indent", "To set the element's width"],
    answer: "To set the stacking order of positioned elements",
    topic: "CSS"
  },
  {
    id: 90,
    question: "Which property is used to create rounded corners?",
    options: ["border-corner", "corner-radius", "border-radius", "border-style"],
    answer: "border-radius",
    topic: "CSS"
  },

  // --- SET 4 (Robotics Intermediate) ---
  {
    id: 91,
    question: "In an RGB LED, how is the color white typically produced?",
    options: ["By turning only the blue lead on", "By turning all three (Red, Green, Blue) leads on", "By rapidly switching between red, green, and blue", "It is not possible to produce white"],
    answer: "By turning all three (Red, Green, Blue) leads on",
    topic: "Robotics"
  },
  {
    id: 92,
    question: "What is the purpose of the power rails on a breadboard?",
    options: ["To connect components in series", "To provide a common power and ground line for the circuit", "To separate different parts of the circuit", "They are not connected to anything"],
    answer: "To provide a common power and ground line for the circuit",
    topic: "Robotics"
  },
  {
    id: 93,
    question: "What does 'PCB' stand for in electronics?",
    options: ["Printed Circuit Board", "Permanent Component Board", "Power Control Block", "Programmable Circuit Block"],
    answer: "Printed Circuit Board",
    topic: "Robotics"
  },
  {
    id: 94,
    question: "What does it mean if a battery is 'rechargeable'?",
    options: ["It lasts forever", "Its chemical reactions can be reversed by applying an external current", "It is made of lithium", "It has a higher voltage"],
    answer: "Its chemical reactions can be reversed by applying an external current",
    topic: "Robotics"
  },
  {
    id: 95,
    question: "If a resistor's color bands are Brown, Black, Red, Gold, what is its resistance value?",
    options: ["100 Ω +/- 5%", "1,000 Ω (1kΩ) +/- 5%", "10 Ω +/- 10%", "200 Ω +/- 5%"],
    answer: "1,000 Ω (1kΩ) +/- 5%",
    topic: "Robotics"
  },
  {
    id: 96,
    question: "What is the unit of capacitance?",
    options: ["Ohm", "Henry", "Volt", "Farad"],
    answer: "Farad",
    topic: "Robotics"
  },
  {
    id: 97,
    question: "How is a servo motor controlled?",
    options: ["By varying the DC voltage", "By sending a series of pulses (PWM)", "By reversing the polarity", "By changing the current"],
    answer: "By sending a series of pulses (PWM)",
    topic: "Robotics"
  },
  {
    id: 98,
    question: "The forward-biased direction for a diode is when current flows from:",
    options: ["Cathode to Anode", "Anode to Cathode", "Base to Emitter", "Source to Drain"],
    answer: "Anode to Cathode",
    topic: "Robotics"
  },
  {
    id: 99,
    question: "What are the three terminals of a Bipolar Junction Transistor (BJT)?",
    options: ["Source, Drain, Gate", "Anode, Cathode, Gate", "Emitter, Base, Collector", "Pin 1, Pin 2, Pin 3"],
    answer: "Emitter, Base, Collector",
    topic: "Robotics"
  },
  {
    id: 100,
    question: "What does 'PWM' stand for in the context of Arduino?",
    options: ["Power Width Management", "Pulse Width Modulation", "Primary Wave Mode", "Programmatic Wave Mover"],
    answer: "Pulse Width Modulation",
    topic: "Robotics"
  },
  {
    id: 101,
    question: "What is the function of the `setup()` block in an Arduino sketch?",
    options: ["It runs repeatedly as long as the board has power", "It is where you declare variables", "It runs only once when the Arduino is powered on or reset", "It is optional and can be deleted"],
    answer: "It runs only once when the Arduino is powered on or reset",
    topic: "Robotics"
  },
  {
    id: 102,
    question: "What is the function of the `loop()` block in an Arduino sketch?",
    options: ["It runs repeatedly as long as the board has power", "It runs only once", "It is for setting up pins", "It defines custom functions"],
    answer: "It runs repeatedly as long as the board has power",
    topic: "Robotics"
  },
  {
    id: 103,
    question: "Which type of wire is solid and best for use with breadboards?",
    options: ["Stranded wire", "Solid core wire", "Coaxial wire", "Ribbon wire"],
    answer: "Solid core wire",
    topic: "Robotics"
  },
  {
    id: 104,
    question: "A male pin header has _____ that stick out.",
    options: ["holes", "sockets", "pins", "clips"],
    answer: "pins",
    topic: "Robotics"
  },
  {
    id: 105,
    question: "An alligator clip is ideal for:",
    options: ["Permanent connections", "High-frequency signals", "Quickly making temporary electrical connections", "Plugging into a breadboard"],
    answer: "Quickly making temporary electrical connections",
    topic: "Robotics"
  },
  {
    id: 106,
    question: "What does the `pinMode()` function do in Arduino?",
    options: ["It reads the value from a pin", "It writes a value to a pin", "It configures a specific pin to behave as an input or an output", "It changes the pin's number"],
    answer: "It configures a specific pin to behave as an input or an output",
    topic: "Robotics"
  },
  {
    id: 107,
    question: "What does `digitalWrite(13, HIGH);` do?",
    options: ["Reads a high signal from pin 13", "Turns pin 13 off", "Sends 5V to pin 13", "Sets pin 13 to be an input"],
    answer: "Sends 5V to pin 13",
    topic: "Robotics"
  },
  {
    id: 108,
    question: "What does `analogRead(A0);` do?",
    options: ["Reads a digital value (0 or 1) from pin A0", "Sends a PWM signal to pin A0", "Reads an analog value (0-1023) from pin A0", "Configures pin A0 as an output"],
    answer: "Reads an analog value (0-1023) from pin A0",
    topic: "Robotics"
  },
  {
    id: 109,
    question: "What is a 'shield' in the Arduino ecosystem?",
    options: ["A protective case for the Arduino", "A board that can be plugged on top of an Arduino to add extra functionality", "The plastic base of the Arduino", "A type of sensor"],
    answer: "A board that can be plugged on top of an Arduino to add extra functionality",
    topic: "Robotics"
  },
  {
    id: 110,
    question: "Which of these is a type of sensor that detects light?",
    options: ["Thermistor", "Potentiometer", "Photoresistor (LDR)", "PIR Sensor"],
    answer: "Photoresistor (LDR)",
    topic: "Robotics"
  },
  {
    id: 111,
    question: "A potentiometer is a type of:",
    options: ["Variable resistor", "Fixed resistor", "Capacitor", "Temperature sensor"],
    answer: "Variable resistor",
    topic: "Robotics"
  },
  {
    id: 112,
    question: "What is the GND pin on an Arduino used for?",
    options: ["To supply 5V power", "To provide the ground reference (0 volts)", "To receive analog signals", "To upload code"],
    answer: "To provide the ground reference (0 volts)",
    topic: "Robotics"
  },
  {
    id: 113,
    question: "Which part of the Arduino IDE is used to write your code?",
    options: ["The Serial Monitor", "The Text Editor", "The Toolbar", "The Message Area"],
    answer: "The Text Editor",
    topic: "Robotics"
  },
  {
    id: 114,
    question: "What does the 'Verify' button in the Arduino IDE do?",
    options: ["It uploads the code to the board", "It saves the code", "It compiles the code and checks for errors", "It opens the Serial Monitor"],
    answer: "It compiles the code and checks for errors",
    topic: "Robotics"
  },
  {
    id: 115,
    question: "Which part of the Arduino is responsible for providing a steady, consistent voltage?",
    options: ["The microcontroller", "The USB port", "The voltage regulator", "The reset button"],
    answer: "The voltage regulator",
    topic: "Robotics"
  },
  {
    id: 116,
    question: "What is a 'sketch' in Arduino terminology?",
    options: ["A hardware diagram", "A program written for the Arduino", "A type of shield", "A comment in the code"],
    answer: "A program written for the Arduino",
    topic: "Robotics"
  },
  {
    id: 117,
    question: "A BO Motor is a type of:",
    options: ["Servo Motor", "Stepper Motor", "DC Geared Motor", "AC Motor"],
    answer: "DC Geared Motor",
    topic: "Robotics"
  },
  {
    id: 118,
    question: "What is the purpose of a motor driver like the L293D?",
    options: ["To supply power to the Arduino board", "To allow a low-current signal from the Arduino to control a high-current motor", "To make the motor run faster", "To store code for the motor"],
    answer: "To allow a low-current signal from the Arduino to control a high-current motor",
    topic: "Robotics"
  },
  {
    id: 119,
    question: "What kind of signal does a standard PIR sensor output when it detects motion?",
    options: ["A variable analog signal", "A digital HIGH or LOW signal", "A PWM signal", "A series of numbers"],
    answer: "A digital HIGH or LOW signal",
    topic: "Robotics"
  },
  {
    id: 120,
    question: "An ultrasonic sensor measures distance using:",
    options: ["Light waves", "Sound waves", "Magnetic fields", "Temperature"],
    answer: "Sound waves",
    topic: "Robotics"
  },

  // --- SET 5 (HTML & CSS Intermediate) ---
  {
    id: 121,
    question: "What is the purpose of the 'class' attribute in HTML?",
    options: ["To specify a unique ID for an element", "To specify one or more class names for an element, used for styling with CSS", "To define the HTML class version", "To add a comment"],
    answer: "To specify one or more class names for an element, used for styling with CSS",
    topic: "HTML"
  },
  {
    id: 122,
    question: "What is the purpose of the 'id' attribute in HTML?",
    options: ["To specify a unique ID for an element", "To specify a class for an element", "To identify the user", "To add an image"],
    answer: "To specify a unique ID for an element",
    topic: "HTML"
  },
  {
    id: 123,
    question: "Which of the following is a 'block-level' element?",
    options: ["<span>", "<a>", "<img>", "<div>"],
    answer: "<div>",
    topic: "HTML"
  },
  {
    id: 124,
    question: "Which of the following is an 'inline' element?",
    options: ["<p>", "<h1>", "<span>", "<div>"],
    answer: "<span>",
    topic: "HTML"
  },
  {
    id: 125,
    question: "How do you create a form in HTML?",
    options: ["<form>...</form>", "<input type='form'>", "<form-data>...</form-data>", "<fieldset>...</fieldset>"],
    answer: "<form>...</form>",
    topic: "HTML"
  },
  {
    id: 126,
    question: "Which input type is used for submitting a form?",
    options: ["<input type='button'>", "<input type='submit'>", "<input type='send'>", "<button>Submit</button>"],
    answer: "<input type='submit'>",
    topic: "HTML"
  },
  {
    id: 127,
    question: "In CSS, what is the 'box model'?",
    options: ["A model for creating 3D boxes", "A box that wraps around every HTML element, consisting of: content, padding, border, margin", "A type of layout using boxes", "A JavaScript library for 3D graphics"],
    answer: "A box that wraps around every HTML element, consisting of: content, padding, border, margin",
    topic: "CSS"
  },
  {
    id: 128,
    question: "What is the difference between a class selector and an ID selector?",
    options: ["A class can be used on multiple elements, while an ID must be unique", "An ID can be used on multiple elements, while a class must be unique", "They are the same", "Classes are for JS, IDs are for CSS"],
    answer: "A class can be used on multiple elements, while an ID must be unique",
    topic: "CSS"
  },
  {
    id: 129,
    question: "What does the 'display: none;' property do?",
    options: ["Makes the element transparent", "Hides the element completely, and it does not take up any space", "Hides the element, but it still takes up space", "Changes the element's color to the background color"],
    answer: "Hides the element completely, and it does not take up any space",
    topic: "CSS"
  },
  {
    id: 130,
    question: "What does 'visibility: hidden;' do?",
    options: ["Hides the element completely, and it does not take up any space", "Makes the element transparent", "Hides the element, but it still takes up space", "Deletes the element from the page"],
    answer: "Hides the element, but it still takes up space",
    topic: "CSS"
  },
  {
    id: 131,
    question: "Which CSS property allows you to stack elements on top of each other?",
    options: ["position", "display", "float", "z-index"],
    answer: "z-index",
    topic: "CSS"
  },
  {
    id: 132,
    question: "Which property is used to create space between the element's border and its content?",
    options: ["margin", "padding", "spacing", "border-spacing"],
    answer: "padding",
    topic: "CSS"
  },
  {
    id: 133,
    question: "Which property is used to create space around an element, outside its border?",
    options: ["margin", "padding", "spacing", "outline"],
    answer: "margin",
    topic: "CSS"
  },
  {
    id: 134,
    question: "What is a pseudo-class in CSS?",
    options: ["A fake class that doesn't work", "A keyword added to a selector that specifies a special state of the selected element(s)", "A class with a '#' prefix", "A class that can only be used once"],
    answer: "A keyword added to a selector that specifies a special state of the selected element(s)",
    topic: "CSS"
  },
  {
    id: 135,
    question: "Which of these is a pseudo-class?",
    options: ["::before", ":hover", ".important", "#main"],
    answer: ":hover",
    topic: "CSS"
  },
  {
    id: 136,
    question: "What is a pseudo-element in CSS?",
    options: ["An element that doesn't really exist", "A keyword added to a selector that lets you style a specific part of the selected element(s)", "A fake element", "An element with a '*' prefix"],
    answer: "A keyword added to a selector that lets you style a specific part of the selected element(s)",
    topic: "CSS"
  },
  {
    id: 137,
    question: "Which of these is a pseudo-element?",
    options: ["::first-line", ":active", ":focus", ":last-child"],
    answer: "::first-line",
    topic: "CSS"
  },
  {
    id: 138,
    question: "What is the 'flexbox' layout model used for?",
    options: ["Creating flexible and efficient one-dimensional layouts", "Animating elements", "Drawing shapes", "Styling text only"],
    answer: "Creating flexible and efficient one-dimensional layouts",
    topic: "CSS"
  },
  {
    id: 139,
    question: "What is the 'grid' layout model used for?",
    options: ["Creating one-dimensional layouts only", "Creating two-dimensional (rows and columns) layouts", "Styling table borders", "Making text responsive"],
    answer: "Creating two-dimensional (rows and columns) layouts",
    topic: "CSS"
  },
  {
    id: 140,
    question: "Which tag defines the title of an HTML document, shown in the browser's title bar or tab?",
    options: ["<meta>", "<title>", "<header>", "<h1>"],
    answer: "<title>",
    topic: "HTML"
  },
  {
    id: 141,
    question: "How do you group different CSS declarations for one selector?",
    options: ["With parentheses ()", "With square brackets []", "With curly braces {}", "With commas ,"],
    answer: "With curly braces {}",
    topic: "CSS"
  },
  {
    id: 142,
    question: "The `target='_blank'` attribute on a link does what?",
    options: ["Opens the link in the same window", "Opens the link in a new, unnamed window or tab", "Opens the link in the parent frame", "Doesn't open the link"],
    answer: "Opens the link in a new, unnamed window or tab",
    topic: "HTML"
  },
  {
    id: 143,
    question: "Which HTML5 element is meant for navigation links?",
    options: ["<navigate>", "<navlinks>", "<nav>", "<navigation>"],
    answer: "<nav>",
    topic: "HTML"
  },
  {
    id: 144,
    question: "Which HTML5 element is meant for content that is separate from the main content, like a blog post or news article?",
    options: ["<section>", "<article>", "<aside>", "<details>"],
    answer: "<article>",
    topic: "HTML"
  },
  {
    id: 145,
    question: "Which CSS unit is relative to the viewport's width?",
    options: ["%", "em", "vw", "rem"],
    answer: "vw",
    topic: "CSS"
  },
  {
    id: 146,
    question: "What does 'cascading' in CSS refer to?",
    options: ["Styles falling down the page", "A set of rules that determines which styles apply if multiple rules conflict", "A type of animation", "A way to write comments"],
    answer: "A set of rules that determines which styles apply if multiple rules conflict",
    topic: "CSS"
  },
  {
    id: 147,
    question: "Which property can be used to make text all uppercase?",
    options: ["text-transform: uppercase;", "text-style: uppercase;", "font-variant: uppercase;", "case: upper;"],
    answer: "text-transform: uppercase;",
    topic: "CSS"
  },
  {
    id: 148,
    question: "How do you select an element that is the direct child of another element?",
    options: ["parent child", "parent > child", "parent + child", "parent ~ child"],
    answer: "parent > child",
    topic: "CSS"
  },
  {
    id: 149,
    question: "What is the purpose of a 'reset' stylesheet?",
    options: ["To reset the entire page content", "To remove all default browser styling", "To set all colors to black", "To reset animations"],
    answer: "To remove all default browser styling",
    topic: "CSS"
  },
  {
    id: 150,
    question: "Which input type is best for entering a password?",
    options: ["<input type='text'>", "<input type='hidden'>", "<input type='password'>", "<input type='secure'>"],
    answer: "<input type='password'>",
    topic: "HTML"
  },
  
  // --- SET 6 (Robotics + HTML) ---
  {
    id: 151,
    question: "The ATmega328P is an example of a:",
    options: ["Sensor", "Microcontroller", "Motor", "Power Supply"],
    answer: "Microcontroller",
    topic: "Robotics"
  },
  {
    id: 152,
    question: "Which HTML tag would you use to display the largest title on a project documentation page?",
    options: ["<h6>", "<p>", "<h1>", "<td>"],
    answer: "<h1>",
    topic: "HTML"
  },
  {
    id: 153,
    question: "To prevent an LED from burning out when connected to a 9V battery, you would use a:",
    options: ["Capacitor", "Diode", "Resistor", "Transistor"],
    answer: "Resistor",
    topic: "Robotics"
  },
  {
    id: 154,
    question: "Which CSS property would you use to change the text color of your <h1> title to blue?",
    options: ["background-color: blue;", "text-color: blue;", "font-color: blue;", "color: blue;"],
    answer: "color: blue;",
    topic: "CSS"
  },
  {
    id: 155,
    question: "A breadboard is used for:",
    options: ["Final, permanent projects", "Prototyping and testing circuits", "Soldering practice", "Powering high-voltage devices"],
    answer: "Prototyping and testing circuits",
    topic: "Robotics"
  },
  {
    id: 156,
    question: "To create a bulleted list of project materials in HTML, you would start with which tag?",
    options: ["<ol>", "<ul>", "<dl>", "<dir>"],
    answer: "<ul>",
    topic: "HTML"
  },
  {
    id: 157,
    question: "A servo motor is ideal for tasks that require:",
    options: ["Continuous high-speed rotation", "Precise positional control, like a robot arm", "Generating electricity", "Storing charge"],
    answer: "Precise positional control, like a robot arm",
    topic: "Robotics"
  },
  {
    id: 158,
    question: "How would you select all paragraphs with the class 'description' in CSS?",
    options: ["#description", "p.description", ".description", "p#description"],
    answer: ".description",
    topic: "CSS"
  },
  {
    id: 159,
    question: "The common ground connection on an Arduino is labeled:",
    options: ["5V", "VIN", "GND", "RESET"],
    answer: "GND",
    topic: "Robotics"
  },
  {
    id: 160,
    question: "Which HTML attribute would you use to show 'Arduino Board' when a user hovers over an image of one?",
    options: ["alt='Arduino Board'", "title='Arduino Board'", "description='Arduino Board'", "hover='Arduino Board'"],
    answer: "title='Arduino Board'",
    topic: "HTML"
  },
  {
    id: 161,
    question: "A BO motor is a type of:",
    options: ["DC Geared Motor", "Servo Motor", "Stepper Motor", "AC Motor"],
    answer: "DC Geared Motor",
    topic: "Robotics"
  },
  {
    id: 162,
    question: "What CSS property adds space between the content and the border of a box?",
    options: ["margin", "padding", "outline", "spacing"],
    answer: "padding",
    topic: "CSS"
  },
  {
    id: 163,
    question: "What is the function of an L293D motor driver IC?",
    options: ["To power the Arduino", "To allow the Arduino to control the direction and speed of motors", "To act as a sensor", "To store the program code"],
    answer: "To allow the Arduino to control the direction and speed of motors",
    topic: "Robotics"
  },
  {
    id: 164,
    question: "Which HTML element is a generic container for grouping other elements?",
    options: ["<group>", "<section>", "<span>", "<div>"],
    answer: "<div>",
    topic: "HTML"
  },
  {
    id: 165,
    question: "What does `pinMode(5, OUTPUT);` do in an Arduino sketch?",
    options: ["Reads a value from pin 5", "Sets pin 5 to be an output", "Sends a HIGH signal to pin 5", "Turns off pin 5"],
    answer: "Sets pin 5 to be an output",
    topic: "Robotics"
  },
  {
    id: 166,
    question: "What is the correct way to add a background color to a webpage using CSS?",
    options: ["<body bgcolor='yellow'>", "body { background-color: yellow; }", "document.bgcolor='yellow'", "body { color: yellow; }"],
    answer: "body { background-color: yellow; }",
    topic: "CSS"
  },
  {
    id: 167,
    question: "Which sensor detects distance using sound waves?",
    options: ["PIR Sensor", "LDR", "Ultrasonic Sensor", "Thermistor"],
    answer: "Ultrasonic Sensor",
    topic: "Robotics"
  },
  {
    id: 168,
    question: "Which HTML tag is used to define the header for a document or section?",
    options: ["<head>", "<h1>", "<header>", "<top>"],
    answer: "<header>",
    topic: "HTML"
  },
  {
    id: 169,
    question: "A potentiometer changes its ________ when you turn the knob.",
    options: ["Voltage", "Capacitance", "Resistance", "Current"],
    answer: "Resistance",
    topic: "Robotics"
  },
  {
    id: 170,
    question: "Which CSS property would you use to make the corners of a button rounded?",
    options: ["border-style: rounded;", "corner-style: round;", "border-radius: 5px;", "border-shape: rounded;"],
    answer: "border-radius: 5px;",
    topic: "CSS"
  },
  {
    id: 171,
    question: "The `delay(1000);` function in Arduino causes the program to pause for:",
    options: ["1 second", "1000 seconds", "1 millisecond", "1 microsecond"],
    answer: "1 second",
    topic: "Robotics"
  },
  {
    id: 172,
    question: "Which HTML tag would you use to make text appear emphasized or italic?",
    options: ["<italic>", "<i>", "<b>", "<em>"],
    answer: "<em>",
    topic: "HTML"
  },
  {
    id: 173,
    question: "What is the purpose of the `alt` attribute on an `<img>` tag?",
    options: ["To provide a title for the image", "To provide alternate text if the image cannot be displayed", "To align the image", "To set the image source"],
    answer: "To provide alternate text if the image cannot be displayed",
    topic: "HTML"
  },
  {
    id: 174,
    question: "PWM pins on an Arduino are often marked with what symbol?",
    options: ["A star (*)", "A tilde (~)", "A hash (#)", "A plus (+)"],
    answer: "A tilde (~)",
    topic: "Robotics"
  },
  {
    id: 175,
    question: "Which CSS property can you use to change the underline style of a link?",
    options: ["text-decoration", "link-style", "underline-style", "font-decoration"],
    answer: "text-decoration",
    topic: "CSS"
  },
  {
    id: 176,
    question: "What is the voltage of the HIGH signal on a standard Arduino UNO?",
    options: ["3.3V", "5V", "9V", "12V"],
    answer: "5V",
    topic: "Robotics"
  },
  {
    id: 177,
    question: "Which tag is used to create a form where users can input data?",
    options: ["<input>", "<form>", "<data>", "<fieldset>"],
    answer: "<form>",
    topic: "HTML"
  },
  {
    id: 178,
    question: "A PIR sensor is used to detect:",
    options: ["Distance", "Light", "Sound", "Motion"],
    answer: "Motion",
    topic: "Robotics"
  },
  {
    id: 179,
    question: "Which property sets the font size of text?",
    options: ["font-size", "text-size", "size", "font-height"],
    answer: "font-size",
    topic: "CSS"
  },
  {
    id: 180,
    question: "The `analogRead()` function on an Arduino returns a value between:",
    options: ["0 and 1", "0 and 255", "0 and 1023", "0 and 5"],
    answer: "0 and 1023",
    topic: "Robotics"
  },

  // --- SET 7 (Robotics + CSS) ---
  {
    id: 181,
    question: "What color is the positive power rail on a breadboard usually marked with?",
    options: ["Blue", "Black", "Green", "Red"],
    answer: "Red",
    topic: "Robotics"
  },
  {
    id: 182,
    question: "How do you select an HTML element with the id 'motor-control' using CSS?",
    options: [".motor-control", "#motor-control", "motor-control", "element.motor-control"],
    answer: "#motor-control",
    topic: "CSS"
  },
  {
    id: 183,
    question: "What is the primary purpose of a voltage regulator on an Arduino board?",
    options: ["To make the board run faster", "To provide a stable and consistent voltage to the microcontroller", "To connect to USB", "To store a charge"],
    answer: "To provide a stable and consistent voltage to the microcontroller",
    topic: "Robotics"
  },
  {
    id: 184,
    question: "Which CSS property would you use to make a <div> element 100 pixels wide and 50 pixels high?",
    options: ["size: 100px 50px;", "width: 100px; height: 50px;", "box-size: 100px, 50px;", "dimensions: 100px, 50px;"],
    answer: "width: 100px; height: 50px;",
    topic: "CSS"
  },
  {
    id: 185,
    question: "The 'anode' is the ______ terminal of an LED.",
    options: ["positive", "negative", "neutral", "ground"],
    answer: "positive",
    topic: "Robotics"
  },
  {
    id: 186,
    question: "How can you hide an element so it's invisible but still takes up space on the page?",
    options: ["display: none;", "visibility: hidden;", "display: hidden;", "opacity: 0;"],
    answer: "visibility: hidden;",
    topic: "CSS"
  },
  {
    id: 187,
    question: "A photoresistor (LDR) changes its ______ based on the amount of light it detects.",
    options: ["voltage", "resistance", "capacitance", "color"],
    answer: "resistance",
    topic: "Robotics"
  },
  {
    id: 188,
    question: "Which selector in CSS targets every single element?",
    options: ["p", ".all", "body", "*"],
    answer: "*",
    topic: "CSS"
  },
  {
    id: 189,
    question: "What does the `analogWrite()` function in Arduino actually do?",
    options: ["It sends a true analog voltage", "It sends a PWM signal to simulate an analog output", "It reads an analog sensor", "It writes a letter to the pin"],
    answer: "It sends a PWM signal to simulate an analog output",
    topic: "Robotics"
  },
  {
    id: 190,
    question: "What does 'font-family: Arial, sans-serif;' mean?",
    options: ["Use Arial font only", "Use sans-serif font only", "Use Arial font, but if it's not available, use any sans-serif font", "This is an invalid syntax"],
    answer: "Use Arial font, but if it's not available, use any sans-serif font",
    topic: "CSS"
  },
  {
    id: 191,
    question: "What does the 'bootloader' on an Arduino allow you to do?",
    options: ["Power the board from a battery", "Connect to Wi-Fi", "Upload code via USB without an external programmer", "Control the motors directly"],
    answer: "Upload code via USB without an external programmer",
    topic: "Robotics"
  },
  {
    id: 192,
    question: "Which CSS property is used to make text bold?",
    options: ["text-style: bold;", "font-style: bold;", "font-weight: bold;", "text-decoration: bold;"],
    answer: "font-weight: bold;",
    topic: "CSS"
  },
  {
    id: 193,
    question: "A transistor acts as an electronic:",
    options: ["switch or amplifier", "resistor or capacitor", "power source", "light sensor"],
    answer: "switch or amplifier",
    topic: "Robotics"
  },
  {
    id: 194,
    question: "Which unit of measurement in CSS is equal to 1% of the viewport's height?",
    options: ["vh", "vw", "vmin", "vmax"],
    answer: "vh",
    topic: "CSS"
  },
  {
    id: 195,
    question: "What is a major safety concern when working with LiPo batteries?",
    options: ["They have very low voltage", "They can catch fire or explode if punctured or overcharged", "They do not hold a charge for long", "They are too heavy"],
    answer: "They can catch fire or explode if punctured or overcharged",
    topic: "Robotics"
  },
  {
    id: 196,
    question: "What does 'position: absolute;' do to an element?",
    options: ["Positions it relative to the browser window or a positioned ancestor", "Keeps it in the normal flow of the page", "Fixes it to the screen even when scrolling", "Centers it on the page"],
    answer: "Positions it relative to the browser window or a positioned ancestor",
    topic: "CSS"
  },
  {
    id: 197,
    question: "What is the function of the `delayMicroseconds()` function?",
    options: ["Pause the program for a number of milliseconds", "Pause the program for a number of microseconds", "Read a sensor value", "Set a pin to HIGH"],
    answer: "Pause the program for a number of microseconds",
    topic: "Robotics"
  },
  {
    id: 198,
    question: "How do you group multiple selectors that share the same style rules?",
    options: ["selector1 + selector2 { ... }", "selector1 > selector2 { ... }", "selector1, selector2 { ... }", "selector1 selector2 { ... }"],
    answer: "selector1, selector2 { ... }",
    topic: "CSS"
  },
  {
    id: 199,
    question: "The long lead of a standard capacitor (electrolytic) indicates the:",
    options: ["Positive terminal", "Negative terminal", "Ground connection", "It doesn't matter"],
    answer: "Positive terminal",
    topic: "Robotics"
  },
  {
    id: 200,
    question: "The CSS property `display: flex;` is used to create a:",
    options: ["Grid container", "Flex container", "Block container", "Inline container"],
    answer: "Flex container",
    topic: "CSS"
  },
  {
    id: 201,
    question: "What is the 'Serial Monitor' in the Arduino IDE used for?",
    options: ["To compile code", "To see text data sent from the Arduino board", "To draw circuit diagrams", "To manage libraries"],
    answer: "To see text data sent from the Arduino board",
    topic: "Robotics"
  },
  {
    id: 202,
    question: "Which of the following is NOT a valid color representation in CSS?",
    options: ["#FF0000", "rgb(255, 0, 0)", "red", "color(255, 0, 0)"],
    answer: "color(255, 0, 0)",
    topic: "CSS"
  },
  {
    id: 203,
    question: "What does 'sinking current' mean in the context of an Arduino pin?",
    options: ["The pin is providing power", "Current is flowing out of the pin", "Current is flowing into the pin from a component to ground", "The pin is turned off"],
    answer: "Current is flowing into the pin from a component to ground",
    topic: "Robotics"
  },
  {
    id: 204,
    question: "What is the purpose of the `!important` rule in CSS?",
    options: ["To highlight important comments", "To make a style declaration have the highest priority, overriding all others", "To import a stylesheet", "To mark a style for deletion"],
    answer: "To make a style declaration have the highest priority, overriding all others",
    topic: "CSS"
  },
  {
    id: 205,
    question: "A 'pull-up' or 'pull-down' resistor is used to:",
    options: ["Increase the power of a pin", "Ensure a digital input pin is in a predictable state when not connected to anything", "Limit current to a motor", "Create a delay"],
    answer: "Ensure a digital input pin is in a predictable state when not connected to anything",
    topic: "Robotics"
  },
  {
    id: 206,
    question: "Which CSS property can create a shadow effect around an element's box?",
    options: ["box-shadow", "text-shadow", "shadow", "element-shadow"],
    answer: "box-shadow",
    topic: "CSS"
  },
  {
    id: 207,
    question: "In electronics, what is a 'short circuit'?",
    options: ["A very short wire", "A path of very low resistance that allows a large current to flow", "A circuit that turns off quickly", "A circuit that doesn't use resistors"],
    answer: "A path of very low resistance that allows a large current to flow",
    topic: "Robotics"
  },
  {
    id: 208,
    question: "What is specificity in CSS?",
    options: ["A way to measure how specific a color is", "The set of rules that decides which style applies when selectors conflict", "A property for text styling", "A special type of class"],
    answer: "The set of rules that decides which style applies when selectors conflict",
    topic: "CSS"
  },
  {
    id: 209,
    question: "The Arduino programming language is based on:",
    options: ["Python", "Java", "C/C++", "Scratch"],
    answer: "C/C++",
    topic: "Robotics"
  },
  {
    id: 210,
    question: "Which CSS property would you use to change the style of a list's bullet points?",
    options: ["list-style-type", "bullet-style", "marker-style", "list-decoration"],
    answer: "list-style-type",
    topic: "CSS"
  },

  // --- SET 8 (Mixed Review) ---
  {
    id: 211,
    question: "What is the correct HTML tag to create a table row?",
    options: ["<td>", "<th>", "<table>", "<tr>"],
    answer: "<tr>",
    topic: "HTML"
  },
  {
    id: 212,
    question: "What is the primary function of a diode?",
    options: ["To allow current to flow in only one direction", "To store electrical charge", "To resist the flow of current", "To amplify a signal"],
    answer: "To allow current to flow in only one direction",
    topic: "Robotics"
  },
  {
    id: 213,
    question: "Which CSS selector targets an element with the ID 'main-logo'?",
    options: [".main-logo", "#main-logo", "main-logo", "*main-logo"],
    answer: "#main-logo",
    topic: "CSS"
  },
  {
    id: 214,
    question: "What does PWM stand for?",
    options: ["Power Wave Measurement", "Pulse Width Modulation", "Pulse Width Measurement", "Power Width Modulation"],
    answer: "Pulse Width Modulation",
    topic: "Robotics"
  },
  {
    id: 215,
    question: "Which HTML attribute specifies the destination of a hyperlink?",
    options: ["src", "link", "target", "href"],
    answer: "href",
    topic: "HTML"
  },
  {
    id: 216,
    question: "A BO motor is a type of DC motor combined with a:",
    options: ["Sensor", "Gearbox", "Capacitor", "Light"],
    answer: "Gearbox",
    topic: "Robotics"
  },
  {
    id: 217,
    question: "What is the CSS property for changing the font size?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    answer: "font-size",
    topic: "CSS"
  },
  {
    id: 218,
    question: "The `setup()` function in an Arduino sketch runs:",
    options: ["Continuously", "Only once, when the sketch starts", "When a button is pressed", "Never"],
    answer: "Only once, when the sketch starts",
    topic: "Robotics"
  },
  {
    id: 219,
    question: "Which tag is used to define an item in a list (ordered or unordered)?",
    options: ["<item>", "<p>", "<li>", "<dt>"],
    answer: "<li>",
    topic: "HTML"
  },
  {
    id: 220,
    question: "The `loop()` function in an Arduino sketch runs:",
    options: ["Continuously after setup() finishes", "Only once, after setup()", "Only when it is called", "Before the setup() function"],
    answer: "Continuously after setup() finishes",
    topic: "Robotics"
  },
  {
    id: 221,
    question: "What does 'margin' in CSS refer to?",
    options: ["The space inside the border", "The space outside the border", "The thickness of the border", "The color of the border"],
    answer: "The space outside the border",
    topic: "CSS"
  },
  {
    id: 222,
    question: "What is a common use for a potentiometer?",
    options: ["As a variable resistor to control things like brightness or volume", "To generate sound", "To measure temperature", "To detect motion"],
    answer: "As a variable resistor to control things like brightness or volume",
    topic: "Robotics"
  },
  {
    id: 223,
    question: "How do you correctly write a comment in HTML?",
    options: ["/* comment */", "// comment", "<!-- comment -->", "## comment"],
    answer: "<!-- comment -->",
    topic: "HTML"
  },
  {
    id: 224,
    question: "A transistor's 'base' terminal is used to:",
    options: ["Provide power", "Control the flow of current", "Output the main current", "Connect to ground"],
    answer: "Control the flow of current",
    topic: "Robotics"
  },
  {
    id: 225,
    question: "Which CSS property is used to align text horizontally?",
    options: ["vertical-align", "align-text", "text-align", "position"],
    answer: "text-align",
    topic: "CSS"
  },
  {
    id: 226,
    question: "The longer lead of an LED is the:",
    options: ["Anode (+)", "Cathode (-)", "Ground", "Signal"],
    answer: "Anode (+)",
    topic: "Robotics"
  },
  {
    id: 227,
    question: "Which HTML tag is used for the largest heading?",
    options: ["<p>", "<h1>", "<h6>", "<b>"],
    answer: "<h1>",
    topic: "HTML"
  },
  {
    id: 228,
    question: "In CSS, which character precedes a class name selector?",
    options: ["#", ".", ":", "$"],
    answer: ".",
    topic: "CSS"
  },
  {
    id: 229,
    question: "A servo motor is known for its ability to:",
    options: ["Rotate to a precise angle", "Spin at very high speeds", "Handle very heavy loads", "Generate electricity"],
    answer: "Rotate to a precise angle",
    topic: "Robotics"
  },
  {
    id: 230,
    question: "Which HTML element contains all the visible content of a webpage?",
    options: ["<head>", "<meta>", "<body>", "<title>"],
    answer: "<body>",
    topic: "HTML"
  },
  {
    id: 231,
    question: "Which CSS property controls the spacing between an element's content and its border?",
    options: ["margin", "border-spacing", "padding", "outline"],
    answer: "padding",
    topic: "CSS"
  },
  {
    id: 232,
    question: "What is the function of `digitalRead()` in Arduino?",
    options: ["To set a pin to HIGH or LOW", "To read if a digital pin is HIGH or LOW", "To read an analog value", "To configure a pin's mode"],
    answer: "To read if a digital pin is HIGH or LOW",
    topic: "Robotics"
  },
  {
    id: 233,
    question: "Which HTML tag is used to create a numbered list?",
    options: ["<ul>", "<li>", "<nl>", "<ol>"],
    answer: "<ol>",
    topic: "HTML"
  },
  {
    id: 234,
    question: "What is the purpose of `font-weight: bold;` in CSS?",
    options: ["To make text italic", "To make text bold", "To change the font family", "To underline text"],
    answer: "To make text bold",
    topic: "CSS"
  },
  {
    id: 235,
    question: "A capacitor is commonly used to:",
    options: ["Resist current", "Store and release electrical energy", "Amplify signals", "Measure light"],
    answer: "Store and release electrical energy",
    topic: "Robotics"
  },
  {
    id: 236,
    question: "What is the `src` attribute used for in an `<img>` tag?",
    options: ["To provide alternate text", "To specify the source (URL) of the image", "To set the image width", "To create a link"],
    answer: "To specify the source (URL) of the image",
    topic: "HTML"
  },
  {
    id: 237,
    question: "How do you select all `<a>` tags within a `<div>` in CSS?",
    options: ["div + a", "div > a", "div a", "div, a"],
    answer: "div a",
    topic: "CSS"
  },
  {
    id: 238,
    question: "What does the 'UNO' in Arduino UNO stand for?",
    options: ["A type of microcontroller", "It means 'one' in Italian, marking the first official Arduino board", "It is an acronym for Universal Network Object", "It has no special meaning"],
    answer: "It means 'one' in Italian, marking the first official Arduino board",
    topic: "Robotics"
  },
  {
    id: 239,
    question: "Which tag is a container for introductory content or a set of navigational links?",
    options: ["<footer>", "<body>", "<header>", "<main>"],
    answer: "<header>",
    topic: "HTML"
  },
  {
    id: 240,
    question: "Which CSS property can make text appear underlined?",
    options: ["font-style: underline;", "text-decoration: underline;", "text-effect: underline;", "border-bottom: 1px solid;"],
    answer: "text-decoration: underline;",
    topic: "CSS"
  }
];
