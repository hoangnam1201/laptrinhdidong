import { Typography } from '@material-ui/core'
import React from 'react'

const HomePage =() =>{
    return(
        <div className="d-flex">
            <div className="d-block p-3">
                <strong className="title">ỨNG DỤNG XE BUÝT THÀNH PHỐ HCM</strong>
                <Typography className="mt-2">BusMap - ứng dụng bản đồ giao thông công cộng (buýt, metro) miễn phí hàng đầu Việt Nam</Typography>
                <Typography className="mt-2">Giải pháp hàng đầu dành cho sinh viên Việt Nam</Typography>
            </div>
            <img className="w-50 h-50" src="https://busmap.vn/assets/images/designs/bia.svg" alt="background"/>
        </div>
    )
}
export default HomePage;