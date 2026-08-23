import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {

    const {
        navigate,
        backendUrl,
        token,
        setCartItem
    } = useContext(ShopContext);

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {

        try {

            console.log("SUCCESS:", success);
            console.log("ORDER ID:", orderId);

            if (!token) {
                console.log("No token");
                return;
            }

            const response = await axios.post(
                backendUrl + "/api/order/verifyStripe",
                {
                    success,
                    orderId
                },
                {
                    headers: { token }
                }
            );

            console.log("BACKEND RESPONSE:", response.data);

            if (response.data.success) {

                setCartItem({});
                navigate("/Orders");

            } else {

                navigate("/cart");

            }

        } catch (error) {

            console.log("VERIFY ERROR:", error);
            toast.error(error.message);

        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div>
            Verifying payment...
        </div>
    );
};

export default Verify;