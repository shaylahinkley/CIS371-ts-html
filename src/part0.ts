// Find the placeholder node in the HTML document
const div0 = document.getElementById("part0");

// Create a new H2 and its text
const h0: HTMLHeadingElement = document.createElement("h2");
const h0text: Text = document.createTextNode("Part 0");
h0.appendChild(h0text);
div0?.appendChild(h0);

// Create a paragraph as its text
const par0: HTMLParagraphElement = document.createElement("p");

//beginning part of string that is not bold 
let bodyStr1: string = "This work is solely mine. I understand that copying";
bodyStr1 = bodyStr1 + " someone else's code and claiming to be my own work or sharing my";
bodyStr1 = bodyStr1 + " code with someone else is a ";

//creating bold element
const bold = document.createElement('b');
let textnode = document.createTextNode("violation");
bold.appendChild(textnode);

//end of string that is not bold
let bodyStr2: string = " of academic honesty";

const par0text: Text = document.createTextNode(bodyStr1);
const par0text2: Text = document.createTextNode(bodyStr2);

//putting all the strings together
par0.appendChild(par0text);
par0.appendChild(bold);
par0.appendChild(par0text2);
div0?.appendChild(par0);
