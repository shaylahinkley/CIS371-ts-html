import {atomNames} from "./mydata"
import {atomObjects, Atom} from "./mydata";

// Find the placeholder node in the HTML document for part1
const div1 = document.getElementById("part1");

// Create a new H2 and its text for part 1
const h1: HTMLHeadingElement = document.createElement("h2");
const h1text: Text = document.createTextNode("Part 1");
h1.appendChild(h1text);
div1?.appendChild(h1);

//Creating the numbered list for part1
const par1 = document.createElement("OL");

//Loop through array of atoms and add <li>  for part 1
atomNames.forEach(function(item) {
    
    //create li element and add text to it
    var li = document.createElement("li");
    var text = document.createTextNode(item);

    //connect the text to li
    li.appendChild(text);

    //connect li to ol
    par1.appendChild(li);
});

//connecting the list to the part 1 node
div1?.appendChild(par1);

//find the placeholder node in the HTML document for part2
const div2 = document.getElementById("part2");

// Create a new H2 and its text for part 2
const h2: HTMLHeadElement = document.createElement("h2");
const h2text: Text = document.createTextNode("Part 2");
h2.appendChild(h2text);
div2?.appendChild(h2);

//creating numbered list for part2
const par2 = document.createElement("OL");

//loop through array of atom objects and add <li> for part 1
atomObjects.forEach(function(item) {
    var li = document.createElement("li");
    
    //get name and weight and combine into one string
    var textName = item.name;
    var textWeight = " " + "(weight: " + item.weight + ")";
    var combinedText = textName + textWeight;

    //create text node
    var text = document.createTextNode(combinedText);
    li.appendChild(text);

    //uses different colors for heavy and light atoms
    if(item.weight > 150) {
        li.classList.add("heavy");
    } else {
        li.classList.add("light");
    }
    par2.appendChild(li);
});

div2?.appendChild(par2);


//find the placeholder node in the HTML document for part3
const div3 = document.getElementById("part3");

// Create a new H2 and its text for part 3
const h3: HTMLHeadElement = document.createElement("h3");
const h3text: Text = document.createTextNode("Part 3");
h3.appendChild(h3text);
div3?.appendChild(h3);

//creating the table for part 3
const table = document.createElement('table');

//create heading of table
var header = document.createElement('thead');
var headingRow = document.createElement('tr');

//add atom as the first name in the heading by using a th element, adding text to the th element, then adding th element to the heading row
var nameHeading = document.createElement('th');
var nameHeadingText: Text = document.createTextNode("Atom");
nameHeading.appendChild(nameHeadingText);
headingRow.appendChild(nameHeading);

//add weight as the second name in the heading by using a th element, adding text to the th element, then adding th element to the heading row
var weightHeading = document.createElement('th');
var weightHeadingText: Text = document.createTextNode("Weight");
weightHeading.appendChild(weightHeadingText);
headingRow.appendChild(weightHeading);

//add headings to header by adding heading row to the header element
header.appendChild(headingRow);

//add heading to table
table.appendChild(header);

//create the body of the table
var tblBody = document.createElement('tbody');

//fill the cells of the body
atomObjects.forEach(function(item){

    //create row for each atom object
    var row = document.createElement('tr');

    //creates a td element, adds the atom name to the td element, and then adds the td element to the first column of the row
    var atom = document.createElement('td');
    var atomName: Text = document.createTextNode(item.name);
    atom.appendChild(atomName);
    row.appendChild(atom);

    //creates a td element, adds the atom weight to the td element, adn then adds the td element to the second column of the row
    var weight = document.createElement('td');
    var weightStr = "" + item.weight;
    var weightText: Text = document.createTextNode(weightStr);
    weight.appendChild(weightText);
    row.appendChild(weight);

    //changes the color of heavy and light elements by applying to the entire row
    if(item.weight > 150) {
        row.classList.add("heavy");
    } else {
        row.classList.add("light");
    }

    tblBody.appendChild(row);
});

//add the table 
table.appendChild(tblBody);
div3?.appendChild(table);
