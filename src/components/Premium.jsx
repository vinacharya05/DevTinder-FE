import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);

    const verifyPremium = async () => {
        try {
            const res = await axios.get("BASE_URL" + "/premium/verify");
            if (res.data.isPremium) {
                setIsUserPremium(true);
            }
        } catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        verifyPremium();
    }, []);

    const handlePayment = async (type) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", {
                membershipType: type,
            }, {withCredentials: true});
            console.log("Payment ::", order);
            const {keyId, amount, currency, notes, orderId} = order.data;
            const options = {
                "key": keyId,
                amount,
                currency,
                "name": "Dev Tinder",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId,
                "notes": {
                    "name": `${notes.firstName} ${notes.lastName}`,
                    "emailId": notes.emailId
                },
                "theme": {
                    "color": "#3399cc"
                },
                "handler": verifyPremium
            };
            const paymentObject = window.Razorpay(options); 
            paymentObject.open();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        isUserPremium ? "You are already a premium user!" :
        <div className="m-10">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul className="p-3">
                        <li> - Chat with other people</li>
                        <li> - 100 connection requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button onClick={ () => handlePayment('silver')} className="btn btn-secondary">Buy Silver</button>
                </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul className="p-3">
                        <li> - Chat with other people</li>
                        <li> - Infinite connection requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button onClick={ () => handlePayment('silver')} className="btn btn-primary">Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default Premium;