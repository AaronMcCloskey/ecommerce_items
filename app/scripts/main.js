bookSearch('Harry Potter');

function bookSearch(search) {
    $('.results').empty()
    ''
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        success: function(data) {
            displayBooks(data);
        },
        type: 'GET'
    });
}

function displayBooks(data) {
    var template = _.template($('#itemTemplate').html());
    for (var i = 0; i < data.items.length; i++) {
        console.log(data.items[i]);
        var title = data.items[i].volumeInfo.title;
        var pageCount = data.items[i].volumeInfo.pageCount + " pages";
        var desc = data.items[i].volumeInfo.description;
        var author = data.items[i].volumeInfo.authors[0];
        var link = data.items[i].volumeInfo.previewLink;
        var img = data.items[i].volumeInfo.imageLinks.thumbnail;
        var rating = data.items[i].volumeInfo.averageRating;
        var half = rating % 1 !== 0;
        var id = data.items[i].id;
        var stars = rating;

        if (half === true) {
            stars = Math.floor(rating) + 1;
        }

        $('.results').append(template({
            id: id,
            title: title,
            pageCount: pageCount,
            desc: desc,
            author: author,
            img: img,
            link: link,
        }));

        var starCard = $(".card-stars[data-id='" + id + "']");
        for (var j = 0; j < 5; j++) {
            if (half === true) {
                if (j + 1 === Math.floor(stars)) {
                    starCard.append('<i class="fa fa-star fa-star-half-o"></i>');
                } else if (j < Math.floor(stars)) {
                    starCard.append('<i class="fa fa-star"></i>');
                } else {
                    starCard.append('<i class="fa fa-star fa-star-o"></i>');
                }
            } else if (j < Math.floor(stars)) {
                starCard.append('<i class="fa fa-star"></i>');
            } else {
                starCard.append('<i class="fa fa-star fa-star-o"></i>');
            }
        }

    }
}

$("#button").click(function() {
    bookSearch($('#search').val());
});