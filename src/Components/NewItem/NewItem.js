import React, { useState } from "react";
import firebaseStorage from "../../API/firebase";
import API from "../../API/API";
import { Redirect } from "react-router-dom";
import "../NewShelf/NewShelfStyle.css";

const NewItem = React.memo(props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState("");
  const [itemcount, setCount] = useState("");
  const [itemmanufacture, setManufacture] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cost, setCost] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = async () => {
    const shelfId = props.match.params.shelfId;
    if (!shelfId) return;

    const item = {
      name,
      description,
      customCategory,
      shelfId,
      image,
      itemcount,
      itemmanufacture,
      year,
      color,
      size,
      cost
    };

    const result = await API.create(item, "items");
    if (!result) return;
    setIsSubmit(true);
  };

  const upLoadImg = async e => {
    if (!e.target.files[0]) {
      console.error({ uploadErr: " file not found, please upload file again" });
      return;
    }
    const { files } = e.target;
    const { name, type, size } = files[0];

    if (!files || size > 5000000) {
      console.error({ uploadErr: " file too big, maximum size : 5mb" });
      return;
    }
    console.log(firebaseStorage.ref("placePhotos/" + name));

    const storageRef = firebaseStorage.ref("placePhotos/" + name);
    const upLoadFile = storageRef.put(files[0], { type });
    await upLoadFile.on(
      "state_changed",
      async results => {
        let progress =
          (await (results.bytesTransferred / results.totalBytes)) * 100;
        console.log("Upload is " + progress + "% done");
      },
      err => console.log(err),
      () => {
        // Upload completed successfully, now we can get the download URL
        upLoadFile.snapshot.ref.getDownloadURL().then(downloadURL => {
          setImage(downloadURL);
        });
      }
    );
  };
  if (isSubmit) return <Redirect to="/" />;
  return (
    <main className="valign-wrapper addnewitem">
      <center>
        <form className="valign-wrapper newshelfform" method="post">
          <div className="row">
            {/* NAME */}
            <div className="input-field">
              <input
                type="text"
                name="itemname"
                id="itemname"
                className="shelfinput"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label htmlFor="itemname" className="noselect">
                Name your Collectable
              </label>
            </div>

            {/* DESCRIPTION */}
            <div className="input-field">
              <input
                type="text"
                name="itemdesc"
                id="itemdesc"
                className="shelfinput"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <label htmlFor="itemdesc" className="noselect">
                Describe your Collectable
              </label>
            </div>

            {/* MANUFACTURE */}
            <div className="input-field">
              <input
                type="text"
                name="itemmanufacture"
                id="itemmanufacture"
                className="shelfinput"
                value={itemmanufacture}
                onChange={e => setManufacture(e.target.value)}
              />
              <label htmlFor="itemmanufacture" className="noselect">
                Who made this?
              </label>
            </div>

            {/* YEAR */}
            <div className="input-field">
              <input
                type="number"
                name="itemyear"
                id="itemyear"
                className="shelfinput"
                value={year}
                onChange={e => setYear(e.target.value)}
              />
              <label htmlFor="itemyear" className="noselect">
                What year was this made?
              </label>
            </div>

            {/* COUNT */}
            <div className="input-field">
              <input
                type="number"
                name="itemcount"
                id="itemcount"
                className="shelfinput"
                value={itemcount}
                onChange={e => setCount(e.target.value)}
              />
              <label htmlFor="itemcount" className="noselect">
                How many do you own?
              </label>
            </div>

            {/* CATAGORY */}
            <div className="input-field">
              <input
                type="text"
                name="itemcustom"
                id="itemcustom"
                className="shelfinput"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
              />
              <label htmlFor="itemcatname" className="noselect">
                Give it a Catagory
              </label>
            </div>

            {/* COLOR */}
            <div className="input-field">
              <input
                type="text"
                name="itemcolor"
                id="itemcolor"
                className="shelfinput"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
              <label htmlFor="itemcolor" className="noselect">
                What color?
              </label>
            </div>

            {/* SIZE */}
            <div className="input-field">
              <input
                type="text"
                name="itemsize"
                id="itemsize"
                className="shelfinput"
                value={size}
                onChange={e => setSize(e.target.value)}
              />
              <label htmlFor="itemsize" className="noselect">
                What size?
              </label>
            </div>

            {/* COST */}
            <div className="input-field">
              <input
                type="number"
                name="itemcost"
                id="itemcost"
                className="shelfinput"
                value={cost}
                onChange={e => setCost(e.target.value)}
              />
              <label htmlFor="itemcost" className="noselect">
                How much did this cost you?
              </label>
            </div>

            {/* IMAGE */}
            <div className="file-field input-field">
              <div className="waves-effect waves-light btn addpicbtn">
                <span>
                  <i className="material-icons addpicicon">add_a_photo</i>
                </span>
                <input type="file" onChange={upLoadImg} />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  placeholder="Add a picture"
                  type="text"
                  value={image}
                />
              </div>
            </div>

            {/* ADD BUTTON */}
            <button
              name="btn_createitem"
              className="btn_createshelf btn-small waves-effect waves-light"
              onClick={e => {
                e.preventDefault();
                submit();
              }}
            >
              Add Collectable
            </button>
          </div>
        </form>
      </center>
    </main>
  );
});

export default NewItem;
