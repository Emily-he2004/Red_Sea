import Header from "./component/Header";
import SheltersMenu from "../component/SheltersMenu";
import Shelter from "../component/Shelter";
import Map from "./component/Map";

function SheltersPage() {
  return (
    <div className="shelters-page">
      <Header />
      <Map />
      <SheltersMenu />
      <Shelter />
    </div>
  );
}

export default SheltersPage;

// Put the following into the App.js is using this page;
// import Shelters from "./Pages/Shelters";
{
  /* <Shelters/> Optional second page for the map to be in */
}
