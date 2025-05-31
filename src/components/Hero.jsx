import Identicon from "react-identicons";
import { setGlobalState, truncate, useGlobalState } from "../store";
import imgHero from "../assets/tigreal.webp";

const Hero = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white text-5xl font-bold">
            Buy and Sell <br /> Digital Arts, <br />
            <span className="text-gradient">NFTs</span> Collections
          </h1>
          <p className="text-gray-500 font-semibold text-sm mt-3">
            Mint and collect the hottest NFTs around.
          </p>
        </div>

        <div className="flex mt-5">
          <button
            className="hover:scale-105 transition-transform shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2"
            onClick={() => setGlobalState("modal", "scale-100")}
          >
            Create NFT
          </button>
        </div>

        <div className="w-full max-w-2xl mx-auto mt-6 shadow-xl shadow-black rounded-xl overflow-hidden">
          <div className="text-white bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <div className="text-center pl-9 py-2">
                <p className="font-bold text-2xl mb-1">123k</p>
                <small className="text-gray-300 text-sm">Users</small>
              </div>
              <div className="border-l border-gray-600 h-auto self-stretch"></div>
              <div className="text-center py-2">
                <p className="font-bold text-2xl mb-1">152k</p>
                <small className="text-gray-300 text-sm">Artworks</small>
              </div>
              <div className="border-l border-gray-600 h-auto self-stretch"></div>
              <div className="text-center pr-9 py-2">
                <p className="font-bold text-2xl mb-1">200k</p>
                <small className="text-gray-300 text-sm">Artist</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
        <img className="h-60 w-full object-cover" src={imgHero} alt="tigreal" />

        <div className="flex justify-start items-center p-3">
          <Identicon
            className="h-10 w-10 object-contain rounded-full mr-3"
            string={connectedAccount}
            size={50}
          />
          <div>
            <p className="text-white font-semibold">
              {truncate(connectedAccount, 4, 4, 11)}
            </p>
            <small className="text-pink-800 font-bold">@you</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
