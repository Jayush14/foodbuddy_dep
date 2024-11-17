import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar component is available
import Footer from '../components/Footer'; // Assuming Footer component is available

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        membership: 'Gold Member',
        loyaltyPoints: 150,
        favoriteDishes: ['Pizza Margherita', 'Spaghetti Bolognese'],
        addresses: [
            { id: 1, location: '123 Main St, Cityville, Country' },
            { id: 2, location: '456 Another Rd, Townsville, Country' }
        ]
    });

    const [newLocation, setNewLocation] = useState('');
    const [newFavoriteDish, setNewFavoriteDish] = useState('');

    const handleEditProfile = () => {
        // Add functionality to edit profile details
    };

    const handleAddLocation = () => {
        if (newLocation.trim() === '') return;
        setUser({
            ...user,
            addresses: [...user.addresses, { id: Date.now(), location: newLocation }]
        });
        setNewLocation('');
    };

    const handleDeleteLocation = (id) => {
        setUser({
            ...user,
            addresses: user.addresses.filter(address => address.id !== id)
        });
    };

    const handleAddFavoriteDish = () => {
        if (newFavoriteDish.trim() === '') return;
        setUser({
            ...user,
            favoriteDishes: [...user.favoriteDishes, newFavoriteDish]
        });
        setNewFavoriteDish('');
    };

    const handleDeleteFavoriteDish = (dish) => {
        setUser({
            ...user,
            favoriteDishes: user.favoriteDishes.filter(fav => fav !== dish)
        });
    };

    return (
        <div className="profile-page" style={{ backgroundColor: '#f3ebe3' }}>
            <Navbar />
            <div className="profile-content" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', padding: '20px' }}>
                {/* User Info Section */}
                <div className="user-info-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px' }}>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="profile-avatar"
                        style={{ borderRadius: '50%', marginBottom: '20px' }}
                    />
                    <div className="user-details" style={{ textAlign: 'center', color: '#2e2e35' }}>
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Status: {user.membership}</p>
                        <p>Loyalty Points: {user.loyaltyPoints}</p>
                        <button onClick={handleEditProfile} className="edit-profile-btn" style={{ backgroundColor: '#2e2e35', color: '#f3ebe3', marginTop: '10px' }}>Edit Profile</button>
                    </div>
                </div>

                {/* Other Sections */}
                <div className="info-sections" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className="section" style={{ backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px' }}>
                        <h3>My Orders & Previous Orders</h3>
                        <p>Details about order history and previous transactions.</p>
                    </div>
                    <div className="section" style={{ backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px' }}>
                        <h3>Favorites</h3>
                        <ul>
                            {user.favoriteDishes.map(dish => (
                                <li key={dish} style={{ marginBottom: '10px' }}>
                                    {dish}
                                    <button onClick={() => handleDeleteFavoriteDish(dish)} style={{ marginLeft: '10px', backgroundColor: '#2e2e35', color: '#f3ebe3', padding: '5px', borderRadius: '5px' }}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Add a new favorite dish"
                            value={newFavoriteDish}
                            onChange={(e) => setNewFavoriteDish(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={handleAddFavoriteDish} style={{ backgroundColor: '#2e2e35', color: '#f3ebe3', padding: '5px', borderRadius: '5px' }}>Add Dish</button>
                    </div>

                    <div className="section" style={{ backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px' }}>
                        <h3>Account Details</h3>
                        <p>Order history, payment methods, and preferences can go here.</p>
                    </div>
                    <div className="section" style={{ backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px' }}>
                        <h3>Settings</h3>
                        <p>Account settings, notifications, and more.</p>
                    </div>
                </div>

                {/* Location and Address Section */}
                <div className="location-section" style={{ backgroundColor: '#f2b315', padding: '20px', borderRadius: '10px', gridColumn: '1 / span 2' }}>
                    <h3>Saved Locations</h3>
                    <ul>
                        {user.addresses.map(address => (
                            <li key={address.id} style={{ marginBottom: '10px' }}>
                                {address.location}
                                <button onClick={() => handleDeleteLocation(address.id)} style={{ marginLeft: '10px', backgroundColor: '#2e2e35', color: '#f3ebe3', padding: '5px', borderRadius: '5px' }}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <div className="add-location">
                        <input
                            type="text"
                            placeholder="Add a new location"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={handleAddLocation} style={{ backgroundColor: '#2e2e35', color: '#f3ebe3', padding: '5px', borderRadius: '5px' }}>Add Location</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
