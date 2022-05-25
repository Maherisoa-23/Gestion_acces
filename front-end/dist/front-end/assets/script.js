// all needed ids and classes:
const slider = document.getElementById("slider"),
  container = document.getElementById("container"),
  right = document.getElementById("right"),
  login = document.getElementById("login"),
  recover = document.getElementById("recover"),
  forgotPassButton = document.getElementById("forgot-pass"),
  BackToLoginButton = document.getElementById("back-to-login"),
  newAccountButton = document.getElementById("new-account"),
  signupSlideButton = document.getElementById("signup-slide-button"),
  loginSlideButton = document.getElementById("login-slide-button"),
  // I used some Id's below since I do not need all the elements without server side application
  user = document.getElementById("user"),
  password = document.getElementById("password"),
  passwordConfirmation = document.getElementById("confirm-password"),
  userLabel = document.getElementById("user-label"),
  passwordLabel = document.getElementById("password-label"),
  passwordConfirmationLabel = document.getElementById("confirm-password-label"),
  passwordRequirementsContainer = document.getElementById(
    "password-requirements-container"
  ),
  passwordRequirements = document.getElementById("password-requirements"),
  passwordRequirementsLength = document.getElementById(
    "password-requirements-length"
  ),
  passwordRequirementsNumber = document.getElementById(
    "password-requirements-number"
  ),
  passwordRequirementsLower = document.getElementById(
    "password-requirements-lower"
  ),
  passwordRequirementsUpper = document.getElementById(
    "password-requirements-upper"
  ),
  passwordRequirementsSpecial = document.getElementById(
    "password-requirements-special"
  ),
  forms = document.querySelectorAll("form"),
  inputs = document.querySelectorAll(".input"),
  passwordInputs = document.querySelectorAll('input[type="password"]'),
  validationIcons = document.querySelectorAll(".validation-icon"),
  labelWrappers = document.querySelectorAll(".label-wrapper"),
  labels = document.querySelectorAll(".label"),
  passwordEyes = document.querySelectorAll(".password-eye"),
  checkboxes = document.querySelectorAll('input[type="checkbox"]'),
  checkmarks = document.querySelectorAll(".checkmark"),
  checkmarkLabels = document.querySelectorAll(".checkmark-label"),
  radios = document.querySelectorAll('input[type="radio"]'),
  radioButtons = document.querySelectorAll(".radio"),
  radioButtonLabels = document.querySelectorAll(".radio-label");
// input validation regular expressions
const validMail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z\d\s]).{8,32}$/;
// login/signup slide function
const sliding = () => {
  signupSlideButton.onclick = () => {
    slider.classList.add("slide");
    container.classList.add("slide");
    right.classList.add("active"); // this will be used to reposition the signup slide in case it was active and the window changes
  };
  loginSlideButton.onclick = () => {
    slider.classList.remove("slide");
    container.classList.remove("slide");
    right.classList.remove("active");
  };
  forgotPassButton.onclick = () => {
    login.classList.remove("active");
    recover.classList.add("active");
  };
  BackToLoginButton.onclick = () => {
    recover.classList.remove("active");
    login.classList.add("active");
  };
  newAccountButton.onclick = () => {
    slider.classList.add("slide");
    container.classList.add("slide");
    setTimeout(() => {
      right.classList.add("active");
      recover.classList.remove("active");
      login.classList.add("active");
    }, 900);
  };
};
// function to check if the password and password confirmation inputs are equal
const confirmPassword = () => {
  if (password.value == passwordConfirmation.value) return true;
  return false;
};
// function to be called for styling valid/invalid/empty/focused inputs and their labels and icons
const validationStyling = (type, input, label, iconIndex) => {
  iconIndex *= 2;
  let eyeIndex;
  if ((eyeIndex = Array.from(passwordInputs).indexOf(input)) == -1)
    eyeIndex = null; // transfrom the passwordInputs nodeList to an array and check if the input belongs to it (aka is a password input) and if yes assign its index to eyeIndex (otherwise eyeIndex is null)
  if (type == "valid") {
    input.classList.remove("invalid");
    input.classList.add("valid");
    input.nextElementSibling.classList.remove("invalid");
    input.nextElementSibling.classList.add("valid");
    label.classList.remove("invalid");
    label.classList.add("valid");
    validationIcons[iconIndex + 1].classList.remove("active");
    validationIcons[iconIndex].classList.add("active");
    if (eyeIndex) passwordEyes[eyeIndex].classList.add("valid");
  } else if (type == "invalid") {
    input.classList.remove("valid");
    input.classList.add("invalid");
    label.classList.remove("valid");
    label.classList.add("invalid");
    input.nextElementSibling.classList.remove("valid");
    input.nextElementSibling.classList.add("invalid");
    validationIcons[iconIndex].classList.remove("active");
    validationIcons[iconIndex + 1].classList.add("active");
    if (eyeIndex) passwordEyes[eyeIndex].classList.add("invalid");
  } else if (type == "empty" || type == "focused") {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    label.classList.remove("valid");
    label.classList.remove("invalid");
    input.nextElementSibling.classList.remove("valid");
    input.nextElementSibling.classList.remove("invalid");
    validationIcons[iconIndex].classList.remove("active");
    validationIcons[iconIndex + 1].classList.remove("active");
    if (eyeIndex) {
      passwordEyes[eyeIndex].classList.remove("valid");
      passwordEyes[eyeIndex].classList.remove("invalid");
    }
  }
  // if the input is the sign up password, the password confirmation inputs gets focused as well
  if (input == password) {
    validationStyling(
      "focused",
      passwordConfirmation,
      passwordConfirmationLabel,
      5
    );
  }
};
// function to add/remove styling classes for active input elements and their labels
const inputStyling = () => {
  for (let i = 0; i < inputs.length; i++) {
    let elements = [inputs[i], labelWrappers[i], labels[i]];
    // the two arrays below will be used to determine the change before and after an input's focus
    let values = new Array(inputs.length);
    let states = new Array(inputs.length);
    inputs[i].onmouseover = () => {
      elements.forEach((elm) => {
        elm.classList.add("hover");
      });
      inputs[i].nextElementSibling.classList.add("hover"); // for styling the corner span
      if (inputs[i].nextElementSibling.nextElementSibling)
        inputs[i].nextElementSibling.nextElementSibling.classList.add("hover"); // for styling eye-icons if they exist
    };
    inputs[i].onmouseout = () => {
      elements.forEach((elm) => {
        elm.classList.remove("hover");
      });
      inputs[i].nextElementSibling.classList.remove("hover");
      if (inputs[i].nextElementSibling.nextElementSibling)
        inputs[i].nextElementSibling.nextElementSibling.classList.remove(
          "hover"
        );
    };
    inputs[i].onfocus = () => {
      // if the input was already valid/invalid its state will be stored in the states array (if not it is null)
      if (inputs[i].classList.contains("valid")) states[i] = "valid";
      else if (inputs[i].classList.contains("invalid")) states[i] = "invalid";
      else states[i] = null;
      validationStyling("focused", inputs[i], labels[i], i); // remove any valid/invalid styling classes if the element is focused
      elements.forEach((elm) => {
        elm.classList.add("active");
      });
      inputs[i].nextElementSibling.classList.add("active");
      if (inputs[i].nextElementSibling.nextElementSibling)
        inputs[i].nextElementSibling.nextElementSibling.classList.add("active");
      if (inputs[i] == password) {
        // if input is sign up password, show password requirements list
        passwordRequirementsContainer.classList.add("active");
        passwordRequirements.classList.add("active");
      }
      // if the input already had a value it's value will be stored in the values array (if not it is null)
      if (inputs[i].value != "") values[i] = inputs[i].value;
      else values[i] = null;
    };
    inputs[i].onblur = () => {
      if (inputs[i].value == "") {
        elements.forEach((elm) => {
          elm.classList.remove("active");
        });
        inputs[i].nextElementSibling.classList.remove("active");
        if (inputs[i].nextElementSibling.nextElementSibling)
          inputs[i].nextElementSibling.nextElementSibling.classList.remove(
            "active"
          );
        if (inputs[i] == password) {
          // if the input is the sign up password and is empty, all styling for the requirement list is removed
          Array.from(passwordRequirements.children).forEach((elm) => {
            elm.classList.remove("valid");
            elm.classList.remove("invalid");
            elm.firstElementChild.classList.remove("uil-check-circle");
            elm.firstElementChild.classList.remove("uil-times-circle");
            elm.firstElementChild.classList.add("uil-info-circle");
          });
        }
      }
      // since the focus removes existing valid/invalid styling classes we will bring them back if the value before and after focus didn't change
      else if (states[i] && inputs[i].value == values[i]) {
        validationStyling(states[i], inputs[i], labels[i], i);
      }
      // if password and password confirmation are both not empty check if they match or not and style accordingly
      if (
        (inputs[i] == password || inputs[i] == passwordConfirmation) &&
        password.value != "" &&
        passwordConfirmation.value != ""
      ) {
        if (confirmPassword())
          validationStyling(
            "valid",
            passwordConfirmation,
            passwordConfirmationLabel,
            5
          );
        else
          validationStyling(
            "invalid",
            passwordConfirmation,
            passwordConfirmationLabel,
            5
          );
      }
      // if input is sign up password, hide password requirements list
      if (inputs[i] == password) {
        passwordRequirementsContainer.classList.remove("active");
        passwordRequirements.classList.remove("active");
        // put invalid class for every requirement without a valid class
        Array.from(passwordRequirements.children).forEach((elm) => {
          if (!elm.classList.contains("valid") && password.value != "") {
            elm.classList.add("invalid");
            elm.firstElementChild.classList.remove("uil-info-circle");
            elm.firstElementChild.classList.add("uil-times-circle");
          }
        });
      }
    };
  }
};
// show/hide password function
const passwordVisibility = () => {
  for (let i = 0; i < passwordEyes.length; i++) {
    passwordEyes[i].onclick = () => {
      if (passwordEyes[i].classList.contains("visible")) {
        passwordEyes[i].classList.remove("visible");
        passwordEyes[i].lastElementChild.attributes["data-tooltip"].value =
          "show password";
        passwordInputs[i].type = "password";
      } else {
        passwordEyes[i].classList.add("visible");
        passwordEyes[i].lastElementChild.attributes["data-tooltip"].value =
          "hide password";
        passwordInputs[i].type = "text";
      }
    };
  }
};
// function for selecting the custom checkboxes and radios
const check = () => {
  for (let i = 0; i < checkmarkLabels.length; i++) {
    checkmarkLabels[i].onclick = () => {
      if (checkboxes[i].checked == false) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false;
      }
    };
  }
  for (let i = 0; i < radioButtonLabels.length; i++) {
    radioButtonLabels[i].onclick = () => {
      if (radios[i].checked == false) radios[i].checked = true;
    };
  }
};
// function to validate sign up inputs
const inputValidation = () => {
  user.onchange = () => {
    if (user.value != "") {
      if (
        validMail.test(user.value) ||
        !isNaN(user.value.replace(/\+|-|\\|\/|\.|\(|\)|\[|]|\s/g, ""))
      )
        validationStyling(
          "valid",
          user,
          userLabel,
          3
        ); // use the email and phone number regular expression to verify input
      else validationStyling("invalid", user, userLabel, 3);
    } else validationStyling("empty", user, userLabel, 3);
  }; // disclaimer: phone number shouldn't be verified on client side, if you would like to actually verify a phone a number I recommend checking https://github.com/google/libphonenumber
  password.onchange = () => {
    if (password.value != "") {
      if (validPassword.test(password.value))
        validationStyling("valid", password, passwordLabel, 4);
      else validationStyling("invalid", password, passwordLabel, 4);
    } else validationStyling("empty", password, passwordLabel, 4);
  };
  passwordConfirmation.onchange = () => {
    if (passwordConfirmation.value != "") {
      if (confirmPassword())
        validationStyling(
          "valid",
          passwordConfirmation,
          passwordConfirmationLabel,
          5
        );
      else
        validationStyling(
          "invalid",
          passwordConfirmation,
          passwordConfirmationLabel,
          5
        );
    } else
      validationStyling(
        "empty",
        passwordConfirmation,
        passwordConfirmationLabel,
        5
      );
  };
  password.oninput = () => {
    let value = password.value;
    const valid = (requirement) => {
      if (!requirement.classList.contains("invalid"))
        requirement.firstElementChild.classList.remove("uil-info-circle"); // remove info-circle icon in case it's present (aka invalid class has not been set yet with x-icon)
      requirement.classList.remove("invalid");
      requirement.classList.add("valid");
      requirement.firstElementChild.classList.remove("uil-times-circle");
      requirement.firstElementChild.classList.add("uil-check-circle");
    };
    const invalid = (requirement) => {
      if (requirement.classList.contains("valid")) {
        // only put invalid styles if the input isn't initially validated after first appearance
        requirement.classList.remove("valid");
        requirement.classList.add("invalid");
        requirement.firstElementChild.classList.remove("uil-check-circle");
        requirement.firstElementChild.classList.add("uil-times-circle");
      }
    };
    // from here on validate every requirement by itself
    if (value.length >= 8 && value.length <= 32)
      valid(passwordRequirementsLength);
    else invalid(passwordRequirementsLength);
    if (/(?=.*[0-9])/.test(value)) valid(passwordRequirementsNumber);
    else invalid(passwordRequirementsNumber);
    if (/(?=.*[a-z])/.test(value)) valid(passwordRequirementsLower);
    else invalid(passwordRequirementsLower);
    if (/(?=.*[A-Z])/.test(value)) valid(passwordRequirementsUpper);
    else invalid(passwordRequirementsUpper);
    if (/(?=.*[^a-zA-Z\d\s])/.test(value)) valid(passwordRequirementsSpecial);
    else invalid(passwordRequirementsSpecial);
  };
};
// function for handling the submission of forms
const sumbitForms = () => {
  forms.forEach((form) => {
    form.onsubmit = () => {
      form.querySelectorAll(".info").forEach((infoBox) => {
        let input = infoBox.querySelector("[required]");
        if (input) {
          if (
            input.classList.contains("invalid") ||
            input.value == "" ||
            (input.type == "checkbox" && !input.checked)
          ) {
            infoBox.classList.add("invalid-submission");
            setTimeout(() => {
              infoBox.classList.remove("invalid-submission");
            }, 825); // timeout is used to remove class after its animation is finished
          }
          return false;
        }
      });
      return false; // this is just a simple function to shake empty/invalid inputs and will not do anything else since it has no server side application
    };
  });
};
window.addEventListener("DOMContentLoaded", () => {
  sliding();
  inputStyling();
  passwordVisibility();
  check();
  inputValidation();
  sumbitForms();
});
window.onresize = () => {
  if (right.classList.contains("active")) signupSlideButton.click(); // reposition signup slide if it was previously active
};
// all what's below is for extra themes and will not be documented
const extraThemes = () => {
  const openThemesButton = document.getElementById("open-themes"),
    themes = document.getElementById("themes"),
    themeLabels = document.querySelectorAll(".theme-label"),
    form = document.getElementById("custom-theme-form");
  const buttonFunctions = () => {
    openThemesButton.onclick = () => {
      themes.classList.add("active");
    };
    document.getElementById("close-themes").onclick = () => {
      themes.classList.remove("active");
    };
    document.getElementById("add-own-theme").onclick = () => {
      document.querySelector(".own-theme").classList.add("active");
    };
    document.getElementById("back-from-own-theme").onclick = () => {
      document.querySelector(".own-theme").classList.remove("active");
    };
    document.getElementById("remove-themes").onclick = () => {
      document
        .querySelector(".remove-themes-confirm-container")
        .classList.add("active");
    };
    document.getElementById("back-from-remove-themes").onclick = () => {
      document
        .querySelector(".remove-themes-confirm-container")
        .classList.remove("active");
    };
    document.getElementById("remove-themes-confirm").onclick = () => {
      openThemesButton.remove();
      themes.remove();
    };
  };
  const setCustomThemeForm = () => {
    Array.from(form.children[1].children).forEach((child) => {
      let input = child.firstElementChild;
      if (input.name == "--primary-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--primary-color")
          .replace(/\s/g, "");
      else if (input.name == "--secondary-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--secondary-color")
          .replace(/\s/g, "");
      else if (input.name == "--body-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--body-color")
          .replace(/\s/g, "");
      else if (input.name == "--title-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--title-color")
          .replace(/\s/g, "");
      else if (input.name == "--text-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--text-color")
          .replace(/\s/g, "");
      else if (input.name == "--valid-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--valid-color")
          .replace(/\s/g, "");
      else if (input.name == "--invalid-color")
        input.value = getComputedStyle(document.body)
          .getPropertyValue("--invalid-color")
          .replace(/\s/g, "");
    });
  };
  const selectTheme = () => {
    for (let i = 0; i < themeLabels.length; i++) {
      themeLabels[i].addEventListener("click", () => {
        if (!document.body.classList.contains(themeLabels[i].htmlFor)) {
          document.body.className = "";
          document.body.removeAttribute("style");
          document.body.classList.add(themeLabels[i].htmlFor);
          setCustomThemeForm();
        }
      });
    }
  };
  document.getElementById("clear-custom-theme").onclick = () => {
    document.body.removeAttribute("style");
    setCustomThemeForm();
  };
  form.onsubmit = (e) => {
    e.preventDefault;
    let body = document.body,
      formdata = new FormData(form),
      customTheme = "";
    body.removeAttribute("style");
    for (let pair of formdata.entries()) {
      if (pair[0] == "--background-image") {
        if (pair[1]) {
          let http = new XMLHttpRequest();
          http.open("GET", pair[1], true);
          http.send();
          http.onloadend = () => {
            let st = http.status;
            if (st == 0) alert("Invalid Background URL");
            else if (st == 404) alert("Background URL not Found");
            else if (st == 200)
              body.setAttribute(
                "style",
                pair[0] + ":url(" + pair[1] + ");" + body.getAttribute("style")
              );
          };
        }
      } else customTheme += pair[0] + ":" + pair[1] + ";";
      if (pair[0] == "--body-color") {
        customTheme += "--body-color-gradient:" + pair[1] + "ec;";
      }
    }
    body.setAttribute("style", customTheme);
    return false;
  };
  setCustomThemeForm();
  buttonFunctions();
  selectTheme();
};
window.addEventListener("load", extraThemes);
