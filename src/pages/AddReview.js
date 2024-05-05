import React, { useState, useEffect } from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import useSelectModal from '../utils/hooks/useSelectModal';

function AddReview({ data }) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { closeModal } = useSelectModal();;
    const [review, setReview] = useState({
        fullname: '',
        subject: '',
        review: '',
        rating: 0
    });
    const [selectedStars, setSelectedStars] = useState(0);

    useEffect(() => {
        if (data) {
            setReview({
                fullname: data?.data?.fullname || "",
                subject: data?.data?.subject || "",
                review: data?.data?.review || "",
                rating: data?.data?.rating || 0
            });
            setSelectedStars(data?.data?.rating || 0);
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStarClick = (ratingValue) => {
        setSelectedStars(ratingValue);
        setReview(prevState => ({
            ...prevState,
            rating: ratingValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            if (true) {   
                const newReview = {
                    id: Date.now() + Math.random(),
                    fullname: review.fullname,
                    subject: review.subject,
                    review: review.review,
                    rating: review.rating
                };
    
                const updatedCompanyData = {
                    ...data.data[0],
                    reviews: [...data.data[0].reviews, newReview]
                };
                console.log("Data:", updatedCompanyData);
                await axios.put(`${BASE_URL}companies/${data.data[0].id}`, updatedCompanyData);
                closeModal();
            } else {
                console.error("Error: Data is not in the expected format");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
    

    return (
        <div className="w-[25rem] py-2 h-[50vh] bg-[#FFF] rounded-md">
            <div className="pl-5">
                <div className="text-lg font-bold text-center">Add Review</div>
            </div>
            <div className="w-full flex items-center ">
                <form onSubmit={handleSubmit} className='w-full px-10'>
                    <div>
                        <label className="py-4">Full Name</label>
                        <div>
                            <input
                                type="text"
                                name="fullname"
                                value={review?.fullname}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Enter"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="py-4">Subject</label>
                        <div>
                            <input
                                type="text"
                                name="subject"
                                value={review?.subject}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Enter"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="py-4">Enter your Review</label>
                        <div>
                            <textarea
                                name="review"
                                value={review?.review}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-full"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="py-4">Rating</label>
                        <div className="flex items-center justify-between">
                            <div className='flex'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    value <= selectedStars ?
                                        <AiFillStar key={value} className="text-yellow-500 cursor-pointer" onClick={() => handleStarClick(value)} />
                                        :
                                        <AiOutlineStar key={value} className="text-gray-400 cursor-pointer" onClick={() => handleStarClick(value)} />
                                ))}
                            </div>
                            <div>
                                <p>Satisfied</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center pt-6">
                        <button type="submit"
                            className="w-[47.5%] text-white bg-[#6617CB] cursor-pointer p-2 flex items-center justify-center gap-x-2 rounded-md"
                        >Save</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default AddReview
