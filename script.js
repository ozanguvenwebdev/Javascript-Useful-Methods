// GET URL PARAMETERS AND CHANGE BUTTON ATTRIBUTES

document.addEventListener("DOMContentLoaded", function() {
var currentUrl = window.location.href;
var url = new URL(currentUrl);
var searchParams = new URLSearchParams(url.search);
var redirectId = searchParams.get('redirect_id');

if (redirectId) {
    console.log("redirect ID: " + redirectId)
    var button = document.querySelector('.btn.btn-primary.btn-lg');
    if (button) {
        var baseUrl = button.getAttribute('href');
        console.log(baseUrl)
        var baseUrl = button.getAttribute('href');
        if (baseUrl) {
            var newHref = baseUrl + '?redirect_id=' + encodeURIComponent(redirectId);
            button.setAttribute('href', newHref);
            console.log('Updated href:', button.getAttribute('href'));
        } else {
            console.error('Base href not found on the button element');
        }       
    }
}
});

// DB QUERY ON XML AND SET ELEMENT ATTRIBUTES

document.addEventListener("DOMContentLoaded", function() {
    odoo.define(function (require) {
    var rpc = require('web.rpc');
    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var searchParams = new URLSearchParams(url.search);
    var redirectId = searchParams.get('redirect_id');
    
    if (redirectId) {
        console.log("redirect ID: " + redirectId)
        rpc.query({
            model: 'hr.employee',
            method: 'search_read',
            args: [[['id', '=', redirectId]],['name','x_job_name','start_date']]  // Adjust fields as needed
        }).then(function(records) {
            console.log(records)
            if (records.length > 0) {
                var inputElement1 = document.querySelector('input[type="text"].form-control[name="40_61_112"]');
                var inputElement2 = document.querySelector('input[type="text"].form-control[name="40_61_113"]');
                var inputElement3 = document.querySelector('input[type="text"].form-control[name="40_61_114"]');
                    var record = records[0];  // Assuming you want the first record
                    // Update the DOM with the fetched record
                    inputElement1.setAttribute('value', record.name);
                    inputElement2.setAttribute('value', record.x_job_name);
                    inputElement3.setAttribute('value', record.start_date);
            } else {
                console.error('No records found');
            }
        }).catch(function(err) {
            console.error('Error fetching record:', err);
        });
    }
    });
});
