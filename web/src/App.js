import React, {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkout, setCheckout] = useState({
        customer: '',
        products: [],
    });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await Promise.all([
                getCustomers(),
                getProducts(),
            ]).finally(() => {
                setLoading(false);
            });
        };
        fetch();
    }, []);

    useEffect(() => {
        if (checkout.customer && checkout.products.length >= 1) {
            const fetch = async () => {
                setLoading(true);
                await Promise.all([
                    getTotalPrice(),
                ]).finally(() => setLoading(false));
            };
            fetch();
        }
    }, [checkout]);

    const getTotalPrice = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/checkout`, checkout)
            .then((res) => {
                setTotalPrice(res.data.total_price);
            })
    };

    const getCustomers = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}/customer`)
             .then((res) => {
                 setCustomers(res.data);
                 setCheckout({
                     ...checkout,
                     customer: res.data[0].code ?? ''
                 })
             })
    };

    const getProducts = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/product`)
            .then((res) => {
                setProducts(res.data);
            })
    };

    const onAddItem = (value) => {
        setCheckout({
            ...checkout,
            products: checkout.products.concat(value)
        })
    }

    const onChangeCustomer = (e) => {
        setCheckout({
            ...checkout,
            customer: e.target.value
        })
    }

    const countItem = (type) => {
        const countTypes = checkout.products.filter(item => item === type);
        return countTypes.length;
    }

    return (
        <div className={'container'}>
           <div className={'box'}>
               <div className={'customerContainer'}>
                   <div className={'customerLabel'}>Customer</div>
                   <select name="customer" className={'customerSelection'} onChange={onChangeCustomer}>
                       {customers.map(customer => (
                           <option key={customer.code} value={customer.code}>
                               {customer.name}
                           </option>
                       ))}
                   </select>
               </div>
               {products.map(data => (
                   <div key={data.code} className={'productContainer'}>
                       <div className={'productLabel'}>{data.name}</div>
                       <div>
                           Price: {data.price}
                       </div>
                       <button
                           onClick={() => onAddItem(data.code)}
                           type="button" className={'productButton'}>
                           Add to cart
                       </button>
                   </div>
               ))}

               <div className={'cartContainer'}>
                   {products.map(data => (
                       <div key={data.code}>
                           <div>{data.name}: {countItem(data.code)}</div>
                       </div>
                   ))}
                   <div className={'total'}>Total: { loading ? 'Loading...' : totalPrice.toLocaleString()}</div>
               </div>
           </div>
        </div>
    );
}

export default App;
