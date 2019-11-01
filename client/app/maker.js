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

const handleClick = e => {
  console.log("I've been clicked!");
  ReactDOM.render(<EditDomo />, document.querySelector("#domos"));
};

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

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    return (
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}>
          <div className="footer">
            <button onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

class EditDomo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Open the modal</button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
      </div>
    );
  }
}

const loadDomosFromServer = () => {
  sendAjax("GET", "/getDomos", null, data => {
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector("#domos")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <DomoForm csrf={csrf} />,
    document.querySelector("#makeDomo")
  );

  ReactDOM.render(<DomoList domos={[]} />, document.querySelector("#domos"));

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
