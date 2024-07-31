import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../authContext'; 
import "../styles/create.css";
import { useNavigate, useParams } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Update = () => { 
    const navigate = useNavigate(); 
    const { user } = useContext(AuthContext); 
    const { id } = useParams(); // Get the entry ID from URL params
    const [files, setFiles] = useState([]); 
    const [video, setVideo] = useState(null);  // State for the video file
    const [info, setInfo] = useState({}); 
    const [error, setError] = useState("");  
    const [loading, setLoading] = useState(false);  
    const [success, setSuccess] = useState("");  
    const [videoURL, setVideoURL] = useState(null); // State for the video URL

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const res = await axios.get(`http://localhost:5500/api/entries/${id}`);
                setInfo(res.data);
                setFiles(res.data.photos || []);
                setVideo(null);  // Clear previous video state
                setVideoURL(res.data.videos || null);  // Set the existing video URL
            } catch (err) {
                setError("Failed to fetch entry data. Please try again.");
                console.log(err);
            }
        };

        fetchEntry();
    }, [id]);

    const handleRemoveVideo = () => {
        setVideoURL(null);
        setVideo(null);
    };

    const handleChange = (e) => { 
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); 
    };

    const handleFileChange = (e) => { 
        setFiles((prev) => {
            return [...prev, ...Array.from(e.target.files)].slice(0, 10); 
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);  // Set the selected video file
            setVideoURL(URL.createObjectURL(file));  // Create a new URL for the video file
        }
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_ , i) => i !== index));
    };

    const handleClick = async (e) => { 
        e.preventDefault(); 
        setLoading(true); 
        setError(""); 
        setSuccess(""); 

        let updatedEntry = { ...info, author: user._id };

        if (files.length > 0) {
            try {
                const list = await Promise.all(files.map(async (file) => {  
                    if (typeof file === 'string') return file;  // Skip already uploaded files

                    const data = new FormData(); 
                    data.append("file", file); 
                    data.append("upload_preset", "ml_default");  
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/ddk13bn3l/image/upload", 
                        data
                    );
                    const { url } = uploadRes.data; 
                    return url; 
                }));
                updatedEntry = { ...updatedEntry, photos: list }; 
            } catch (err) { 
                setError("Failed to upload images. Please try again.");  
                setLoading(false); 
                console.log(err); 
                return; 
            }
        }

        if (video) {
            try {
                const data = new FormData(); 
                data.append("file", video); 
                data.append("upload_preset", "ml_default"); 
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/ddk13bn3l/video/upload", 
                    data
                );
                const { url } = uploadRes.data; 
                updatedEntry = { ...updatedEntry, videos: url };
            } catch (err) {
                setError("Failed to upload video. Please try again.");
                setLoading(false);
                console.log(err);
                return;
            }
        }

        try { 
            await axios.put(`http://localhost:5500/api/entries/${id}`, updatedEntry, { 
                withCredentials: false
            });

            setSuccess("Entry updated successfully!");  
            setLoading(false); 

            navigate(`/view/${id}`); 
        } catch (err) { 
            setError("Failed to update entry. Please try again.");  
            setLoading(false); 
            console.log(err); 
        } 
    };

    useEffect(() => {
        // Cleanup function to revoke object URL
        return () => {
            if (videoURL && videoURL !== info.video) {
                URL.revokeObjectURL(videoURL);
            }
        };
    }, [videoURL]);

    return ( 
        <div className='create'> 
            <Navbar /> 
            <div className="createContainer"> 
                <div className="picsContainer"> 
                    <div className="formInput"> 
                        <h2>Update Images</h2> 
                        <label htmlFor="file"> 
                            <FontAwesomeIcon 
                                className="icon" icon={faPlusCircle} /> 
                        </label> 
                        <input 
                            type="file"
                            id="file"
                            multiple 
                            onChange={handleFileChange}  
                            style={{ display: "none" }} 
                        /> 
                    </div> 
                    <div className="uploadedPictures"> 
                        {files.map((file, index) => (  
                            <div className="upload_pic" key={index}> 
                                <img 
                                    src={typeof file === 'string' ? file : URL.createObjectURL(file)} 
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

                <div className="formInput">
                    <h2>Update Video</h2>
                    <label htmlFor="video">
                        <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                    </label>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleVideoChange}  // Call the updated handleVideoChange
                        style={{ display: "none" }}
                    />
                    {videoURL && (
                        <div className="uploadedVideo">
                            <video src={videoURL} controls height="200px" />
                            <button onClick={handleRemoveVideo}>
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </button>
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
                        value={info.title || ""}
                    /> 
                </div> 
                <div className="input"> 
                    <label htmlFor="location">Location</label> 
                    <input 
                        onChange={handleChange} 
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                        value={info.location || ""}
                    /> 
                </div> 

                <div className="input"> 
                    <label htmlFor="date">What is the Date</label> 
                    <input 
                        onChange={handleChange} 
                        type="date"
                        id="date"
                        placeholder="Choose Date"
                        value={info.date || ""}
                    /> 
                </div> 

                <div className="input"> 
                    <label htmlFor="text">Write your thoughts..</label> 
                    <textarea 
                        name='entry'
                        id='text'
                        cols="150"
                        rows='25'
                        onChange={handleChange} 
                        value={info.text || ""}
                        autoFocus 
                    ></textarea> 
                </div> 

                {loading && <p>Loading...</p>}  
                {error && <p className="error">{error}</p>}  
                {success && <p className="success">{success}</p>}  

                <button className='createBtn'
                    onClick={handleClick} 
                    disabled={loading}> 
                    Update Entry 
                </button> 
            </div> 
        </div> 
    ); 
};

export default Update;
