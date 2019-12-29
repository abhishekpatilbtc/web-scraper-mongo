import React from "react";

function Form({ handleFormSubmit }) {
  return (
    <form>
      <div className="pull-right text-center">
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-dark"
        >
          Scrape
        </button>
      </div>
    </form>
  );
}

export default Form;
