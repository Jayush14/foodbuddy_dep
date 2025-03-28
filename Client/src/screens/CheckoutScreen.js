
import React from 'react'
import Checkout from '../components/Checkout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const checkoutScreen = () => {
    return (
        <div>
            <Navbar />
            <Checkout />
            <Footer />
        </div>
    )
}

export default checkoutScreen;