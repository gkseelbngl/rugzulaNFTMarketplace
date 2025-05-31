import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { mintNFT } from "../Blockchain.Services";
import imgHero from "../assets/tigreal.webp";

const pinataJwt = process.env.REACT_APP_PINATA_JWT;

if (!pinataJwt) {
  console.error("Pinata JWT is missing! Please check the .env file.");
  throw new Error("Pinata JWT is not configured.");
} else {
  console.log(
    "Pinata JWT successfully uploaded:",
    pinataJwt.slice(0, 10) + "..."
  );
}

const CreateNFT = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgBase64, setImgBase64] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !selectedFile) return;

    setGlobalState("modal", "scale-0");
    setGlobalState("loading", { show: true, msg: "Loading data to IPFS..." });

    try {
      const fileData = new FormData();
      fileData.append("file", selectedFile);
      fileData.append(
        "pinataMetadata",
        JSON.stringify({ name: selectedFile.name })
      );

      const fileRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            Authorization: `Bearer ${pinataJwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileUrl = `https://ipfs.io/ipfs/${fileRes.data.IpfsHash}`;

      const metadata = { name: title, description, image: fileUrl };
      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          pinataContent: metadata,
          pinataMetadata: { name: `${title}_metadata.json` },
        },
        {
          headers: {
            Authorization: `Bearer ${pinataJwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const metadataURI = `https://ipfs.io/ipfs/${metadataRes.data.IpfsHash}`;

      setLoadingMsg("NFT is recorded on the blockchain...");
      const nft = { title, price, description, metadataURI };
      await mintNFT(nft);

      resetForm();
      setAlert("NFT minting completed!", "green");
      window.location.reload();
    } catch (error) {
      console.error("NFT minting error:", error.message);
      setAlert("NFT minting fails:" + error.message, "red");
    } finally {
      setGlobalState("loading", { show: false, msg: "" });
    }
  };

  const changeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    console.log("Selected file:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });
    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      setImgBase64(readerEvent.target.result);
    };
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImgBase64(null);
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={imgBase64 || imgHero}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19212c] file:text-gray-400
                  hover:file:bg-[#1d2631]
                  cursor-pointer focus:ring-0 focus:outline-none"
                onChange={changeImage}
                required
              />
            </label>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (ETH)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-[#e32970]
              hover:bg-[#bd255f] py-2 px-5 rounded-full
              drop-shadow-xl border border-transparent
              hover:bg-transparent hover:text-[#e32970]
              hover:border hover:border-[#bd255f]
              focus:outline-none focus:ring mt-5"
          >
            Press Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
