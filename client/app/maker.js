// import Modal from "./Modal";
// import useModal from "./useModal";

const handleDomo = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);
  if (
    $("#domoName").val() == "" ||
    $("#domoAge").val() == "" ||
    $("#domoFavoriteFood").val() == ""
  ) {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax(
    "POST",
    $("#domoForm").attr("action"),
    $("#domoForm").serialize(),
    function() {
      loadDomosFromServer();
    }
  );

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

const DomoForm = props => {
  return (
    <form
      id="domoForm"
      onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
      <label htmlFor="favoriteFood">Favorite food: </label>
      <input
        id="domoFavoriteFood"
        type="text"
        name="favoriteFood"
        placeholder="Domo Favorite Food"
      />
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
};

const DomoList = function(props) {
  if (props.domos.length === 0) {
    return (
      <div className="domosList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }

  const domoNodes = props.domos.map(function(domo) {
    return (
      <div key={domo._id} className="domo" onClick={handleClick}>
        <img
          src="/assets/img/domoface.jpeg"
          alt="domo face"
          className="domoFace"
        />
        <h3 className="domoName">Name: {domo.name}</h3>
        <h3 className="domoAge">Age: {domo.age}</h3>
        <h3 className="domoFavoriteFood">Favorite food: {domo.favoriteFood}</h3>
      </div>
    );
  });

  return <div className="domoList">{domoNodes}</div>;
};

const loadDomosFromServer = () => {
  sendAjax("GET", "/getDomos", null, data => {
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector("#domos")
    );
  });
};

const ModalApp = () => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="App">
      <button className="button-default" onClick={toggle}>
        Show Modal
      </button>
      <Modal isShowing={isShowing} hide={toggle} />
    </div>
  );
};

const setup = function(csrf) {
  const { isShowing, toggle } = useModal();

  ReactDOM.render(
    <DomoForm csrf={csrf} />,
    document.querySelector("#makeDomo")
  );

  ReactDOM.render(<DomoList domos={[]} />, document.querySelector("#domos"));

  ReactDOM.render(<ModalApp />, document.querySelector("#domos"));

  loadDomosFromServer();
};

const getToken = () => {
  sendAjax("GET", "/getToken", null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});
