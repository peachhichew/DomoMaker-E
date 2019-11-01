"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var handleClick = function handleClick(e) {
  console.log("I've been clicked!");
  ReactDOM.render(React.createElement(EditDomo, null), document.querySelector("#domos"));
};

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

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      // Render nothing if the "show" prop is false
      if (!this.props.show) {
        return null;
      }

      // The gray background
      var backdropStyle = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: 50
      };

      // The modal "window"
      var modalStyle = {
        backgroundColor: "#fff",
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 300,
        margin: "0 auto",
        padding: 30
      };

      return React.createElement(
        "div",
        { className: "backdrop", style: { backdropStyle: backdropStyle } },
        React.createElement(
          "div",
          { className: "modal", style: { modalStyle: modalStyle } },
          React.createElement(
            "div",
            { className: "footer" },
            React.createElement(
              "button",
              { onClick: this.props.onClose },
              "Close"
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

var EditDomo = function (_React$Component2) {
  _inherits(EditDomo, _React$Component2);

  function EditDomo(props) {
    _classCallCheck(this, EditDomo);

    var _this2 = _possibleConstructorReturn(this, (EditDomo.__proto__ || Object.getPrototypeOf(EditDomo)).call(this, props));

    _this2.state = { isOpen: false };
    _this2.toggleModal = _this2.toggleModal.bind(_this2);
    return _this2;
  }

  _createClass(EditDomo, [{
    key: "toggleModal",
    value: function toggleModal() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { onClick: this.toggleModal },
          "Open the modal"
        ),
        React.createElement(
          Modal,
          { show: this.state.isOpen, onClose: this.toggleModal },
          "Here's some content for the modal"
        )
      );
    }
  }]);

  return EditDomo;
}(React.Component);

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax("GET", "/getDomos", null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

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
// https://daveceddia.com/open-modal-in-react/
// https://alligator.io/react/modal-component/

// import React from "react";
// import ReactDOM from "react-dom";

// const Modal = ({ isShowing, hide }) =>
//   isShowing
//     ? React.createPortal(
//         <React.Fragment>
//           <div className="modal-overlay">
//             <div
//               classname="modal-wrapper"
//               aria-model
//               aria-hidden
//               tabIndex={-1}
//               role="dialog"
//             >
//               <div className="modal">
//                 <div className="modal-header">
//                   <button
//                     type="button"
//                     className="modal-close-button"
//                     data-dismiss="modal"
//                     aria-label="Close"
//                     onClick={hide}
//                   >
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//               </div>
//               <p>Hello, I'm a modal.</p>
//             </div>
//           </div>
//         </React.Fragment>,
//         document.body
//       )
//     : null;

// class Modal extends React.Component {
//   render() {
//     // Render nothing if the "show" prop is false
//     if (!this.props.show) {
//       return null;
//     }

//     // The gray background
//     const backdropStyle = {
//       position: "fixed",
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: "rgba(0,0,0,0.3)",
//       padding: 50
//     };

//     // The modal "window"
//     const modalStyle = {
//       backgroundColor: "#fff",
//       borderRadius: 5,
//       maxWidth: 500,
//       minHeight: 300,
//       margin: "0 auto",
//       padding: 30
//     };

//     return (
//       <div className="backdrop" style={{ backdropStyle }}>
//         <div className="modal" style={{ modalStyle }}>
//           {this.props.children}

//           <div className="footer">
//             <button onClick={this.props.onClose}>Close</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;
"use strict";
// https://upmostly.com/tutorials/modal-components-react-custom-hooks

// import { useState } from "react";

// const useModal = () => {
//   // using React hooks to store the current view state of the modal
//   const [isShowing, setIsShowing] = useState(false);

//   // this function toggles the value of isShowing to be the opposite
//   // of what it currently is
//   function toggle() {
//     setIsShowing(!isShowing);
//   }

//   // return these values so that the component has access to them
//   return {
//     isShowing,
//     toggle
//   };
// };

// class UseModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isShowing: false,
//       setIsShowing: false
//     };
//   }

//   toggle() {
//     this.setState({ setIsShowing: !isShowing });
//   }

//   return {isShowing, toggle}
// }

// export default useModal;
"use strict";
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
