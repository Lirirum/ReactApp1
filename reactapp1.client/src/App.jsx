import { useEffect, useState } from 'react';
import './App.css';

function App() {
    
    const [cart, setCart] = useState([]);
    const [imagesUrl, setImagesUrl] = useState({});
    const [cartItem, setCartItem] = useState();


    const [item, setItem] = useState({
        category_id: 0,
        name: '',
        price: 0,
        description: '',
        imageUrl: ''
    });

    const [product, setProduct] = useState({
        id:0,
        categoryId: 0,
        name: '',
        price: 0,
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        
       getCartData(); 
       

    }, []);


    useEffect(() => {


        if (cart.length != 0) {
            fetchImages();
         
        }        


    }, [cart]);



    const addKeyValuePair = (key, value) => {
        setImagesUrl(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(imagesUrl);
        
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value
        });
    };
    const handleChangeUpdateData = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const response = await fetch('cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
            alert('Item added to cart');
        } else {
            alert('Failed to add item to cart');
        }
        getCartData()
    }

    const handleSubmitUpdateData = async (e) => {
        e.preventDefault();

        const response = await fetch(`cart/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(product)
        });

        if (response.ok) {
            alert('Item updated');
        } else {
            alert('Failed to update item');
        }
        getCartData()
    }


    const contents = (cart === undefined  || cart.length===0)
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="cart-table" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(cartItem =>
                    <tr key={cartItem.id}>
                        <td>{cartItem.id}</td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td>{cartItem.description}</td>
                        <td ><div className="image-container">{<img src={imagesUrl[cartItem.id]} />}</div> </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div >
    
            <h1 id="tabelLabel">Cart</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <div className="container add_item">
                <form onSubmit={handleSubmit }>                 
                    <div>
                        <label htmlFor="category_id" min="0" step="1" >Category Id:</label>
                        <input type="number" id="category_id" name="category_id" value={item.category_id}  onChange={handleChange} /><br />
                   
                    </div>

                    <div>
                    <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={item.name} onChange={handleChange} /><br />
                    </div>

                    <div>

                    <label htmlFor="price" >Price:</label>
                    <input type="number" id="price" name="price" value={item.price} onChange={handleChange} /><br />
                   
                    </div>



                    <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={item.description} onChange={handleChange} /><br />
                    </div>
                    <input type="submit" value="Add to Cart"/>
                </form>
            </div>
            
            <div className="container add_item">
                <form onSubmit={handleSubmitUpdateData}>
                    <div >
                        <label htmlFor="id" min="0" step="1" >Id:</label>
                        <div className="update_top" >                      
                            <input type="number" id="id" name="id" value={product.id} onChange={handleChangeUpdateData} /><br />
                            <input required type="button" onClick={() => { getCartDataById(product.id) }} value="Get item" />
                        </div>
                       
                    </div>

                    <div>
                        <label htmlFor="categoryId" min="0" step="1" >Category Id:</label>
                        <input type="number" id="categoryId" name="categoryId" value={product.categoryId} onChange={handleChangeUpdateData} /><br />

                    </div>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={product.name} onChange={handleChangeUpdateData} /><br />
                    </div>

                    <div>

                        <label htmlFor="price" >Price:</label>
                        <input type="number" id="price" name="price" value={product.price} onChange={handleChangeUpdateData} /><br />

                    </div>



                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value={product.description} onChange={handleChangeUpdateData} /><br />
                    </div>
                    <input type="submit" value="Udpate Item" />
                </form>
            </div>

        </div>
    );

    async function getCartData() {
        const response = await fetch('cart');
        const data = await response.json();
        setCart(data);                   
    }

    async function getCartDataById(id) {
        const response = await fetch(`cart/${id}`);
        const data = await response.json();
        setCartItem(data);
        setProduct({
            id:data.id,
            categoryId: data.categoryId,
            name: data.name,
            price: data.price,
            description: data.description,
            imageUrl: data.imageUrl
        });
    }

    async function getImage(imgUrl,imgId) {

        try {

            const response = await fetch(`images/${imgUrl}`);
            if (response.status === 200) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                return { id: imgId, url };

            } else {
                console.error('Failed to fetch image');

            }
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    }

    async function fetchImages() {
     
        const urls = await Promise.all(cart.map(cartItem => getImage(cartItem.imageUrl, cartItem.id)));
        urls.map(item => addKeyValuePair(item.id, item.url));

       
    }
  

    
}

export default App;
