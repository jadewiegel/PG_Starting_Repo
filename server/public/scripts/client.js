$(document).ready(onReady);

function onReady() {
    getSongs();
    $('#add').on('click', postSong);
    $('#songsTableBody').on('click', '.delete', handleDelete); //decendant selector
    $('#songsTableBody').on('click', '.rank-up', handleRankUp); //decendant selector
    $('#songsTableBody').on('click', '.rank-down', handleRankDown); //decendant selector
}

function handleRankUp(){
    console.log("rank up");
    const id = $(this).parent().parent().data('id');
    $.ajax({
        type: 'PUT',
        url: `/musicLibrary/rank/${id}`,
        data: {direction: 'up'},
    }).then(function(){
        getSongs();
    }).catch(function(error){
        console.log('error with putting', error);
    })
};

function handleRankDown(){
    console.log("rank down");
    const id = $(this).parent().parent().data('id');
    $.ajax({
        type: 'PUT',
        url: `/musicLibrary/rank/${id}`,
        data: {direction: 'down'},
    }).then(function(){
        getSongs();
    }).catch(function(error){
        console.log('error with putting', error);
    })
};

function handleDelete(){
    const id = $(this).parent().parent().data('id');
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${id}`
    }).then(function(){
        getSongs();
    }).catch(function(error){
        console.log('error with deleting, ', error);
    })
}

// get artist data from the server
function getSongs() {
    $("#songsTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/musicLibrary'
    }).then(function (response) {
        console.log("GET /musicLibrary response", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#songsTableBody').append(`
                <tr data-id=${response[i].id}>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td>
                        <button class="rank-up">Up</button>
                        <button class="rank-down">Down</button>
                    </td>
                    <td>
                        <button class="delete">
                            Delete
                        </button>
                    </td>
                </tr>
            `);
        }
    });
}

function postSong() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/musicLibrary',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),
        $('#rank').val(''),
        $('#published').val('')
        getSongs();
    });
}