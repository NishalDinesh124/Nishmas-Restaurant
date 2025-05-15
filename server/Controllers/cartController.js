const CartItems = require('../Models/cartModel');

module.exports.addToCart = async (req, res, next) => {
    try {
        const { title, desc, quantity, price, img, user } = req.body;
        const existingItem = await CartItems.findOne({
            user: user,
            title: title
        });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            res.send(true);
        } else {
            const newItem = await CartItems.create({
                title: title,
                desc: desc,
                quantity: quantity,
                price: price,
                img: img,
                user: user
            })
            if (newItem) {
                res.send(true)
            } else {
                res.send(false);
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports.getCartItems = async (req, res, next) => {
    try {
        const userId = await req.body.userId;
        const items = await CartItems.find({ user: userId }).sort({ updatedAt: 1 })
        res.json(items)
    } catch (err) {
        next(err)
    }
}


/// Updating quantity by +,- button
module.exports.updateItems = async (req, res, next) => {
    try {
        const { title, user, quantity } = req.body;

        const item = await CartItems.findOne({ user: user, title: title });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const newQuantity = item.quantity + quantity;

        if (newQuantity > 0) {
            // Update the quantity
            await CartItems.updateOne(
                { user: user, title: title },
                { $inc: { quantity: quantity } }
            );
        } else {
            // Remove the item from cart
            await CartItems.deleteOne({ user: user, title: title });
        }

    } catch (err) {
        console.log(err, "An error occured");
    }
}