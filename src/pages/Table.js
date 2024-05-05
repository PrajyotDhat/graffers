import React, { useState, useEffect } from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import useSelectModal from '../utils/hooks/useSelectModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Table() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { openModal } = useSelectModal();
    const [searchData, setSearchData] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}companies`);
            setData(response.data);
            setSearchData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleDetailReview = (companyId) => {
        navigate(`review/${companyId}`);
    };

    const sortData = (option) => {
        let sortedData = [...data];
        switch (option) {
            case 'name':
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'average':
                sortedData.sort((a, b) => a.average - b.average);
                break;
            case 'rating':
                sortedData.sort((a, b) => a.rating - b.rating);
                break;
            case 'location':
                sortedData.sort((a, b) => a.location.localeCompare(b.location));
                break;
            default:
                break;
        }
        setData(sortedData);
    }

    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        sortData(option);
    };

    const handleSearch = () => {
        const filteredData = searchData.filter(company =>
            company.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setData(filteredData);
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-start py-8 w-full gap-x-4'>
                <div className='relative ml-60 w-[30%]'>
                    <div>
                        <h1>Select City :</h1>
                    </div>
                    <div>
                        <input type='text'
                            placeholder='Search...'
                            className='border rounded-md p-1 w-full'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                        <HiOutlineLocationMarker className='absolute top-[55%] -right-28 transform -translate-x-32 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500' />
                    </div>
                </div>
                <div className='w-[10%] mt-6'>
                    <button className='bg-gradient-to-r from-pink-600 to-purple-600 rounded-md text-[#FFF] p-1 px-2'
                        onClick={handleSearch}>Find Company</button>
                </div>
                <div className='w-[10%] mt-6 ml-10'>
                    <button className='bg-gradient-to-r from-pink-600 to-purple-600 rounded-md text-[#FFF] py-1 px-2'
                        onClick={() => openModal("AddModal")}
                    >+ Add Company</button>
                </div>
                <div className='w-[10%]'>
                    <h1>Sort :</h1>
                    <select className='w-full border rounded-md p-1' value={sortOption} onChange={handleSortChange}>
                        <option value="name">Name</option>
                        <option value="average">Average</option>
                        <option value="rating">Rating</option>
                        <option value="location">Location</option>
                    </select>
                </div>
            </div>
            <div className="w-full pl-56 pr-64">
                {data?.map(company => (
                    <div key={company.id} className="border p-2 m-2 rounded-md bg-[#FFF] shadow-xl">
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-[#000] text-lg'>{company?.name}</h1>
                            <p className='font-base text-gray-400 text-normal'>Founded on {formatDate(company?.foundedOn)}</p>
                        </div>
                        <div>
                            <p className='flex items-center gap-x-2 font-base text-gray-400 text-normal'>
                                <HiOutlineLocationMarker />{company?.location}<span>{company?.city}</span>
                            </p>
                        </div>
                        <div className='flex items-center justify-end'>
                            <button className='text-[#FFF] bg-[#000] px-2 py-1 font-medium'
                                onClick={() => handleDetailReview(company.id)}>Detail Review</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table
