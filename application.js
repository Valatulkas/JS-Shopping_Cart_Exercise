//update total price per Item

var updateTotalPrice = function (ele) {
  var price = parseFloat($(ele).find('.price input').val());
  var quantity = parseFloat($(ele).find('.quantity input').val());
  var total = price * quantity;
  $(ele).children('.total').html('$' + total);
  return total;
}

$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    var total = updateTotalPrice(ele);
  });
});

//updating total of entire wish List
var sum = function (acc, x) {return acc + x};

var updateWishListTotal = function () {
  var allItemValues = [];
  $('tbody tr').each(function (i, ele) {
    var total = updateTotalPrice(ele);
    allItemValues.push(total);
  });

  var wishListValue = allItemValues.reduce(sum);
  $('#wishListValue').html(wishListValue);
}

$(document).ready(function () {
  updateWishListTotal();

  $(document).on('click', '.btn.remove', function(event) {
    $(this).closest('tr').remove();
    updateWishListTotal();
  });

  $(document).on('click', '.calculateTotal', function(event) {
    updateTotalPrice();
    updateWishListTotal();
  })

  var timeout;
  $('tr input').on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout( function () {
      updateWishListTotal();
    }, 1000)
  });

  $('#addItem').on('submit', function () {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();
    var quantity = $(this).children('[name=quantity]').val();

    $('tbody').append('<tr>' + '<td class="name">' + name + '</td>' + '<td class="price">$<input type="number" value="' + price + '" /></td>' + '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' + '<td class="total"></td>' + '<td><button class="btn btn-light btn-sm remove">REMOVE</button></td>' + '</tr>');

    updateWishListTotal();
    $(this).children('[name=name]').val('');
    $(this).children('[name=price]').val('');
    $(this).children('[name=quantity]').val('');
  })
})
