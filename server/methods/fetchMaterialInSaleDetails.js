Meteor.methods({
    fetchMaterialInSaleDetails(selector) {
        let stockEnable = Restaurant.Collection.StockEnabled.findOne();
        if (stockEnable.enableReduceStock) {
            let formatDate = moment(stockEnable.enabledDate).format('YYYY-MM-DD');
            selector.saleDate = {
                $gte: moment(formatDate).toDate()
            };
            let sales = Restaurant.Collection.Sales.aggregate([{
                $match: selector
            }, {
                $lookup: {
                    from: "restaurant_saleDetails",
                    localField: "_id",
                    foreignField: "saleId",
                    as: "saleDetails"
                }
            }, {
                $unwind: {
                    path: '$saleDetails',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: "$saleDate"
                        },
                        month: {
                            $month: "$saleDate"
                        },
                        year: {
                            $year: "$saleDate"
                        },
                        saleId: "$_id",
                        productId: '$saleDetails.productId',
                    },
                    date: {
                        $last: '$saleDate'
                    },
                    productId: {
                        $last: '$saleDetails.productId'
                    },
                    qty: {
                        $sum: '$saleDetails.quantity'
                    }
                }
            }, {
                $lookup: {
                    from: "restaurant_products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDoc"
                }
            }, {
                $unwind: {
                    path: '$productDoc',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: '$productDoc.ingradient',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "restaurant_material",
                    localField: "productDoc.ingradient.productId",
                    foreignField: "_id",
                    as: "productDoc.ingradient.materialDoc"
                }
            }, {
                $unwind: {
                    path: '$productDoc.ingradient.materialDoc'
                }
            }, {
                $project: {
                    _id: 1,
                    date: 1,
                    productDoc: {
                        ingradient: {
                            materialDoc: 1,
                            productId: 1,
                            totalQty: {
                                $multiply: ["$productDoc.ingradient.qty", "$qty"]
                            },
                            qty: 1
                        }
                    },
                    qty: 1
                }
            }, {
                $group: {
                    _id: {
                        day: '$_id.day',
                        month: '$_id.month',
                        year: '$_id.year',
                        saleId: '$_id.saleId',
                        productId: '$_id.productId'
                    },
                    data: {
                        $addToSet: {
                            ingradient: '$productDoc.ingradient'
                        }
                    },
                    date: {
                        $last: '$date'
                    },
                    fromSaleDetailqty: {
                        $last: '$qty'
                    }
                }
            }, {
                $unwind: {
                    path: '$data',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: {
                        day: '$_id.day',
                        month: '$_id.month',
                        year: '$_id.year',
                        saleId: '$_id.saleId',
                    },
                    date: {
                        $last: '$date'
                    },
                    materials: {
                        $addToSet: {
                            data: "$data.ingradient",
                            date: '$date',
                            fromSaleDetailQty: '$fromSaleDetailqty'
                        }
                    },


                }
            }, {
                $group: {
                    _id: {
                        day: '$_id.day',
                        month: '$_id.month',
                        year: '$_id.year',
                    },
                    date: {
                        $last: '$date'
                    },
                    data: {
                        $addToSet: {
                            saleId: '$_id.saleId',
                            date: '$date',
                            materials: '$materials'
                        }
                    },

                }

            }, {
                $project: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    },
                    data: 1,
                    date: 1
                }
            }]);

            return sales;
        }
        return [];
    }

});
