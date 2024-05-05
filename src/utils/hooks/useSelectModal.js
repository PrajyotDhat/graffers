import { useDispatch, useSelector } from "react-redux";
import { setModal, setIsModalOpen } from "../Store";
import AddModal from "../../pages/AddModal";
import AddReview from "../../pages/AddReview";

export default function useSelectModal() {
	const { modal, isModalOpen } = useSelector((state) => state.modal);
	const renderModal =
		modal.name === "AddModal" ? (
			<AddModal data={modal?.data} />
		) : modal.name === "AddReview" ? (
			<AddReview data={modal?.data} />
		) : (
			""
		);
	const dispatch = useDispatch();
	const openModal = (modalName, data = null) => dispatch(setModal({ name: modalName, data }));


	const closeModal = () => {
		dispatch(setModal(""));
		dispatch(setIsModalOpen(false));
	};

	return { dispatch, setModal, setIsModalOpen, renderModal, isModalOpen, openModal, closeModal };
}