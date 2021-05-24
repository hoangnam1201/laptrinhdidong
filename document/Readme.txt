- Các thư viện cần cài đặt khi chạy app
+ play-services-maps:17.0.0
+ retrofit:2.4.0
+ navigation-fragment:2.3.5
+ lifecycle-livedata-ktx:2.3.1
+ lifecycle-viewmodel-ktx:2.3.1

- Database của app được call từ API, data được lưu trữ trên cloud của MongoDB và được deloy lên heroku
do đó không cần chạy.

- Để khởi động project chỉ cần clone về máy, build và chạy bình thường.
- Sử dụng android studio để chạy project và cài đặt 1 máy ảo android hoặc kết nối với smartphone
- Khi chạy app nếu chưa có tài khoản click vào mục signup để đăng ký
- Sau khi đăng nhập thì giao diện home của app sẽ hiển thị với 1 bản đồ người dùng có thể bật định vị để lấy vị trí hiện tại của mình,
các trạm xe bus đã được hiển thị trên bản đồ.
- Vuốt màn hình từ trái sang phải hoặc bấm vào button sẽ hiện ra menu của App, trong menu người dùng có thể thực hiện logut tài khoản.

- Khi người dùng muốn định vị cá nhận click vào button định vị trên map
- Khi người dùng muốn tra cứu tuyến xe bus, click vào menu tìm muc search bus. Ở giao diện search bus nhập tên tuyến xe hoặc mã số
- Khi người dùng muốn tìm đường click vào mục tìm đường có trên map. Ở giao diện tìm đường người dùng nhập vị trí đi và đến
- Khi người dùng muốn coi danh sách tuyến xe yêu thích, click vào mục danh sach tuyến xe yêu thích ở menu
- Khi người dùng muốn thay đổi thông tin cá nhân hoặc password, click vào mục account setting.