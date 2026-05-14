import os

# ایجنٹ سے موصول ہونے والی خبر
new_news = os.getenv("NEWS_CONTENT")

# آپ کی ویب سائٹ کی فائل کا نام
file_path = "index.html"

with open(file_path, "r", encoding="utf-8") as file:
    content = file.read()

# خبر کو ویب سائٹ کے مخصوص حصے میں شامل کرنا
marker = "<!-- NEWS_START -->"
updated_content = content.replace(marker, f"{marker}\n<div class='news-post'>{new_news}</div>")

with open(file_path, "w", encoding="utf-8") as file:
    file.write(updated_content)
