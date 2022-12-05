class ApiFeatures{

    // For getting keywords or query in url
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    // For Search any keyword
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }:
        {};
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }


    // For Filteration of category,price and ratings
    filter(){
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);


        // Removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) => delete queryCopy[key]);
        // console.log(queryCopy);


        // Filter for price and ratings
        let queryStr=JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`); //Replacing JS object with key by using replace method for making gt as  ${key}

        this.query=this.query.find(JSON.parse(queryStr)); //this.query means Product.find()
        // console.log(queryStr);
        return this;
    }

    // For Pagination

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) ||1;
        // console.log(currentPage);

        const skip = resultPerPage * (currentPage -1);
        // console.log(skip);

        this.query=this.query.limit(resultPerPage).skip(skip);
        // console.log(this);
        return this;
    }
};

module.exports = ApiFeatures;