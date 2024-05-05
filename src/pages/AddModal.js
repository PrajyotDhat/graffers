import React, { useState , useEffect} from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendarDays } from "react-icons/lu";
import axios from "axios";
import useSelectModal from '../utils/hooks/useSelectModal';

function AddModal({ data }) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { closeModal } = useSelectModal();;
    const [company, setCompany] = useState({
        name: '',
        location: '',
        foundedOn: '',
        city: ''
    });

    useEffect(() => {
		if (data) {
			setCompany({
				name: data?.data?.name || "",
				email: data?.data?.location || "",
				phone: data?.data?.foundedOn || "",
				address: data?.data?.city || ""
			});
		}
	}, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setCompany(prevState => ({
            ...prevState,
            foundedOn: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                id: data?.data?.id,
                name: company?.name,
                location: company?.location,
                foundedOn: company?.foundedOn,
                city: company?.city,
                reviews: []
            };
            await axios.post(`${BASE_URL}companies`, requestData);
            closeModal();
            data?.refetchData();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-[25rem] py-2 h-[50vh] bg-[#FFF] rounded-md">
            <div className="pl-5">
                <div className="text-lg font-bold text-center">Add Company</div>
            </div>
            <div className="w-full flex items-center ">
                <form onSubmit={handleSubmit} className='w-full px-10'>
                    <div>
                        <label className="py-4">Company Name</label>
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={company?.name}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Enter..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="py-4 relative">Location</label>
                        <HiOutlineLocationMarker className='absolute top-[35%] -right-20 transform -translate-x-32 text-[#6617CB]' />
                        <div>
                            <input
                                type="text"
                                name="location"
                                value={company?.location}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Search Location"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="py-4">Founded On</label>
                        <div className='w-full'>
                            <DatePicker
                                selected={company.foundedOn}
                                onChange={handleDateChange}
                                className="border rounded-md p-2 w-full"
                                dateFormat="dd/MM/yyyy"
                                placeholderText='dd/MM/yyyy'
                                icon={<LuCalendarDays />}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="py-4">City</label>
                        <div>
                            <input
                                type="text"
                                name="city"
                                value={company?.city}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Enter the City"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center pt-6">
                        <button type="submit"
                            className="w-[47.5%] text-white bg-gradient-to-r from-pink-600 to-purple-600 cursor-pointer p-2 flex items-center justify-center gap-x-2 rounded-md"
                        >Save</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default AddModal
