import Table from "./pages/Table";
import useSelectModal from "./utils/hooks/useSelectModal";
import ModalComponent from "./components/ModalComponent";
import { Route, Routes } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";


function App() {

  const { renderModal } = useSelectModal();

  return (
    <div className="">
      <div className="my-6">
        <Routes>
        <Route path="/" element={<Table />}/>
        <Route path="/review/:companyId" element={<ReviewPage/>}/> 
        </Routes>
      </div>
      {renderModal && <ModalComponent>{renderModal}</ModalComponent>}
    </div>
  );
}

export default App;
