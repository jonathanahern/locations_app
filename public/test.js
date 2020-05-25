// var elem = document.getElementById(`locations_element`);
   //     elem.innerHTML = current_product.lookbook_html
var url = window.location.href;
var shop = window.location.host;
var locations = {};

if (url.includes('/products/')) {

    let prodID = meta.product.id;
    let varID = meta.product.variants[0].id;
    var location_inventory = {};

    //If location names haven't been grabbed yet.
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

    //If product has multiple variants
    if (url.includes(`variant=`)) {
        let selector = document.getElementsByClassName("single-option-selector")[0];
        varID = url.split("variant=").pop();
        fetchInventoryIDs();

        selector.addEventListener('change', (event) => {
            let new_url = window.location.href;
            varID = new_url.split("variant=").pop();
            fetchInventoryIDs();
        }); 

    } else {
        fetchInventoryIDs();
    }

    //Gets the inventory item id numbers.
    function fetchInventoryIDs() {
        fetch(`https://${shop}/admin/api/2020-04/products/${prodID}/variants/${varID}.json`, {
        method: "GET",
        })
            .then(res => res.json())
            .then(resp => {
                let inv = resp.variant.inventory_item_id;
                fetchLocationCounts(inv)
        })
    }

    //Gets the inventory count with the inventory item id
    function fetchLocationCounts(inventory_num) {
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