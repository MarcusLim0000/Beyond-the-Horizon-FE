import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getListingById, updateListing } from '../../utilities/users-api';

function EditFlight() {
  const { id } = useParams();
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!token) {
          alert('Unauthorised user! Someone call 911!');
          return;
        }

        const response = await getListingById(id)

        const data = response[0];

      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedListing = {
      title,
      size,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      images,
      availability,
    };

    try {
      await updateListing(id, updatedListing)

      // Redirect back to the profile page
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='edit-listing-container'>
      <h1>Edit Listing</h1>
      <form>
        form to update flight
      </form>
    </div>
  );
}

export default EditFlight;