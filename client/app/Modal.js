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
