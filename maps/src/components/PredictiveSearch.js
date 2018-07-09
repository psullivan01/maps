const autocompleteFormField = document.getElementById('street-address-field');

const autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
    types: ['address'],
    componentRestrictions: ['us'],
});