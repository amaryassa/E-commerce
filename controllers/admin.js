const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        userId: req.user,
    });

    product
        .save()
        .then((result) => {
            console.log("create Product");
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log("exports.postAddProduct -> err", err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        // .populate("userId", "name -_id")
        // .select("title price -_id")
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "admin/products",
            });
        })
        .catch((err) => console.log("error", err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect("/");
    }

    const prodId = req.params.productId;
    Product.findById(prodId)

    .then((product) => {
            if (!product) {
                return res.redirect("/");
            }
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "edit Product",
                path: "/admin/edit-product",
                editing: true,
                product: product,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    Product.findById(prodId)
        .then((product) => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect("/");
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save().then((result) => {
                console.log("exports.postEditProduct -> result", result);
                res.redirect("/admin/products");
            });
        })

    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            console.log("Destroyed Product ");
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log("exports.postDeleteProduct -> err", err);
        });
};