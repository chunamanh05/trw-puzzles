import csv
from playwright.sync_api import sync_playwright

def scrape_wheystore():
    with sync_playwright() as p:
        # headless=False để nhìn thấy bot hoạt động và vượt qua check Anti-bot (nếu có)
        browser = p.chromium.launch(headless=False)
        
        # Ngụy trang Bot thành một trình duyệt Chrome của người dùng thật
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        target_url = "https://www.wheystore.vn/whey-protein-c1"
        print(f"Đang mở cửa hàng: {target_url}")
        
        # Truy cập trang và đợi 3 giây để ảnh/giá tiền kịp tải hết
        page.goto(target_url)
        page.wait_for_timeout(3000) 

        # TÌM CÁC SẢN PHẨM: 
        # (Lưu ý: Nếu code chạy ra 0 sản phẩm, bạn cần đọc hướng dẫn F12 ở dưới)
        product_selector = ".item-product, .product-item, .box-product, .item" 
        products = page.locator(product_selector).all()
        scraped_data = []

        print(f"Phát hiện {len(products)} sản phẩm trên kệ. Đóng gói dữ liệu...")

        for product in products:
            try:
                # 1. Lấy Tên (Title)
                title = product.locator("h3, .product-name, .title").inner_text().strip()
                
                # 2. Lấy Giá (Price) - Lấy giá khuyến mãi nếu có
                price = "Liên hệ"
                if product.locator(".price, .price-current, .special-price").count() > 0:
                    price = product.locator(".price, .price-current, .special-price").first.inner_text().strip()
                
                # 3. Đánh giá (Reviews) - Nhiều trang VN không hiện review ở ngoài danh mục
                reviews = "Chưa có đánh giá"
                if product.locator(".rating, .stars, .review-count").count() > 0:
                    reviews = product.locator(".rating, .stars, .review-count").inner_text().strip()
                
                # 4. Lấy Link
                link_element = product.locator("a").first
                link = link_element.get_attribute("href")
                
                # Chuẩn hóa link (vì một số web chỉ để link dạng /san-pham-abc)
                if link and not link.startswith("http"):
                    link = "https://www.wheystore.vn" + link

                # Nếu lấy được tên thì mới lưu vào mảng (tránh lấy nhầm thẻ rác)
                if title:
                    scraped_data.append({
                        "Title": title,
                        "Price": price,
                        "Reviews": reviews,
                        "Product Link": link
                    })
                    print(f"Đã gom: {title[:30]}... | Giá: {price}")
                
            except Exception as e:
                # Bỏ qua nếu cấu trúc thẻ bị lỗi
                continue

        # XUẤT FILE CSV
        csv_filename = "wheystore_data.csv"
        with open(csv_filename, mode='w', newline='', encoding='utf-8-sig') as file:
            writer = csv.DictWriter(file, fieldnames=["Title", "Price", "Reviews", "Product Link"])
            writer.writeheader()
            writer.writerows(scraped_data)

        print("-" * 40)
        print(f"BINGOOOO! Đã cào thành công {len(scraped_data)} hộp Whey vào file {csv_filename}")
        
        browser.close()

if __name__ == "__main__":
    scrape_wheystore()