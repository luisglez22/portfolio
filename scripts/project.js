import reloadOnResize from "./utils/reloadOnResize.js";
import backAndForwardFix from "./utils/backAndForwardFix.js";
import hrefDelay from "./utils/hrefDelay.js";
import screenAlert from "./utils/screenAlert.js";
import scrollSmooth from "./utils/scrollSmooth.js";
import { renderProject } from "./project/renderProject.js";
import { menu } from "./menu.js";
import { globalAnimations } from "./globalAnimations.js";
import { projectAnimations } from "./project/projectAnimations.js";

screenAlert();
reloadOnResize();
backAndForwardFix();
renderProject();
menu();
projectAnimations();
globalAnimations();
hrefDelay();
scrollSmooth();