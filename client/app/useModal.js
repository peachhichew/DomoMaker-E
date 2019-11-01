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
