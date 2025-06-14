import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, setLoadingMsg, useGlobalState } from "../store";
import imgHero from "../assets/tigreal.webp";
import { updateNFT } from "../Blockchain.Services";

const UpdateNFT = () => {
  const [modal] = useGlobalState("updateModal");
  const [price, setPrice] = useState("");
  const [nft] = useGlobalState("nft");
  const [imgBase64] = useState(nft?.cost);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!price || price <= 0) return;

    setGlobalState("modal", "scale-0");
    setLoadingMsg("Initializing price update...");

    try {
      setLoadingMsg("Price updating...");
      setGlobalState("updateModal", "scale-0");

      await updateNFT({ id: nft.id, cost: price });
      setAlert("Price updated...");
      window.location.reload();
    } catch (error) {
      console.log("Error updating price: ", error);
      setAlert("Update failed...", "red");
    }
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setPrice("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 z-50 ${modal}`}
    >
      <div className="fixed inset-0 z-40" onClick={closeModal} />
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:x-3/4 lg:w-2/5 max-w-2xl h-auto max-h-[90vh] p-6 overflow-y-auto z-50 relative">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={imgBase64 || imgHero}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              type="number"
              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0"
              placeholder="Price (ETH)"
              min={0.01}
              step={0.01}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <button className="flex justify-center items-center hover:scale-100 transition-transform shadow-lg shadow-black text-white p-2 mt-5 bg-[#e32970] hover:bg-[#bd255f] rounded-full ">
            Updated Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
