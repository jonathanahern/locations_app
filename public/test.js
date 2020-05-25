// var elem = document.getElementById(`locations_element`);
   //     elem.innerHTML = current_product.lookbook_html
var url = window.location.href;
var shop = window.location.host;
var locations = {};
console.log("here")

if (url.includes('/products/')) {
    var location_inventory = {};
    if (Object.keys(locations).length === 0){
        fetch(`https://${shop}/admin/api/2020-04/locations.json`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(resp => {
                resp.locations.forEach(loc => {
                    locations[loc.id]=loc.name
                });
            })
    }

    let selector = document.getElementsByClassName("single-option-selector")[0];

    selector.addEventListener('change', (event) => {
        let new_url = window.location.href;
        let new_var_id = new_url.split("variant=").pop();
        console.log(new_var_id);
    });

    let prodID = meta.product.id;
    let varID = meta.product.variants[0].id;

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
                resp.inventory_levels.forEach(locale => {
                    let loc_name = locations[locale.location_id];
                    let loc_count = locale.available;
                    location_inventory[loc_name] = loc_count;
                });
                console.log(location_inventory);
            })
    }
}

// https://${shop}/admin/api/2020-04/products/4476261564483.json

// https://${shop}/admin/api/2020-04/products/4476261564483/variants/31758683734083.json

// https://${shop}/admin/api/2020-04/inventory_levels.json?inventory_item_ids=33363914293315.json