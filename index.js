const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');

mongoose
        .connect(process.env.DATABASE)
        .then(()=>{
            console.log('thành công')
        })

        const tourSchema = new mongoose.Schema({
            name : {
                type:String,
                required: [true,"A tour must have a name"], // bắt buộc, chỉ định lỗi mà chúng ta muốn hiển thị
                unique:true, // ràng buộc duy nhất
                trim:true
            },// thiết lập nhiều options cho field name
            duration: {
                type:Number,
                required:[true,'A tour must have a duration']
            },
            maxGroupSize: {
                type:Number,
                required:[true,'A tour must have a group size']
            },
            difficulty: {
                type:String,
                required:[true,'A tour must have a diffculty']
            },
            ratingsAverage:{
                type:Number,
                default:4.5// khởi tại giá trị mặc định là 4,5
            },
            ratingsQuantity:{
                type:Number,
                default:0
            },
            price:{
                type:Number,
                required: [true,"A tour must have a price"] 
            },
            priceDiscount: Number,
            // tóm tắt
            summary:{
                type:String,
                trim:true ,// loai bỏ khoảng trắng
                required:[true,'A tour must have a description']
            },
            description: {
                type:String,
                trim:true
            },
            // ảnh bìa
            imageCover:{
                type:String,
                require:[true,'A tour must have a cover image']
            },
            // lưu ảnh dưới dạng mảng string
            images:[String],
            // thời điểm người dùng có chuyển tham quan mới
            createdAt:{
                type:Date,
                default:Date.now(),
                select:false
            },
        
            // ngày bắt đầu
            startDates:[Date]
        })
        
        // tạo model , tour chính là model
        
        const  Tour = mongoose.model('Tour',tourSchema);

const app = express();


app.get('/api/v1/tours',async(req,res)=>{

    const result = await Tour.find()

    res.status(200).json({
        status:'success',
        data:{
            result,
        }
    })
})

app.listen(process.env.PORT,()=>{
    console.log('đang lắng nghe trên 8000')
})
