import React, { useState, memo } from "react";
import { Redirect } from "react-router-dom";
import API from "../../API/API";
import "./NewShelfStyle.css";

// name: req.body.name,
// description: req.body.description,
// categoryName: req.body.categoryName,
// categoryId: req.body.categoryId,
// customCategory: req.body.customCategory,
// image: req.body.image,

// shelfy mcschelven
// when i grow up i want to be a whole cabinet
// hopes and dreams

const NewShelf = memo(props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = async () => {
    const shelf = { name, description, customCategory };

    const result = await API.create(shelf, "shelves");
    if (!result) return;
    setIsSubmit(true);
  };

  if (isSubmit) return <Redirect to="/" />;

  return (
    <main className="valign-wrapper newshelf">
      <center>
        <form className="valign-wrapper newshelfform" method="post">
          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="shelfname"
                id="shelfname"
                className="shelfinput"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label htmlFor="shelfname" className="noselect">
                Name your shelf
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                name="shelfdesc"
                id="shelfdesc"
                className="shelfinput"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <label htmlFor="shelfdesc" className="noselect">
                Describe your shelf
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                name="shelfcustom"
                id="shelfcustom"
                className="shelfinput"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
              />
              <label htmlFor="shelfcustom" className="noselect">
                Choose a custom category
              </label>
            </div>

            <button
              name="btn_createshelf"
              className="btn_createshelf btn-small waves-effect waves-light"
              onClick={e => {
                e.preventDefault();
                submit();
              }}
            >
              Create Shelf
            </button>
          </div>
        </form>
      </center>
    </main>
  );
});

export default NewShelf;
