import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMemeImage } from "../../redux/reducers/authreducer";

const AddMeme = ({ trigger, setTrigger }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    memeImagePreview: null,
    memeImageFile: null,
  });

 const baseUrl = "https://snapbackforever-website-api.onrender.com"

  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => {
      const prevUrl = prev.memeImagePreview;

      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }

      return prev;
    });

    const previewUrl =
      URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      memeImagePreview:
        previewUrl,
      memeImageFile: file,
    }));
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();

    const file =
      form.memeImageFile;

    if (!file) return;

    try {
      const fd =
        new FormData();

      fd.append(
        "image",
        file
      );

      // SAME upload conditioning pattern
      const uploadUrl =
        `${baseUrl}/upload/image/temp`;

      const uploadRes =
        await fetch(
          uploadUrl,
          {
            method:
              "PUT",
            body: fd,
          }
        );

      if (
        !uploadRes.ok
      ) {
        const error =
          await uploadRes.json();

        console.error(
          "Image upload failed",
          error
        );

        return;
      }

      const {
        fileId,
        bucketName,
      } =
        await uploadRes.json();

      const payload = {
        profilePicFileId:
          fileId,
        profilePicBucketName:
          bucketName,
      };

      await dispatch(
        addMemeImage(
          payload
        )
      ).unwrap?.();

      setTrigger(
        (prev) =>
          !prev
      );

      if (
        form.memeImagePreview
      ) {
        URL.revokeObjectURL(
          form.memeImagePreview
        );
      }

      setForm({
        memeImagePreview:
          null,
        memeImageFile:
          null,
      });
    } catch (err) {
      console.error(
        "addMemeImage failed:",
        err
      );
    }
  };

  const cancelImage =
    () => {
      if (
        form.memeImagePreview
      ) {
        URL.revokeObjectURL(
          form.memeImagePreview
        );
      }

      setForm({
        memeImagePreview:
          null,
        memeImageFile:
          null,
      });
    };

  return (
    <div className="addImageProModal scrollBar" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>
        Add Meme
      </h2>

      <form onSubmit={handleSaveImage} style={{ display: "flex", flexDirection: "column", width: "100%", height: "73%", justifyContent: "center", alignItems: "center" }}>
        <label style={{ textAlign: "center" }}>
          <b>
            Select A Image:
          </b>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={
            handleUploadImage
          }
          style={{ border: "solid lightGrey", background: "white", width: "90%", margin: "0 0 1vh 0" }}
        />

        {form.memeImagePreview && (
          <div style={{ border: "double black", width: "60%", display: "flex", flexDirection: "column", alignItems: "center", padding: "1vh 0" }}>
            <label style={{ textAlign: "center" }}>
              <b>
                Image
                Preview:
              </b>
            </label>

            <img
              src={
                form.memeImagePreview
              }
              alt="preview"
              style={{ width: "200px", marginTop: "10px", margin: "1vh 0" }}
            />

            <button
              type="button"
              style={{ width: "60%", background: "red" }}
              onClick={
                cancelImage
              }
            >
              Cancel
              Image
            </button>
          </div>
        )}

        <button
          type="submit"
          style={{ background: "goldenRod", margin: "1vh 0", width: "90%" }}
        >
          Save Meme
          Image
        </button>
      </form>
    </div>
  );
};

export default AddMeme;