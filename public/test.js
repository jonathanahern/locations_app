// var elem = document.getElementById(`locations_element`);
var url = window.location.href;
var shop = window.location.host;
console.log("here")
if (url.includes('/products/')) {

    let selector = document.getElementsByClassName("single-option-selector")[0];

    selector.addEventListener('change', (event) => {
        let new_url = window.location.href;
        let new_var_id = new_url.split("variant=").pop();
        console.log(new_var_id);
    });

    let prodID = meta.product.id;
    let varID = meta.product.variants[0].id;

    // console.log(varID);
    // fetch(`https://24413830.ngrok.io/api/v1/front_end/index?shop=${shop}`, {
    //     method: "GET",
    // })
    //   .then(res => res.json())
    //   .then(resp => {
    //     let current_product = resp.filter(product => {
    //       return product.shopify_handle == handle
    //     })[0]
    //     elem.innerHTML = current_product.lookbook_html
    //   })

    fetch(`https://${shop}/admin/api/2020-04/products/${prodID}/variants/${varID}.json`, {
      method: "GET",
    })
        .then(res => res.json())
        .then(resp => {
            let inv = resp.variant.inventory_item_id;
            fetchLocations(inv)
      })

    function fetchLocations(inventory_num) {
        fetch(`https://${shop}/admin/api/2020-04/inventory_levels.json?inventory_item_ids=${inventory_num}.json`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(resp => {
                console.log(resp);
            })
    }
}

// https://${shop}/admin/api/2020-04/products/4476261564483.json

// https://${shop}/admin/api/2020-04/products/4476261564483/variants/31758683734083.json

// https://${shop}/admin/api/2020-04/inventory_levels.json?inventory_item_ids=33363914293315.json