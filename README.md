- Xử lý like nhà hàng (like, unlike, lấy danh sách like theo nhà hàng và
  user)
  like_res/get-like,
  like_res/get-like-by-user body {"user_id"}
  like_res/get-like-by-res body {"res_id"}
  like_res/create-like body {"user_id", "res_id"}
  like_res/delete-like

- Xử lý đánh giá nhà hàng (thêm đánh giá, lấy danh sách đánh theo nhà hàng và user)
  rate_res/get-rate,
  rate_res/get-rate-by-user body {"user_id"}
  rate_res/get-rate-by-res body {"res_id"}
  rate_res/create-rate body {"user_id", "res_id", "amount"}

- User đặt món (thêm order)
  order/get-order
  order/create-order body {"user_id", "food_id", "amount"}
