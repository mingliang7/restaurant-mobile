Meteor.methods({
    saleInSemester(selector){
        var currentDate = new Date();
        var tmpDate = moment(currentDate).format('YYYY-MM-DD 00:00:00')
        var currentMonth =new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        var firstDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        console.log(firstDateOfMonth, currentMonth)
        var sales = Restaurant.Collection.Sales.aggregate([
            {
                $match: {
                    // saleDate: {$gte: firstDateOfMonth, $lt: currentMonth},
                    status: {$in: ['closed', 'partial']}
                }
            },
            {
                $group: {
                    _id: {
                        month: {$month: '$saleDate'},
                        year: {$year: '$saleDate'}
                    },
                    totalSale: {$sum: '$total'},
                    count: {$sum: 1}
                },

            }, {$sort: {_id: 1}}]);
        var data = {
            labels: [],
            datasets: [{
                fillColor: "teal",
                strokeColor: "teal",
                pointColor: "#ffff00",
                pointStrokeColor: "#e65100",
                pointHighlightFill: "#e65100",
                pointHighlightStroke: "#e65100",
                data: []
            }]
        };
        var arr = [];
        if(sales.count() > 0){
            sales.forEach((sale)=> {
                let totalSale = sale.totalSale;
                data.labels.push(getMonthName(sale._id));
                arr.push(totalSale);
            });
        }


        data.datasets[0].data = arr;
        return data;

    }
});

let getMonthName = (number) =>{
    let month = '';
    switch(number.month){
        case 1:
            month = 'មករា'
            break;
        case 2:
            month = 'កុម្ភៈ​'
            break;
        case 3:
            month = 'មិនា'
            break;
        case 4:
            month ='មេសា'
            break;
        case 5:
            month ='ឧសភា'
            break;
        case 6:
            month ='មិថុនា'
            break;
        case 7:
            month ='កក្កដា'
            break;
        case 8:
            month ='សីហា'
            break;
        case 9:
            month ='កញ្ញា'
            break;
        case 10:
            month ='តុលា'
            break;
        case 11:
            month ='វិច្ឆិកា'
            break;
        case 12:
            month ='ធ្នូ'
            break;

    }
    return month;
}