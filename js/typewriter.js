var TYPEWRITER = document.getElementById("typewriter");
var TYPEWRITER_TEXTS = [
  "I am Yong Qi",
  "I like ducks",
  "I'm pursuing Industrial &amp; Systems Engineering and a second major in Computer Science",
  "I also work in Business Development at Sqkii",
  "I teach Programming Methodologies at the National University of Singapore",
  "I'm not a very good programmer...",
  "Relationship r = i.love(you);",
  "hehe I tried"
];
var TIME_TO_TYPE_EACH_CHAR = 100;
var TIME_TO_DELETE_EACH_CHAR = 50;
var TIME_TEXT_IS_SHOWN = 1000;
var TIME_TO_PUSH_ADDITIONAL_MESSAGES = 30000;
var TIME_BEFORE_NEXT_MESSAGE_IS_SHOWN = 500;
var typewriterText = "";
var typewriterIndex = 0;

function prompter() {
  if (typewriterText.length < TYPEWRITER_TEXTS[typewriterIndex].length) {
    typewriterText = TYPEWRITER_TEXTS[typewriterIndex].substring(
      0,
      typewriterText.length + 1
    );
    TYPEWRITER.innerHTML = typewriterText;
    setTimeout(prompter, TIME_TO_TYPE_EACH_CHAR);
    return;
  }
  setTimeout(unprompt, TIME_TEXT_IS_SHOWN);
}
/**
 * Removing the last letter of the typewriter.
 */
function unprompt() {
  if (typewriterText.length === 0) {
    typewriterIndex++;
    if (typewriterIndex >= TYPEWRITER_TEXTS.length) {
      typewriterIndex = 0;
    }
    setTimeout(prompter, TIME_BEFORE_NEXT_MESSAGE_IS_SHOWN);
    return;
  }
  typewriterText = typewriterText.substring(0, typewriterText.length - 1);
  TYPEWRITER.innerHTML = typewriterText;
  setTimeout(unprompt, TIME_TO_DELETE_EACH_CHAR);
}

prompter();
