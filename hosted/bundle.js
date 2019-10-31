"use strict";

// import Modal from "./Modal";
// import useModal from "./useModal";

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);
  if ($("#domoName").val() == "" || $("#domoAge").val() == "" || $("#domoFavoriteFood").val() == "") {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax("POST", $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

// const Modal = props => {
//   return (
//     <div id="myModal" class="modal">
//       <div class="modal-content">
//         <span class="close">&times;</span>
//         <p>Some text in the Modal..</p>
//       </div>
//     </div>
//   );
// };

// const handleClick = e => {
//   console.log("I've been clicked!");
// };

var DomoForm = function DomoForm(props) {
  return React.createElement(
    "form",
    {
      id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
    React.createElement(
      "label",
      { htmlFor: "favoriteFood" },
      "Favorite food: "
    ),
    React.createElement("input", {
      id: "domoFavoriteFood",
      type: "text",
      name: "favoriteFood",
      placeholder: "Domo Favorite Food"
    }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domosList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      "div",
      { key: domo._id, className: "domo", onClick: handleClick },
      React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "domo face",
        className: "domoFace"
      }),
      React.createElement(
        "h3",
        { className: "domoName" },
        "Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        "Age: ",
        domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoFavoriteFood" },
        "Favorite food: ",
        domo.favoriteFood
      )
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax("GET", "/getDomos", null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var ModalApp = function ModalApp() {
  var _useModal = useModal(),
      isShowing = _useModal.isShowing,
      toggle = _useModal.toggle;

  return React.createElement(
    "div",
    { className: "App" },
    React.createElement(
      "button",
      { className: "button-default", onClick: toggle },
      "Show Modal"
    ),
    React.createElement(Modal, { isShowing: isShowing, hide: toggle })
  );
};

var setup = function setup(csrf) {
  var _useModal2 = useModal(),
      isShowing = _useModal2.isShowing,
      toggle = _useModal2.toggle;

  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

  ReactDOM.render(React.createElement(ModalApp, null), document.querySelector("#domos"));

  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

// import React from "react";
// import ReactDOM from "react-dom";

var Modal = function Modal(_ref) {
  var isShowing = _ref.isShowing,
      hide = _ref.hide;
  return isShowing ? React.createPortal(React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "modal-overlay" },
      React.createElement(
        "div",
        {
          classname: "modal-wrapper",
          "aria-model": true,
          "aria-hidden": true,
          tabIndex: -1,
          role: "dialog"
        },
        React.createElement(
          "div",
          { className: "modal" },
          React.createElement(
            "div",
            { className: "modal-header" },
            React.createElement(
              "button",
              {
                type: "button",
                className: "modal-close-button",
                "data-dismiss": "modal",
                "aria-label": "Close",
                onClick: hide
              },
              React.createElement(
                "span",
                { "aria-hidden": "true" },
                "\xD7"
              )
            )
          )
        ),
        React.createElement(
          "p",
          null,
          "Hello, I'm a modal."
        )
      )
    )
  ), document.body) : null;
};

// export default Modal;
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// https://upmostly.com/tutorials/modal-components-react-custom-hooks

// import { useState } from "react";

var useModal = function useModal() {
  // using React hooks to store the current view state of the modal
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isShowing = _useState2[0],
      setIsShowing = _useState2[1];

  // this function toggles the value of isShowing to be the opposite
  // of what it currently is


  function toggle() {
    setIsShowing(!isShowing);
  }

  // return these values so that the component has access to them
  return {
    isShowing: isShowing,
    toggle: toggle
  };
};

// export default useModal;
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: "toggle" }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: "hide" }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
