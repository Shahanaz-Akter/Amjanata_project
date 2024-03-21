// delete session js
const deleteSessionProduct = async (id) => {
    console.log('deleteSessionProduct');
    console.log(id);
    let container = document.querySelector(`#productcartContainer_${id}`);
    console.log(container);
    let response = await axios.post('/customer/delete_session_product', { id });
    console.log(response);
    if (response.data.success == true) {
        container.remove();
    }
}


