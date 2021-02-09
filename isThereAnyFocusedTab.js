export default function isThereAnyFocusedTab() {
  var hidden = "hidden";
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  else
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

  function onchange(evt) {
    var v = "visible",
      h = "hidden",
      evtMap = {
        focus: v,
        focusin: v,
        pageshow: v,
        blur: h,
        focusout: h,
        pagehide: h,
      };

    evt = evt || window.event;
    var tabFocus;
    if (evt.type in evtMap) {
      tabFocus = true;
    } else {
      tabFocus = !this[hidden];
    }
    if (tabFocus) {
      setTimeout(() => {
        localStorage.setItem("isThereAnyFocusedTab", tabFocus);
      }, 300);
    } else {
      localStorage.setItem("isThereAnyFocusedTab", tabFocus);
    }
  }
  if (document[hidden] !== undefined)
    onchange({ type: document[hidden] ? "blur" : "focus" });
}
