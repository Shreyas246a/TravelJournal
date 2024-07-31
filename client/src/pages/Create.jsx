import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../authContext'; 
import "../styles/create.css";
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Create = () => { 
    const navigate = useNavigate(); 
    const { user } = useContext(AuthContext); 
    const [files, setFiles] = useState([]);  // Initialize as an empty array
    const [videos, setVideos] = useState([]);  // Initialize as an empty array for videos
    const [info, setInfo] = useState({}); 
    const [error, setError] = useState("");  // State for capturing errors
    const [loading, setLoading] = useState(false);  // Loading state
    const [success, setSuccess] = useState("");  // Success message

    // Handle form input changes
    const handleChange = (e) => { 
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); 
    };

    // Handle file input change
    const handleFileChange = (e) => { 
        setFiles((prev) => {
            // Convert FileList to Array and concatenate with existing files
            return [...prev, ...Array.from(e.target.files)].slice(0, 10); // Limit to 10 files
        });
    };

    // Handle video input change
    const handleVideoChange = (e) => {
        const selectedVideos = Array.from(e.target.files);

        for (const video of selectedVideos) {
            if (video.size > 100 * 1024 * 1024) { // 100 MB in bytes
                setError(`File ${video.name} exceeds the 100 MB size limit.`);
                return;
            }
        }

        setVideos((prev) => {
            // Convert FileList to Array and concatenate with existing videos
            return [...prev, ...selectedVideos].slice(0, 1); // Limit to 1 video
        });
    };

    // Remove selected file
    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Remove selected video
    const handleRemoveVideo = () => {
        setVideos([]);
    };

    // Handle form submission
    const handleClick = async (e) => { 
        e.preventDefault(); 
        setLoading(true); // Start loading
        setError(""); // Reset error
        setSuccess(""); // Reset success message

        // Validate required fields
        if (!info.title || !info.location || !info.text) {
            setError("Please fill out all required fields.");
            setLoading(false);
            return;
        }

        let newEntry = { ...info, author: user._id };

        // Handle video uploads
        if (videos.length > 0) {
            try {
                const video = videos[0];  // Only one video allowed
                const data = new FormData(); 
                data.append("file", video); 
                data.append("upload_preset", "ml_default");  // Use the correct preset
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/ddk13bn3l/video/upload", 
                    data
                );
                const { url } = uploadRes.data; 
                newEntry = { ...newEntry, videos: url }; 
            } catch (err) { 
                setError("Failed to upload video. Please try again.");  // Set error message
                setLoading(false); // Stop loading
                console.log(err); 
                return; 
            }
        }

        // Handle image uploads
        if (files.length > 0) {
            try {
                const list = await Promise.all(files.map(async (file) => {  // Process all selected files
                    const data = new FormData(); 
                    data.append("file", file); 
                    data.append("upload_preset", "ml_default");  // Use the correct preset
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/ddk13bn3l/image/upload", 
                        data
                    );
                    const { url } = uploadRes.data; 
                    return url; 
                }));
                newEntry = { ...newEntry, photos: list }; 
            } catch (err) { 
                setError("Failed to upload images. Please try again.");  // Set error message
                setLoading(false); // Stop loading
                console.log(err); 
                return; 
            }
        }

        try { 
            const response = await axios.post('http://localhost:5500/api/entries/', 
                newEntry, { 
                withCredentials: false
            });

            setSuccess("Entry created successfully!");  // Set success message
            setLoading(false); // Stop loading
            setFiles([]);  // Reset files
            setVideos([]);  // Reset videos
            setInfo({});  // Reset form fields

            navigate(`/view/${response?.data?._id}`); 
        } catch (err) { 
            setError("Failed to create entry. Please try again.");  // Set error message
            setLoading(false); // Stop loading
            console.log(err); 
        } 
    };

    return ( 
        <div className='create'> 
            <Navbar /> 
            <div className="createContainer"> 
                <div className="picsContainer"> 
                    <div className="formInput"> 
                        <h2>Upload Images Upto 10</h2> 
                        <label htmlFor="file"> 
                            <FontAwesomeIcon 
                                className="icon" icon={faPlusCircle} /> 
                        </label> 
                        <input 
                            type="file"
                            id="file"
                            multiple 
                            onChange={handleFileChange}  // Call the updated handleFileChange
                            style={{ display: "none" }} 
                        /> 
                    </div> 
                    <div className="uploadedPictures"> 
                        {files.map((file, index) => (  // Display all selected files
                            <div className="upload_pic" key={index}> 
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={`preview-${index}`}
                                    height="80px"
                                /> 
                                <button onClick={() => handleRemoveFile(index)}>
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </button>
                            </div>
                        ))}
                    </div> 
                </div> 

                {/* Video Upload Section */}
                <div className="formInput videoUpload"> 
                    <h2>Upload Video (Max 100 MB)</h2> 
                    <label htmlFor="video"> 
                        <FontAwesomeIcon 
                            className="icon" icon={faPlusCircle} /> 
                    </label> 
                    <input 
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleVideoChange}  // Call the updated handleVideoChange
                        style={{ display: "none" }} 
                    /> 
                    {videos.length > 0 && (
                        <div className="uploadedVideo">
                            <div className="upload_video">
                                <video 
                                    src={URL.createObjectURL(videos[0])} 
                                    controls 
                                    height="80px" 
                                    style={{ borderRadius: '10px' }}
                                />
                                <button onClick={handleRemoveVideo}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="input"> 
                    <label htmlFor="title">Title</label> 
                    <input 
                        onChange={handleChange} 
                        type="text"
                        id="title"
                        placeholder="Enter Title"
                    /> 
                </div> 
                <div className="input"> 
                    <label htmlFor="location">Location</label> 
                    <input 
                        onChange={handleChange} 
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                    /> 
                </div> 

                <div className="input"> 
                    <label htmlFor="date">What is the Date</label> 
                    <input 
                        onChange={handleChange} 
                        type="date"
                        id="date"
                        placeholder="Choose Date"
                    /> 
                </div> 

                <div className="input"> 
                    <label htmlFor="text">Write your thoughts..</label> 
                    <textarea 
                        name='entry'
                        id='text'
                        cols="120"
                        rows='25'
                        onChange={handleChange} 
                        autoFocus 
                    ></textarea> 
                </div> 

                {loading && <p>Loading...</p>}  {/* Display loading message */}
                {error && <p className="error">{error}</p>}  {/* Display error message */}
                {success && <p className="success">{success}</p>}  {/* Display success message */}

                <button className='createBtn'
                    onClick={handleClick} 
                    disabled={loading}> 
                    Create Entry 
                </button> 
            </div> 
        </div> 
    ); 
};

export default Create;
