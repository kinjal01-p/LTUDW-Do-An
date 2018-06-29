exports.add = (cart, item) => {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id_product === item.id_product) {
            cart[i].amount += item.amount;
            return;
        }
    }

    cart.push(item);
}

exports.edit = (cart, item) => {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id_product === item.id_product) {
            cart[i].amount = item.amount;
            return;
        }
    }
}

exports.remove = (cart, id_product) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (id_product === cart[i].id_product) {
            cart.splice(i, 1);
            return;
        }
    }
}

exports.checkExist = (cart, id_product) => {
    for (var i = 0; i < cart.length; i++) {
        if (id_product === cart[i].id_product) {
            return true;
        }
    }

    return false;
}

exports.amountActual = (cart, item) => {
    var amount = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id_product === item.id_product) {
            amount = +cart[i].amount;
            break;
        }
    }

    return amount + item.amount;
}