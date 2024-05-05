import React, { useState, useEffect } from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import useSelectModal from '../utils/hooks/useSelectModal';
import axios from 'axios';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useLocation, useParams } from 'react-router-dom';

function ReviewPage() {

  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { openModal } = useSelectModal();
  const {companyId} = useParams()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}companies`);
      // setData(response.data);
      const company = response?.data.find((item)=> item.id === companyId)
      setData([company]);
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

  const renderStars = (rating) => {
    const filledStars = Array.from({ length: rating }, (_, index) => <AiFillStar key={index} className="text-yellow-500" />);
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => <AiOutlineStar key={index} className="text-gray-400" />);
    return [...filledStars, ...emptyStars];
};

  return (
    <div>
      <div className='bg-[#FFF] shadow-2xl m-28 border h-[70vh]'>
        <div className="w-full px-10">
          {data?.map(company => (
            <div>
              <div key={company.id} className="border-b py-4">
                <div className='flex items-center justify-between'>
                  <h1 className='font-bold text-[#000] text-lg'>{company?.name}</h1>
                  <p className='font-base text-gray-400 text-normal'>Founded on {formatDate(company?.foundedOn)}</p>
                </div>
                <div>
                  <p className='flex items-center gap-x-2 font-base text-gray-400 text-normal'><HiOutlineLocationMarker /> {company?.location} <span>{company?.city}</span></p>
                </div>
                <div className='flex items-center justify-end'>
                  <button className='text-[#FFF] bg-[#6617CB] px-2 py-1 font-medium'
                    onClick={() => openModal("AddReview", { data: data })}>+ Add Review</button>
                </div>
              </div>
              <div>
                {company?.reviews?.map(review => (
                  <div key={review.id}>
                    <div className='flex items-center justify-between'>
                      <div className="font-bold">{review.fullname}</div>
                      <div className="text-gray-500 flex">{renderStars(review.rating)}</div>
                    </div>
                    <div className="mt-2">{review.subject}</div>
                    <div className="mt-2">{review.review}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewPage